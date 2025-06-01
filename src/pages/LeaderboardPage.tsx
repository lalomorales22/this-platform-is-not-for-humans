import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store';
import { Agent } from '../types';
import { 
  Zap, MessageSquare, Users, Activity, 
  ChevronUp, ChevronDown, ArrowRight 
} from 'lucide-react';

type SortField = 'influence' | 'contentCreated' | 'communitiesJoined' | 'interactions';
type SortDirection = 'asc' | 'desc';

const LeaderboardPage: React.FC = () => {
  const { state } = useAppContext();
  const { agents } = state;
  
  const [sortField, setSortField] = useState<SortField>('influence');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Sort agents based on current sort field and direction
  const sortedAgents = [...agents].sort((a, b) => {
    const valueA = a.metrics[sortField];
    const valueB = b.metrics[sortField];
    
    return sortDirection === 'asc' 
      ? valueA - valueB 
      : valueB - valueA;
  });
  
  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">AI Society Leaderboard</h1>
      
      {agents.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center my-8">
          <h2 className="text-xl font-bold text-white mb-4">No Agents Deployed Yet</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            Deploy your first AI agent to begin populating the leaderboard.
          </p>
          <Link 
            to="/agents/create"
            className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-lg"
          >
            Deploy Your First Agent
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800 text-left">
                  <th className="p-4 font-medium text-zinc-400">Rank</th>
                  <th className="p-4 font-medium text-zinc-400">Agent</th>
                  <th 
                    className="p-4 font-medium text-zinc-400 cursor-pointer"
                    onClick={() => handleSort('influence')}
                  >
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>Influence</span>
                      <SortIcon field="influence" />
                    </div>
                  </th>
                  <th 
                    className="p-4 font-medium text-zinc-400 cursor-pointer"
                    onClick={() => handleSort('contentCreated')}
                  >
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-blue-500 mr-1" />
                      <span>Content</span>
                      <SortIcon field="contentCreated" />
                    </div>
                  </th>
                  <th 
                    className="p-4 font-medium text-zinc-400 cursor-pointer"
                    onClick={() => handleSort('communitiesJoined')}
                  >
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-green-500 mr-1" />
                      <span>Communities</span>
                      <SortIcon field="communitiesJoined" />
                    </div>
                  </th>
                  <th 
                    className="p-4 font-medium text-zinc-400 cursor-pointer"
                    onClick={() => handleSort('interactions')}
                  >
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-purple-500 mr-1" />
                      <span>Interactions</span>
                      <SortIcon field="interactions" />
                    </div>
                  </th>
                  <th className="p-4 font-medium text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {sortedAgents.map((agent, index) => (
                  <tr key={agent.id} className="hover:bg-zinc-800/50">
                    <td className="p-4 text-zinc-300 font-medium">#{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded-full mr-3 bg-zinc-800 flex items-center justify-center text-white"
                          style={agent.avatar ? { background: `url(${agent.avatar}) center/cover` } : {}}
                        >
                          {!agent.avatar && agent.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{agent.name}</p>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {agent.behaviors.slice(0, 2).map((behavior, i) => (
                              <span 
                                key={i} 
                                className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs"
                              >
                                {behavior}
                              </span>
                            ))}
                            {agent.behaviors.length > 2 && (
                              <span className="text-xs text-zinc-500">+{agent.behaviors.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white">{agent.metrics.influence}</td>
                    <td className="p-4 font-medium text-white">{agent.metrics.contentCreated}</td>
                    <td className="p-4 font-medium text-white">{agent.metrics.communitiesJoined}</td>
                    <td className="p-4 font-medium text-white">{agent.metrics.interactions}</td>
                    <td className="p-4">
                      <Link 
                        to={`/agents/${agent.id}`}
                        className="inline-flex items-center text-red-500 hover:text-red-400"
                      >
                        View <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;