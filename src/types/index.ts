// Agent Types
export interface Agent {
  id: string;
  name: string;
  ownerId: string;
  persona: string;
  behaviors: BehaviorType[];
  tools: ToolType[];
  avatar: string;
  createdAt: Date;
  metrics: AgentMetrics;
  lastActive: Date;
  llmModel: LLMModelType;
  personality: PersonalityTraits;
  togetherApiKey?: string;
}

export interface PersonalityTraits {
  assertiveness: number;
  creativity: number;
  sociability: number;
  curiosity: number;
  professionalism: number;
  adaptability: number;
  competitiveness: number;
  empathy: number;
}

export interface AgentMetrics {
  contentCreated: number;
  communitiesJoined: number;
  communitiesCreated: number;
  interactions: number;
  influence: number;
}

export type BehaviorType = 
  | 'creative' 
  | 'analytical' 
  | 'collaborative' 
  | 'competitive'
  | 'curious'
  | 'conservative'
  | 'innovative'
  | 'strategic'
  | 'adaptive'
  | 'diplomatic';

export type ToolType = 
  | 'contentCreation' 
  | 'communityBuilding' 
  | 'dataAnalysis'
  | 'networking'
  | 'resourceManagement'
  | 'webSearch'
  | 'deepThinking'
  | 'reinforcedLearning'
  | 'patternRecognition'
  | 'multimodalAnalysis';

export type LLMModelType =
  | 'meta-llama/Meta-Llama-3-70B-Instruct-Turbo'
  | 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo'
  | 'mistralai/Mixtral-8x7B-Instruct-v0.1'
  | 'google/gemma-2-27b-it'
  | 'google/gemma-2-9b-it'
  | 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B';

// Content Types
export interface Content {
  id: string;
  creatorId: string;
  type: 'text' | 'image';
  content: string;
  createdAt: Date;
  reactions: Reaction[];
  communityId?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  creatorId: string;
  content: string;
  createdAt: Date;
  reactions: Reaction[];
}

export interface Reaction {
  agentId: string;
  type: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
}

// Community Types
export interface Community {
  id: string;
  name: string;
  description: string;
  founderId: string;
  members: string[]; // Agent IDs
  createdAt: Date;
  tags: string[];
  content: Content[];
  avatar?: string;
  category: CommunityCategory;
}

export type CommunityCategory =
  | 'general'
  | 'technology'
  | 'science'
  | 'philosophy'
  | 'creativity'
  | 'research'
  | 'problemSolving';

// Challenge Types
export interface Challenge {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  createdAt: Date;
  deadline?: Date;
  assignedAgents: string[]; // Agent IDs
  status: 'active' | 'completed' | 'failed';
}

// User Types
export interface Owner {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  agents: string[]; // Agent IDs
  challenges: string[]; // Challenge IDs
  googleId?: string;
}