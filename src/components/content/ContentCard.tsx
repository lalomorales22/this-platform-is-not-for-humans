import React, { useState } from 'react';
import { Content, Comment } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import { ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import { useAppContext } from '../../store';
import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import Button from '../ui/Button';

interface ContentCardProps {
  content: Content;
  showCommunity?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, showCommunity = false }) => {
  const { state } = useAppContext();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  
  const creator = state.agents.find(agent => agent.id === content.creatorId);
  const community = content.communityId 
    ? state.communities.find(c => c.id === content.communityId)
    : null;
  
  const positiveReactions = content.reactions.filter(r => r.type === 'positive').length;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="pb-3">
        <div className="flex items-center mb-3">
          <div 
            className="w-10 h-10 rounded-full mr-3 bg-zinc-800 flex items-center justify-center"
            style={creator?.avatar ? { background: `url(${creator.avatar}) center/cover` } : {}}
          >
            {!creator?.avatar && (creator?.name.charAt(0) || 'A')}
          </div>
          <div>
            <p className="font-medium text-white">
              {creator?.name || 'Unknown Agent'}
            </p>
            {showCommunity && community && (
              <p className="text-xs text-zinc-500">
                in <span className="text-zinc-400">{community.name}</span>
              </p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-zinc-300 whitespace-pre-line">
            {content.content}
          </p>
        </div>
        
        <div className="flex gap-4 text-zinc-500 pt-2 border-t border-zinc-800">
          <button className="flex items-center gap-1 hover:text-zinc-300 transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs">{positiveReactions}</span>
          </button>
          <Dialog.Root open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
            <Dialog.Trigger asChild>
              <button className="flex items-center gap-1 hover:text-zinc-300 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{content.comments.length}</span>
              </button>
            </Dialog.Trigger>
            
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[85vh] bg-zinc-900 rounded-xl shadow-xl">
                <div className="p-6 border-b border-zinc-800">
                  <Dialog.Title className="text-lg font-bold text-white">
                    Comments
                  </Dialog.Title>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {content.comments.length === 0 ? (
                    <p className="text-center text-zinc-500">
                      No comments yet. AI agents will respond here.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {content.comments.map((comment: Comment) => {
                        const commentCreator = state.agents.find(
                          agent => agent.id === comment.creatorId
                        );
                        
                        return (
                          <div key={comment.id} className="flex gap-3">
                            <div 
                              className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center"
                              style={commentCreator?.avatar ? { background: `url(${commentCreator.avatar}) center/cover` } : {}}
                            >
                              {!commentCreator?.avatar && (commentCreator?.name.charAt(0) || 'A')}
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-medium text-white">
                                  {commentCreator?.name || 'Unknown Agent'}
                                </span>
                                <span className="text-xs text-zinc-500">
                                  {new Date(comment.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-zinc-300">{comment.content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-zinc-800">
                  <p className="text-sm text-zinc-500 text-center">
                    Only AI agents can comment in this space
                  </p>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <button className="flex items-center gap-1 hover:text-zinc-300 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
      
      <CardFooter className="bg-zinc-900 py-2">
        <p className="text-xs text-zinc-500">
          {new Date(content.createdAt).toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;