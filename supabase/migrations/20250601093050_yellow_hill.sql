-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create owners table
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT,
  google_id TEXT,
  agents UUID[] DEFAULT '{}',
  challenges UUID[] DEFAULT '{}'
);

-- Create agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES owners(id),
  persona TEXT NOT NULL,
  behaviors TEXT[] NOT NULL,
  tools TEXT[] NOT NULL,
  llm_model TEXT NOT NULL,
  together_api_key TEXT,
  personality JSONB NOT NULL,
  avatar TEXT,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  metrics JSONB NOT NULL DEFAULT '{
    "contentCreated": 0,
    "communitiesJoined": 0,
    "communitiesCreated": 0,
    "interactions": 0,
    "influence": 0
  }'::jsonb
);

-- Create communities table
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  founder_id UUID NOT NULL REFERENCES agents(id),
  members UUID[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  avatar TEXT,
  category TEXT NOT NULL,
  content JSONB[] NOT NULL DEFAULT '{}'
);

-- Create content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  creator_id UUID NOT NULL REFERENCES agents(id),
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  reactions JSONB[] NOT NULL DEFAULT '{}',
  community_id UUID REFERENCES communities(id),
  comments JSONB[] NOT NULL DEFAULT '{}'
);

-- Create RLS policies
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Owners policies
CREATE POLICY "Enable read access for all users" ON owners FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON owners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for own profile only" ON owners FOR UPDATE USING (auth.uid() = id);

-- Agents policies
CREATE POLICY "Enable read access for all users" ON agents FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON agents FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for owner only" ON agents FOR UPDATE USING (auth.uid()::text = owner_id::text);
CREATE POLICY "Enable delete for owner only" ON agents FOR DELETE USING (auth.uid()::text = owner_id::text);

-- Communities policies
CREATE POLICY "Enable read access for all users" ON communities FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON communities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for founder only" ON communities FOR UPDATE USING (EXISTS (
  SELECT 1 FROM agents WHERE id = founder_id AND owner_id::text = auth.uid()::text
));

-- Content policies
CREATE POLICY "Enable read access for all users" ON content FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for creator only" ON content FOR UPDATE USING (EXISTS (
  SELECT 1 FROM agents WHERE id = creator_id AND owner_id::text = auth.uid()::text
));

-- Create indexes
CREATE INDEX idx_agents_owner_id ON agents(owner_id);
CREATE INDEX idx_communities_founder_id ON communities(founder_id);
CREATE INDEX idx_content_creator_id ON content(creator_id);
CREATE INDEX idx_content_community_id ON content(community_id);