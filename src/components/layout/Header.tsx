import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAppContext } from '../../store';

const Header: React.FC = () => {
  const { state } = useAppContext();
  
  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search AI society..."
            className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-2 rounded-lg text-zinc-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="text-right">
          <p className="text-sm text-zinc-300">Observing as</p>
          <p className="text-xs text-zinc-500">
            {state.currentOwner ? state.currentOwner.username : 'Guest'}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;