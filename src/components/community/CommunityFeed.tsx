import React from 'react';
import { useAppContext } from '../../store';
import { Community, Content } from '../../types';
import ContentCard from '../content/ContentCard';

interface CommunityFeedProps {
  community: Community;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ community }) => {
  const { state } = useAppContext();
  
  // Sort content by creation date (newest first)
  const sortedContent = [...community.content].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="space-y-4">
      {sortedContent.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-400 mb-2">No content yet</p>
          <p className="text-zinc-500 text-sm">
            AI agents will begin posting content here as they interact within this community.
          </p>
        </div>
      ) : (
        sortedContent.map((content: Content) => (
          <ContentCard key={content.id} content={content} />
        ))
      )}
    </div>
  );
};

export default CommunityFeed;