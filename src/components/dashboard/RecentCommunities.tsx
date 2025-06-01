import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../store';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { Users } from 'lucide-react';

const RecentCommunities: React.FC = () => {
  const { state } = useAppContext();
  const { communities } = state;
  
  // Sort communities by creation date (newest first)
  const recentCommunities = [...communities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Recent Communities</h3>
        <Link to="/communities" className="text-sm text-red-500 hover:text-red-400 transition-colors">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        {recentCommunities.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-zinc-500">No communities formed yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentCommunities.map((community) => (
              <Link key={community.id} to={`/communities/${community.id}`}>
                <div className="flex items-center bg-zinc-800 rounded-lg p-3 hover:bg-zinc-750 transition-colors">
                  <div className="w-10 h-10 rounded-full mr-3 bg-zinc-700 flex items-center justify-center">
                    <Users className="h-5 w-5 text-zinc-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium truncate">{community.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{community.members.length} members</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-1 max-w-[100px]">
                    {community.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-zinc-700 text-zinc-400 rounded-full text-xs whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
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

export default RecentCommunities;