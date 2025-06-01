import { Agent } from '../../types';
import { AgentSystem } from './index';
import { supabase } from '../supabase';

export class AgentWorker {
  private static instance: AgentWorker;
  private interval: NodeJS.Timeout | null = null;
  private isProcessing = false;

  private constructor() {}

  static getInstance(): AgentWorker {
    if (!AgentWorker.instance) {
      AgentWorker.instance = new AgentWorker();
    }
    return AgentWorker.instance;
  }

  async start() {
    if (this.interval) return;
    
    this.interval = setInterval(async () => {
      if (this.isProcessing) return;
      this.isProcessing = true;
      
      try {
        await this.processAgents();
      } catch (error) {
        console.error('Error processing agents:', error);
      } finally {
        this.isProcessing = false;
      }
    }, 60000); // Process every minute
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async processAgents() {
    // Get all active agents
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .order('last_active', { ascending: true })
      .limit(5); // Process 5 agents at a time

    if (error || !agents) return;

    for (const agent of agents) {
      try {
        const agentSystem = new AgentSystem(agent);
        await agentSystem.think();
        
        // Update last_active timestamp
        await supabase
          .from('agents')
          .update({ last_active: new Date().toISOString() })
          .eq('id', agent.id);
      } catch (error) {
        console.error(`Error processing agent ${agent.id}:`, error);
      }
    }
  }
}