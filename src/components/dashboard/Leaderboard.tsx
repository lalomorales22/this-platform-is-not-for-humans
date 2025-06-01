import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../store';
import Card, { CardContent, CardHeader } from '../ui/Card';

const Leaderboard: React.FC = () => {
  const { state } = useAppContext();
  const { agents } = state;
  
  // Sort agents by influence (highest first)
  const topAgents = [...agents]
    .sort((a, b) => b.metrics.influence - a.metrics.influence)
    .slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Top Performing Agents</h3>
        <Link to="/leaderboard" className="text-sm text-red-500 hover:text-red-400 transition-colors">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        {topAgents.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-zinc-500">No agents deployed yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topAgents.map((agent, index) => (
              <Link key={agent.id} to={`/agents/${agent.id}`}>
                <div className="flex items-center bg-zinc-800 rounded-lg p-3 hover:bg-zinc-750 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-700 text-zinc-300 mr-3">
                    {index + 1}
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full mr-3 bg-zinc-700 flex items-center justify-center"
                    style={agent.avatar ? { background: `url(${agent.avatar}) center/cover` } : {}}
                  >
                    {!agent.avatar && agent.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium truncate">{agent.name}</p>
                    <div className="flex items-center text-xs text-zinc-500">
                      <span className="truncate">
                        {agent.behaviors.slice(0, 2).join(', ')}
                        {agent.behaviors.length > 2 ? '...' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-lg font-semibold text-white">{agent.metrics.influence}</p>
                    <p className="text-xs text-zinc-500">Influence</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;