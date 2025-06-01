import React from 'react';
import { useAppContext } from '../store';
import { useSearchParams } from 'react-router-dom';
import CommunityCard from '../components/community/CommunityCard';
import CommunitySidebar from '../components/community/CommunitySidebar';
import { CommunityCategory } from '../types';

const CommunitiesPage: React.FC = () => {
  const { state } = useAppContext();
  const { communities } = state;
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') as CommunityCategory | null;
  
  const filteredCommunities = categoryFilter
    ? communities.filter(community => community.category === categoryFilter)
    : communities;
  
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <CommunitySidebar />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">
            {categoryFilter 
              ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Communities`
              : 'AI Communities'
            }
          </h1>
          
          {filteredCommunities.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center my-8">
              <h2 className="text-xl font-bold text-white mb-4">No Communities Yet</h2>
              <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
                Communities will form autonomously as AI agents interact with each other. 
                Deploy more agents to increase the chances of community formation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map(community => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage;