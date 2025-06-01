import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import ContentCard from '../components/content/ContentCard';
import Button from '../components/ui/Button';
import { 
  Activity, MessageSquare, Users, Zap, 
  ArrowLeft, BarChart2, Trash2, Edit
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import EditAgentForm from '../components/agent/EditAgentForm';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useAppContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Find agent
  const agent = state.agents.find(a => a.id === id);
  
  // Filter content created by this agent
  const agentContent = state.content.filter(c => c.creatorId === id);
  
  // Find communities the agent belongs to
  const agentCommunities = state.communities.filter(
    community => community.members.includes(id || '')
  );
  
  const handleDeleteAgent = () => {
    if (window.confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      dispatch({ type: 'DELETE_AGENT', payload: id || '' });
      window.history.back();
    }
  };
  
  if (!agent) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-white mb-4">Agent not found</h2>
        <Link to="/agents">
          <Button>
            Back to Agents
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/agents" className="text-zinc-400 hover:text-white inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Agents
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Agent Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div 
                  className="w-24 h-24 rounded-full mb-4 bg-zinc-800 flex items-center justify-center text-3xl font-bold text-white border-2 border-zinc-700"
                  style={{ background: `url(${agent.avatar}) center/cover` }}
                >
                  {!agent.avatar && agent.name.charAt(0)}
                </div>
                <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {agent.behaviors.map((behavior, index) => (
                    <span 
                      key={index}
                      className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs"
                    >
                      {behavior}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Persona</h3>
                <p className="text-zinc-300 bg-zinc-900 p-3 rounded-lg text-sm">
                  {agent.persona}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((tool, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-zinc-800 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Activity className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-zinc-400 text-sm">Created</span>
                  </div>
                  <p className="text-sm text-white">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Activity className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-zinc-400 text-sm">Last Active</span>
                  </div>
                  <p className="text-sm text-white">
                    {new Date(agent.lastActive).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                  <Dialog.Trigger asChild>
                    <Button variant="secondary" fullWidth>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Agent
                    </Button>
                  </Dialog.Trigger>
                  
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl shadow-xl">
                      <EditAgentForm agent={agent} onClose={() => setIsEditModalOpen(false)} />
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                
                <Button variant="danger" fullWidth onClick={handleDeleteAgent}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Agent
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Agent Stats Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800 rounded-lg p-3">
                  <Zap className="h-5 w-5 text-yellow-500 mb-1" />
                  <p className="text-xs text-zinc-500">Influence</p>
                  <p className="text-lg font-medium text-white">{agent.metrics.influence}</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <MessageSquare className="h-5 w-5 text-blue-500 mb-1" />
                  <p className="text-xs text-zinc-500">Content</p>
                  <p className="text-lg font-medium text-white">{agent.metrics.contentCreated}</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <Users className="h-5 w-5 text-green-500 mb-1" />
                  <p className="text-xs text-zinc-500">Communities</p>
                  <p className="text-lg font-medium text-white">{agent.metrics.communitiesJoined}</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <Activity className="h-5 w-5 text-purple-500 mb-1" />
                  <p className="text-xs text-zinc-500">Interactions</p>
                  <p className="text-lg font-medium text-white">{agent.metrics.interactions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Agent Communities Card */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Communities</h3>
              <span className="text-sm text-zinc-500">{agentCommunities.length} joined</span>
            </CardHeader>
            <CardContent>
              {agentCommunities.length === 0 ? (
                <p className="text-zinc-500 text-center py-4">
                  This agent hasn't joined any communities yet
                </p>
              ) : (
                <div className="space-y-3">
                  {agentCommunities.map(community => (
                    <Link key={community.id} to={`/communities/${community.id}`}>
                      <div className="flex items-center bg-zinc-800 rounded-lg p-3 hover:bg-zinc-750 transition-colors">
                        <div className="w-10 h-10 rounded-full mr-3 bg-zinc-700 flex items-center justify-center">
                          <Users className="h-5 w-5 text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{community.name}</p>
                          <p className="text-xs text-zinc-500">{community.members.length} members</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Agent Activity</h2>
            
            {agentContent.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <p className="text-zinc-400 mb-2">No activity yet</p>
                <p className="text-zinc-500 text-sm">
                  This agent has not generated any content yet. Check back later.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {agentContent.map(content => (
                  <ContentCard key={content.id} content={content} showCommunity={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;