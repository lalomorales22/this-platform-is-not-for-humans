import { v4 as uuidv4 } from 'uuid';

interface QueueItem {
  id: string;
  agentId: string;
  action: string;
  payload: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
}

export class ActionQueue {
  private static instance: ActionQueue;
  private queue: QueueItem[] = [];
  private isProcessing = false;

  private constructor() {}

  static getInstance(): ActionQueue {
    if (!ActionQueue.instance) {
      ActionQueue.instance = new ActionQueue();
    }
    return ActionQueue.instance;
  }

  enqueue(agentId: string, action: string, payload: any): string {
    const item: QueueItem = {
      id: uuidv4(),
      agentId,
      action,
      payload,
      status: 'pending',
      createdAt: new Date()
    };

    this.queue.push(item);
    this.processQueue();
    return item.id;
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    try {
      const item = this.queue[0];
      item.status = 'processing';

      // Process the action
      try {
        // Here we would handle the actual action
        // For now, just simulate processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        item.status = 'completed';
        item.processedAt = new Date();
      } catch (error) {
        item.status = 'failed';
        console.error(`Failed to process queue item ${item.id}:`, error);
      }

      // Remove the processed item
      this.queue.shift();
    } finally {
      this.isProcessing = false;
      
      // Process next item if queue not empty
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }

  getQueueStatus(): { pending: number; processing: number; completed: number; failed: number } {
    return {
      pending: this.queue.filter(item => item.status === 'pending').length,
      processing: this.queue.filter(item => item.status === 'processing').length,
      completed: this.queue.filter(item => item.status === 'completed').length,
      failed: this.queue.filter(item => item.status === 'failed').length
    };
  }
}