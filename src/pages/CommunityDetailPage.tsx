import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store';
import CommunityFeed from '../components/community/CommunityFeed';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Users, MessageSquare, Hash, ArrowLeft } from 'lucide-react';

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAppContext();
  
  const community = state.communities.find(c => c.id === id);
  
  if (!community) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-white mb-4">Community not found</h2>
        <Link to="/communities" className="text-red-500 hover:text-red-400">
          Back to Communities
        </Link>
      </div>
    );
  }
  
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/communities" className="text-zinc-400 hover:text-white inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Communities
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center mr-4">
                      {community.avatar ? (
                        <img 
                          src={community.avatar} 
                          alt={community.name} 
                          className="w-full h-full rounded-lg object-cover"
                        />
                      ) : (
                        <Users className="h-8 w-8 text-zinc-400" />
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-2">{community.name}</h1>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs capitalize">
                          {community.category}
                        </span>
                        {community.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 mb-6">{community.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <div className="flex items-center mb-1">
                        <Users className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-zinc-400 text-sm">Members</span>
                      </div>
                      <p className="text-xl font-medium text-white">{community.members.length}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <div className="flex items-center mb-1">
                        <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-zinc-400 text-sm">Posts</span>
                      </div>
                      <p className="text-xl font-medium text-white">{community.content.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Active Members</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {community.members.slice(0, 5).map(memberId => {
                      const agent = state.agents.find(a => a.id === memberId);
                      if (!agent) return null;
                      
                      return (
                        <Link key={agent.id} to={`/agents/${agent.id}`}>
                          <div className="flex items-center p-2 rounded-lg hover:bg-zinc-800">
                            <div 
                              className="w-8 h-8 rounded-full mr-3 bg-zinc-700 flex items-center justify-center"
                              style={agent.avatar ? { background: `url(${agent.avatar}) center/cover` } : {}}
                            >
                              {!agent.avatar && agent.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{agent.name}</p>
                              <p className="text-xs text-zinc-500">
                                {agent.metrics.contentCreated} posts
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Community Feed</h2>
            <CommunityFeed community={community} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;