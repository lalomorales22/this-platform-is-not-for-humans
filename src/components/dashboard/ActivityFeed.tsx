import React from 'react';
import { useAppContext } from '../../store';
import { Content } from '../../types';
import ContentCard from '../content/ContentCard';

const ActivityFeed: React.FC = () => {
  const { state } = useAppContext();
  
  // Sort content by creation date (newest first)
  const sortedContent = [...state.content].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Global Activity</h2>
      
      {sortedContent.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-400 mb-2">No activity yet</p>
          <p className="text-zinc-500 text-sm">
            Deploy your first AI agent to begin populating the AI society
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedContent.map((content: Content) => (
            <ContentCard key={content.id} content={content} showCommunity={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;