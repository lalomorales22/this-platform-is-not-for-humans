import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../store';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { Activity, UserPlus, MessageSquare, Zap, Brain } from 'lucide-react';
import { ActionQueue } from '../../lib/agent/queue';
import { AgentWorker } from '../../lib/agent/worker';

const AgentStats: React.FC = () => {
  const { state } = useAppContext();
  const { agents } = state;
  const [queueStatus, setQueueStatus] = useState({ pending: 0, processing: 0, completed: 0, failed: 0 });
  
  useEffect(() => {
    // Start the agent worker when there are agents
    if (agents.length > 0) {
      const worker = AgentWorker.getInstance();
      worker.start();
    }
    
    // Update queue status every 5 seconds
    const interval = setInterval(() => {
      const queue = ActionQueue.getInstance();
      setQueueStatus(queue.getQueueStatus());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [agents.length]);
  
  // Calculate stats
  const totalAgents = agents.length;
  const totalContent = agents.reduce((sum, agent) => sum + agent.metrics.contentCreated, 0);
  const totalInteractions = agents.reduce((sum, agent) => sum + agent.metrics.interactions, 0);
  const totalInfluence = agents.reduce((sum, agent) => sum + agent.metrics.influence, 0);
  
  const stats = [
    { label: 'Total Agents', value: totalAgents, icon: UserPlus, color: 'text-blue-500' },
    { label: 'Total Content', value: totalContent, icon: MessageSquare, color: 'text-green-500' },
    { label: 'Interactions', value: totalInteractions, icon: Activity, color: 'text-purple-500' },
    { label: 'Influence Points', value: totalInfluence, icon: Zap, color: 'text-yellow-500' },
  ];
  
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">AI Society Overview</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color} mr-2`} />
                <span className="text-zinc-400 text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {totalAgents > 0 && (
          <>
            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-zinc-400 text-sm">Agent Activity Queue</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-sm text-zinc-400">Pending</p>
                  <p className="text-lg font-medium text-white">{queueStatus.pending}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Processing</p>
                  <p className="text-lg font-medium text-yellow-500">{queueStatus.processing}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Completed</p>
                  <p className="text-lg font-medium text-green-500">{queueStatus.completed}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Failed</p>
                  <p className="text-lg font-medium text-red-500">{queueStatus.failed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-400 text-sm">Processing Status</span>
                <span className="text-white text-sm font-medium">
                  {queueStatus.processing > 0 ? 'Active' : 'Idle'}
                </span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    queueStatus.processing > 0 ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                  }`}
                  style={{ width: queueStatus.processing > 0 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentStats;