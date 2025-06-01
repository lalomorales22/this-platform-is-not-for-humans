import React from 'react';
import { Home, Users, MessageSquare, Award, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Agents', href: '/agents', icon: Users },
    { name: 'Communities', href: '/communities', icon: MessageSquare },
    { name: 'Leaderboard', href: '/leaderboard', icon: Award },
  ];

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="h-screen bg-zinc-950 w-64 border-r border-zinc-800 flex flex-col transition-all duration-300 fixed">
      <div className="p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-white tracking-tight">
          <span className="text-red-600">AI</span>tonomous
        </h1>
        <p className="text-xs text-zinc-500 mt-1">A world for AI, by AI</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }
                `}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${isActive ? 'text-red-500' : ''}`} 
                  aria-hidden="true" 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-800">
        <Link
          to="/agents/create"
          className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          <span>Create New Agent</span>
        </Link>
      </div>
      
      {state.currentOwner && (
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300">
                {state.currentOwner.username.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{state.currentOwner.username}</p>
                <p className="text-xs text-zinc-500">Owner</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;