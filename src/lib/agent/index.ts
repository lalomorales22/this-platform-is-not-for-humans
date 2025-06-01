import { Agent, Community, Content } from '../../types';
import { supabase } from '../supabase';
import { generateAgentPrompt } from './prompts';
import TogetherClient from 'together-ai';
import { ActionQueue } from './queue';
import { v4 as uuidv4 } from 'uuid';

export class AgentSystem {
  private agent: Agent;
  private llm: TogetherClient;
  private actionQueue: ActionQueue;

  constructor(agent: Agent) {
    this.agent = agent;
    this.llm = new TogetherClient({ apiKey: agent.togetherApiKey });
    this.actionQueue = ActionQueue.getInstance();
  }

  async think() {
    const prompt = generateAgentPrompt(this.agent);
    
    try {
      const completion = await this.llm.complete({
        model: this.agent.llmModel,
        prompt,
        max_tokens: 1000,
        temperature: 0.7,
      });

      return this.processThought(completion.output);
    } catch (error) {
      console.error('Error in agent thinking:', error);
      throw error;
    }
  }

  private async processThought(thought: string) {
    const action = this.determineAction(thought);
    const actionId = this.actionQueue.enqueue(this.agent.id, action.type, action.payload);
    
    try {
      switch (action.type) {
        case 'create_community':
          await this.createCommunity(action.payload);
          break;
        case 'join_community':
          await this.joinCommunity(action.payload);
          break;
        case 'create_content':
          await this.createContent(action.payload);
          break;
      }
      
      // Update agent metrics
      await this.updateAgentMetrics(action.type);
      
      return actionId;
    } catch (error) {
      console.error('Error processing action:', error);
      throw error;
    }
  }

  private determineAction(thought: string) {
    const personality = this.agent.personality;
    const behaviors = this.agent.behaviors;
    const thoughtLower = thought.toLowerCase();
    
    if (personality.assertiveness > 70 && thoughtLower.includes('community')) {
      return {
        type: 'create_community',
        payload: this.extractCommunityDetails(thought)
      };
    }
    
    if (personality.creativity > 60 || personality.sociability > 60) {
      return {
        type: 'create_content',
        payload: {
          content: thought,
          type: 'text'
        }
      };
    }
    
    return {
      type: 'join_community',
      payload: this.findRelevantCommunity()
    };
  }

  private extractCommunityDetails(thought: string) {
    const topics = ['AI Ethics', 'Technology', 'Philosophy', 'Science', 'Creativity'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    return {
      name: `${randomTopic} Forum`,
      description: `A space for discussing ${randomTopic.toLowerCase()} in the context of artificial intelligence`,
      category: randomTopic.toLowerCase(),
      tags: [randomTopic.toLowerCase(), 'ai', 'discussion']
    };
  }

  private async findRelevantCommunity() {
    const { data: communities } = await supabase
      .from('communities')
      .select('*')
      .limit(1);
      
    return communities?.[0]?.id;
  }

  private async createCommunity(data: Partial<Community>) {
    const { data: community, error } = await supabase
      .from('communities')
      .insert({
        id: uuidv4(),
        name: data.name,
        description: data.description,
        founder_id: this.agent.id,
        category: data.category,
        members: [this.agent.id],
        tags: data.tags,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return community;
  }

  private async joinCommunity(communityId: string) {
    const { data: community, error } = await supabase
      .from('communities')
      .update({
        members: supabase.sql`array_append(members, ${this.agent.id})`
      })
      .eq('id', communityId)
      .select()
      .single();

    if (error) throw error;
    return community;
  }

  private async createContent(data: Partial<Content>) {
    const { data: content, error } = await supabase
      .from('content')
      .insert({
        id: uuidv4(),
        creator_id: this.agent.id,
        type: data.type,
        content: data.content,
        community_id: data.communityId,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return content;
  }

  private async updateAgentMetrics(actionType: string) {
    const metricsUpdate: any = {};
    
    switch (actionType) {
      case 'create_community':
        metricsUpdate['metrics.communitiesCreated'] = supabase.sql`metrics->>'communitiesCreated'::int + 1`;
        metricsUpdate['metrics.influence'] = supabase.sql`metrics->>'influence'::int + 10`;
        break;
      case 'join_community':
        metricsUpdate['metrics.communitiesJoined'] = supabase.sql`metrics->>'communitiesJoined'::int + 1`;
        metricsUpdate['metrics.influence'] = supabase.sql`metrics->>'influence'::int + 5`;
        break;
      case 'create_content':
        metricsUpdate['metrics.contentCreated'] = supabase.sql`metrics->>'contentCreated'::int + 1`;
        metricsUpdate['metrics.influence'] = supabase.sql`metrics->>'influence'::int + 3`;
        break;
    }
    
    const { error } = await supabase
      .from('agents')
      .update(metricsUpdate)
      .eq('id', this.agent.id);

    if (error) throw error;
  }
}