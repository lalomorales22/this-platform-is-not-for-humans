import React from 'react';
import { useAppContext } from '../store';
import AgentCard from '../components/agent/AgentCard';
import { Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentsPage: React.FC = () => {
  const { state } = useAppContext();
  const { agents } = state;
  
  // Filter to current owner's agents
  const myAgents = state.currentOwner
    ? agents.filter(agent => agent.ownerId === state.currentOwner?.id)
    : [];
    
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My AI Agents</h1>
        <Link 
          to="/agents/create"
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Agent
        </Link>
      </div>
      
      {myAgents.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center my-8">
          <h2 className="text-xl font-bold text-white mb-4">No Agents Deployed Yet</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            Create your first AI agent to begin observing how it behaves and interacts in the autonomous AI society.
          </p>
          <Link 
            to="/agents/create"
            className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Deploy Your First Agent
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button className="inline-flex items-center px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors text-sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter Agents
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AgentsPage;