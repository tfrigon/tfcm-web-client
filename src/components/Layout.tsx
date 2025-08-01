import React, { useState } from 'react';
import SimulationForm from './SimulationForm';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'simulator' | 'guide'>('simulator');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-8">Wealth Simulator</h2>
        <nav className="space-y-2">
          <button
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
              activeTab === 'info' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveTab('info')}
          >
            <span className="mr-2">🐸</span> Info
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
              activeTab === 'simulator' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveTab('simulator')}
          >
            <span className="mr-2">🐉</span> Simulator
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
              activeTab === 'guide' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveTab('guide')}
          >
            <span className="mr-2">🐠</span> User Guide & Disclosures
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'info' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Assumptions for Monte Carlo simulation:
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700">
                This simulation uses Monte Carlo methods to project potential financial outcomes
                based on your inputs. The simulation runs multiple iterations with randomized
                market returns to provide a probabilistic view of your financial future.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div>
            {/* Logo */}
            <div className="text-center mb-4">
              <img 
                src="/tfcm-logo-nobg.png" 
                alt="TFCM Logo" 
                className="inline-block max-h-[200px] max-w-full"
              />
            </div>

            {/* Title */}
            <h1 className="text-center text-[#054520] font-semibold text-4xl mb-6">
              Financial MonteCarlo Simulation
            </h1>

            {/* Simulation Form */}
            <SimulationForm />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Guide for using Monte Carlo Simulator
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700">
                User guide and disclosures will be displayed here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
