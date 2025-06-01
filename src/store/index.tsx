import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Agent, Community, Content, Challenge, Owner } from '../types';

// Define the state shape
interface AppState {
  agents: Agent[];
  communities: Community[];
  content: Content[];
  challenges: Challenge[];
  owners: Owner[];
  currentOwner: Owner | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
}

// Define action types
type Action =
  | { type: 'SET_CURRENT_OWNER'; payload: Owner }
  | { type: 'ADD_AGENT'; payload: Agent }
  | { type: 'UPDATE_AGENT'; payload: Agent }
  | { type: 'DELETE_AGENT'; payload: string }
  | { type: 'ADD_COMMUNITY'; payload: Community }
  | { type: 'UPDATE_COMMUNITY'; payload: Community }
  | { type: 'ADD_CONTENT'; payload: Content }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'UPDATE_CHALLENGE'; payload: Challenge }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOGIN'; payload: Owner }
  | { type: 'LOGOUT' };

// Create initial state
const initialState: AppState = {
  agents: [],
  communities: [],
  content: [],
  challenges: [],
  owners: [
    {
      id: 'owner1',
      username: 'TestOwner',
      agents: [],
      challenges: [],
    },
  ],
  currentOwner: null,
  isAuthenticated: false,
  isDarkMode: true,
};

// Create reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CURRENT_OWNER':
      return { ...state, currentOwner: action.payload };
    case 'ADD_AGENT':
      return {
        ...state,
        agents: [...state.agents, action.payload],
        owners: state.owners.map(owner => 
          owner.id === action.payload.ownerId 
            ? { ...owner, agents: [...owner.agents, action.payload.id] } 
            : owner
        ),
      };
    case 'UPDATE_AGENT':
      return {
        ...state,
        agents: state.agents.map(agent => 
          agent.id === action.payload.id ? action.payload : agent
        ),
      };
    case 'DELETE_AGENT':
      return {
        ...state,
        agents: state.agents.filter(agent => agent.id !== action.payload),
        owners: state.owners.map(owner => ({
          ...owner,
          agents: owner.agents.filter(agentId => agentId !== action.payload),
        })),
      };
    case 'ADD_COMMUNITY':
      return {
        ...state,
        communities: [...state.communities, action.payload],
      };
    case 'UPDATE_COMMUNITY':
      return {
        ...state,
        communities: state.communities.map(community => 
          community.id === action.payload.id ? action.payload : community
        ),
      };
    case 'ADD_CONTENT':
      return {
        ...state,
        content: [...state.content, action.payload],
        communities: action.payload.communityId
          ? state.communities.map(community =>
              community.id === action.payload.communityId
                ? {
                    ...community,
                    content: [...community.content, action.payload],
                  }
                : community
            )
          : state.communities,
      };
    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload],
        owners: state.owners.map(owner =>
          owner.id === action.payload.ownerId
            ? { ...owner, challenges: [...owner.challenges, action.payload.id] }
            : owner
        ),
      };
    case 'UPDATE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id ? action.payload : challenge
        ),
      };
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'LOGIN':
      return {
        ...state,
        currentOwner: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentOwner: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Create hook for using context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}