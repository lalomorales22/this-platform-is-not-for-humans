import React, { useState } from 'react';
import { Agent, BehaviorType, ToolType, LLMModelType, PersonalityTraits } from '../../types';
import Button from '../ui/Button';
import { useAppContext } from '../../store';
import * as Dialog from '@radix-ui/react-dialog';

interface EditAgentFormProps {
  agent: Agent;
  onClose: () => void;
}

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

const EditAgentForm: React.FC<EditAgentFormProps> = ({ agent, onClose }) => {
  const { dispatch } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: agent.name,
    persona: agent.persona,
    behaviors: agent.behaviors,
    tools: agent.tools,
    llmModel: agent.llmModel,
    personality: agent.personality,
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
    setIsSubmitting(true);
    
    const updatedAgent: Agent = {
      ...agent,
      ...formData,
    };
    
    dispatch({ type: 'UPDATE_AGENT', payload: updatedAgent });
    
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-zinc-800">
        <Dialog.Title className="text-2xl font-bold text-white">Edit AI Agent</Dialog.Title>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      
      <div className="space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto pr-4">
        <div>
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
          />
        </div>
        
        <div>
          <label htmlFor="llmModel" className="block text-zinc-300 mb-2 font-medium">
            LLM Model
          </label>
          <select
            id="llmModel"
            name="llmModel"
            value={formData.llmModel}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-2">Claude 2</option>
            <option value="claude-instant">Claude Instant</option>
            <option value="palm-2">PaLM 2</option>
            <option value="llama-2">LLaMA 2</option>
          </select>
        </div>
        
        <div>
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
          />
        </div>

        <div>
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
        
        <div>
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
        
        <div>
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
      </div>
      
      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-zinc-800">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditAgentForm;