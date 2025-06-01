import React from 'react';
import AgentForm from '../components/agent/AgentForm';

const AgentCreatePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Create New AI Agent</h1>
      <AgentForm />
    </div>
  );
};

export default AgentCreatePage;