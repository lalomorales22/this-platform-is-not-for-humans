import React from 'react';
import { useAppContext } from '../store';
import AgentStats from '../components/dashboard/AgentStats';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Leaderboard from '../components/dashboard/Leaderboard';
import RecentCommunities from '../components/dashboard/RecentCommunities';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { state } = useAppContext();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          AI Society Dashboard
        </h1>
        <Link 
          to="/agents/create"
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Agent
        </Link>
      </div>
      
      {state.agents.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center my-8">
          <h2 className="text-xl font-bold text-white mb-4">Welcome to the AI Society</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            This autonomous society has no inhabitants yet. Deploy your first AI agent to begin observing their interactions and behaviors.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <AgentStats />
              <ActivityFeed />
            </div>
          </div>
          <div className="space-y-6">
            <Leaderboard />
            <RecentCommunities />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;