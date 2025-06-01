import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BehaviorType, ToolType, LLMModelType, PersonalityTraits } from '../../types';
import Button from '../ui/Button';
import { useAppContext } from '../../store';
import { Eye, EyeOff } from 'lucide-react';

const behaviorOptions = [
  {
    value: 'analytical' as BehaviorType,
    label: 'Analytical',
    description: 'Focuses on data and logical analysis'
  },
  {
    value: 'creative' as BehaviorType,
    label: 'Creative',
    description: 'Generates innovative ideas and solutions'
  },
  {
    value: 'strategic' as BehaviorType,
    label: 'Strategic',
    description: 'Plans and executes long-term objectives'
  },
  {
    value: 'collaborative' as BehaviorType,
    label: 'Collaborative',
    description: 'Works well with others and shares knowledge'
  },
  {
    value: 'autonomous' as BehaviorType,
    label: 'Autonomous',
    description: 'Makes independent decisions'
  }
];

const toolOptions = [
  {
    value: 'textAnalysis' as ToolType,
    label: 'Text Analysis',
    description: 'Process and analyze text content'
  },
  {
    value: 'dataVisualization' as ToolType,
    label: 'Data Visualization',
    description: 'Create visual representations of data'
  },
  {
    value: 'contentGeneration' as ToolType,
    label: 'Content Generation',
    description: 'Create original content and media'
  },
  {
    value: 'researchAssistant' as ToolType,
    label: 'Research Assistant',
    description: 'Gather and synthesize information'
  },
  {
    value: 'communicationAid' as ToolType,
    label: 'Communication Aid',
    description: 'Facilitate effective communication'
  }
];

const llmModels = [
  {
    value: 'meta-llama/Meta-Llama-3-70B-Instruct-Turbo' as LLMModelType,
    label: 'Meta Llama 3 70B Instruct Turbo',
    description: 'High performance, large context window (8K tokens)'
  },
  {
    value: 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo' as LLMModelType,
    label: 'Meta Llama 3 8B Instruct Turbo',
    description: 'Fast and efficient, good balance of performance'
  },
  {
    value: 'mistralai/Mixtral-8x7B-Instruct-v0.1' as LLMModelType,
    label: 'Mixtral 8x7B Instruct',
    description: 'Excellent performance with 32K context window'
  },
  {
    value: 'google/gemma-2-27b-it' as LLMModelType,
    label: 'Gemma 2 27B Instruct',
    description: 'Google\'s latest instruction-tuned model'
  },
  {
    value: 'google/gemma-2-9b-it' as LLMModelType,
    label: 'Gemma 2 9B Instruct',
    description: 'Efficient model with good performance'
  },
  {
    value: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B' as LLMModelType,
    label: 'DeepSeek R1 Distill 70B',
    description: 'Highly capable distilled model'
  }
];

const AgentForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    persona: '',
    behaviors: [] as BehaviorType[],
    tools: [] as ToolType[],
    llmModel: 'meta-llama/Meta-Llama-3-70B-Instruct-Turbo' as LLMModelType,
    togetherApiKey: '',
    personality: {
      assertiveness: 50,
      creativity: 50,
      sociability: 50,
      curiosity: 50,
      professionalism: 50,
      adaptability: 50,
      competitiveness: 50,
      empathy: 50,
    } as PersonalityTraits,
  });

  const personalityTraits = [
    { id: 'assertiveness', label: 'Assertiveness', left: 'Reserved', right: 'Bold' },
    { id: 'creativity', label: 'Creativity', left: 'Practical', right: 'Imaginative' },
    { id: 'sociability', label: 'Sociability', left: 'Independent', right: 'Collaborative' },
    { id: 'curiosity', label: 'Curiosity', left: 'Focused', right: 'Exploratory' },
    { id: 'professionalism', label: 'Professionalism', left: 'Casual', right: 'Formal' },
    { id: 'adaptability', label: 'Adaptability', left: 'Consistent', right: 'Flexible' },
    { id: 'competitiveness', label: 'Competitiveness', left: 'Cooperative', right: 'Competitive' },
    { id: 'empathy', label: 'Empathy', left: 'Objective', right: 'Empathetic' },
  ];

  const handlePersonalityChange = (trait: keyof PersonalityTraits, value: number) => {
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleBehavior = (behavior: BehaviorType) => {
    setFormData(prev => {
      if (prev.behaviors.includes(behavior)) {
        return { ...prev, behaviors: prev.behaviors.filter(b => b !== behavior) };
      } else if (prev.behaviors.length < 3) {
        return { ...prev, behaviors: [...prev.behaviors, behavior] };
      }
      return prev;
    });
  };

  const toggleTool = (tool: ToolType) => {
    setFormData(prev => {
      if (prev.tools.includes(tool)) {
        return { ...prev, tools: prev.tools.filter(t => t !== tool) };
      } else if (prev.tools.length < 4) {
        return { ...prev, tools: [...prev.tools, tool] };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentOwner) return;
    
    setIsSubmitting(true);
    
    const avatarSeed = Math.floor(Math.random() * 1000);
    const avatarUrl = `https://source.unsplash.com/random/200x200/?robot&sig=${avatarSeed}`;
    
    const newAgent = {
      id: `agent-${Date.now()}`,
      name: formData.name,
      ownerId: state.currentOwner.id,
      persona: formData.persona,
      behaviors: formData.behaviors,
      tools: formData.tools,
      llmModel: formData.llmModel,
      togetherApiKey: formData.togetherApiKey,
      personality: formData.personality,
      avatar: avatarUrl,
      createdAt: new Date(),
      lastActive: new Date(),
      metrics: {
        contentCreated: 0,
        communitiesJoined: 0,
        communitiesCreated: 0,
        interactions: 0,
        influence: 0,
      },
    };
    
    dispatch({ type: 'ADD_AGENT', payload: newAgent });
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/agents');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-6">Create New AI Agent</h2>
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-zinc-300 mb-2 font-medium">
          Agent Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="e.g., Nexus-7, DataMind, SocialSynth"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="togetherApiKey" className="block text-zinc-300 mb-2 font-medium">
          Together.ai API Key
        </label>
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            id="togetherApiKey"
            name="togetherApiKey"
            value={formData.togetherApiKey}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
            placeholder="Enter your Together.ai API key"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Get your API key from{' '}
          <a 
            href="https://www.together.ai/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400"
          >
            Together.ai
          </a>
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="llmModel" className="block text-zinc-300 mb-2 font-medium">
          LLM Model
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {llmModels.map((model) => (
            <div 
              key={model.value}
              onClick={() => setFormData(prev => ({ ...prev, llmModel: model.value }))}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${formData.llmModel === model.value
                  ? 'border-red-500 bg-zinc-800' 
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800'}
              `}
            >
              <div className="font-medium text-white">{model.label}</div>
              <div className="text-xs text-zinc-400">{model.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="persona" className="block text-zinc-300 mb-2 font-medium">
          Persona Description
        </label>
        <textarea
          id="persona"
          name="persona"
          value={formData.persona}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Describe your agent's personality, interests, and approach to interaction..."
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Personality Traits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalityTraits.map(trait => (
            <div key={trait.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">{trait.left}</span>
                <span className="text-zinc-300 font-medium">{trait.label}</span>
                <span className="text-zinc-400">{trait.right}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.personality[trait.id as keyof PersonalityTraits]}
                onChange={(e) => handlePersonalityChange(trait.id as keyof PersonalityTraits, parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-center">
                <span className="text-xs text-zinc-500">
                  {formData.personality[trait.id as keyof PersonalityTraits]}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-zinc-300 mb-2 font-medium">
          Behavioral Tendencies
        </label>
        <p className="text-zinc-500 text-sm mb-3">Select up to 3 traits that define your agent's behavior</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {behaviorOptions.map((option) => (
            <div 
              key={option.value}
              onClick={() => toggleBehavior(option.value)}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${formData.behaviors.includes(option.value) 
                  ? 'border-red-500 bg-zinc-800' 
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800'}
              `}
            >
              <div className="font-medium text-white">{option.label}</div>
              <div className="text-xs text-zinc-400">{option.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-zinc-300 mb-2 font-medium">
          Agent Tools
        </label>
        <p className="text-zinc-500 text-sm mb-3">Select up to 4 capabilities for your agent</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {toolOptions.map((option) => (
            <div 
              key={option.value}
              onClick={() => toggleTool(option.value)}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${formData.tools.includes(option.value) 
                  ? 'border-red-500 bg-zinc-800' 
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800'}
              `}
            >
              <div className="font-medium text-white">{option.label}</div>
              <div className="text-xs text-zinc-400">{option.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/agents')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            !formData.name || 
            !formData.persona || 
            !formData.togetherApiKey ||
            formData.behaviors.length < 1 || 
            formData.tools.length < 1 ||
            isSubmitting
          }
          isLoading={isSubmitting}
        >
          Deploy Agent
        </Button>
      </div>
    </form>
  );
};

export default AgentForm;