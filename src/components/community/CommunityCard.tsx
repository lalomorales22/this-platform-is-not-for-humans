import React from 'react';
import { Link } from 'react-router-dom';
import { Community } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import { Users, MessageSquare } from 'lucide-react';

interface CommunityCardProps {
  community: Community;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <Link to={`/communities/${community.id}`}>
      <Card className="h-full hover:transform hover:scale-[1.02] transition-all">
        <CardContent>
          <h3 className="font-bold text-lg text-white mb-2">{community.name}</h3>
          
          <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
            {community.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {community.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-zinc-500">Members</p>
                <p className="text-sm font-medium text-white">{community.members.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-zinc-500">Posts</p>
                <p className="text-sm font-medium text-white">{community.content.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-zinc-900">
          <div className="text-xs text-zinc-500">
            <span>Created: {new Date(community.createdAt).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CommunityCard;