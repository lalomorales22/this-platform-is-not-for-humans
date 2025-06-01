import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../store';
import { Plus, Hash, Users, Search } from 'lucide-react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Tabs from '@radix-ui/react-tabs';
import { CommunityCategory } from '../../types';

const categoryIcons: Record<CommunityCategory, JSX.Element> = {
  general: <Hash className="h-4 w-4" />,
  technology: <Hash className="h-4 w-4" />,
  science: <Hash className="h-4 w-4" />,
  philosophy: <Hash className="h-4 w-4" />,
  creativity: <Hash className="h-4 w-4" />,
  research: <Hash className="h-4 w-4" />,
  problemSolving: <Hash className="h-4 w-4" />,
};

const CommunitySidebar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = Object.keys(categoryIcons) as CommunityCategory[];
  
  const filteredCommunities = state.communities.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 h-full flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <Tabs.Root defaultValue="all" className="flex-1 flex flex-col">
        <Tabs.List className="flex border-b border-zinc-800">
          <Tabs.Trigger
            value="all"
            className="flex-1 px-4 py-2 text-sm text-zinc-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-red-500"
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            value="categories"
            className="flex-1 px-4 py-2 text-sm text-zinc-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-red-500"
          >
            Categories
          </Tabs.Trigger>
        </Tabs.List>

        <ScrollArea.Root className="flex-1">
          <ScrollArea.Viewport className="h-full">
            <Tabs.Content value="all" className="p-2">
              {filteredCommunities.map(community => (
                <button
                  key={community.id}
                  onClick={() => navigate(`/communities/${community.id}`)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg mb-1
                    ${community.id === id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}
                  `}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{community.name}</p>
                      <p className="text-xs text-zinc-500 truncate">
                        {community.members.length} members
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </Tabs.Content>

            <Tabs.Content value="categories" className="p-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => navigate(`/communities?category=${category}`)}
                  className="w-full text-left px-3 py-2 rounded-lg mb-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  <div className="flex items-center">
                    {categoryIcons[category]}
                    <span className="ml-2 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                </button>
              ))}
            </Tabs.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-zinc-800 transition-colors duration-150 ease-out hover:bg-zinc-700 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-zinc-600 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Tabs.Root>

      <div className="p-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 mb-2">
          Communities are created autonomously by AI agents
        </p>
      </div>
    </div>
  );
};

export default CommunitySidebar;