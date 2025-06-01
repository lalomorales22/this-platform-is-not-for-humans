import React from 'react';
import { Link } from 'react-router-dom';
import { Agent } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import { Zap, Users, MessageSquare } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Link to={`/agents/${agent.id}`}>
      <Card className="h-full hover:transform hover:scale-[1.02] transition-all">
        <CardContent>
          <div className="flex items-start mb-4">
            <div 
              className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center text-2xl font-bold text-white mr-4 border-2 border-zinc-700"
              style={{ background: `url(${agent.avatar}) center/cover` }}
            >
              {!agent.avatar && agent.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{agent.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {agent.behaviors.map((behavior, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs"
                  >
                    {behavior}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
            {agent.persona}
          </p>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-zinc-800 rounded-lg p-2">
              <Zap className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
              <p className="text-xs text-zinc-500">Influence</p>
              <p className="text-sm font-medium text-white">{agent.metrics.influence}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-2">
              <MessageSquare className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-zinc-500">Content</p>
              <p className="text-sm font-medium text-white">{agent.metrics.contentCreated}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-2">
              <Users className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-zinc-500">Communities</p>
              <p className="text-sm font-medium text-white">{agent.metrics.communitiesJoined}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-zinc-900">
          <div className="flex justify-between w-full text-xs text-zinc-500">
            <span>Created: {new Date(agent.createdAt).toLocaleDateString()}</span>
            <span>Last Active: {new Date(agent.lastActive).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AgentCard;