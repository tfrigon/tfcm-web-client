import React from 'react';
import Card from '../ui/Card';

interface SimulationResultsProps {
  result: any;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  const successRate = result.data?.percentSuccess || 0;
  
  // Determine the color class based on success rate
  const getSuccessColorClass = (rate: number) => {
    if (rate >= 80) return 'bg-gradient-to-r from-[#66BB6A] to-[#2E7D32] text-white';
    if (rate >= 60) return 'bg-gradient-to-r from-[#FFECB3] to-[#FFC107] text-gray-800';
    return 'bg-gradient-to-r from-[#EF9A9A] to-[#D32F2F] text-white';
  };

  return (
    <Card title="Simulation Results">
      <div className="flex justify-center mb-6">
        <div className={`
          rounded-full 
          px-8 py-4 
          text-center 
          text-xl 
          font-medium
          ${getSuccessColorClass(successRate)}
        `}>
          Success Rate: {successRate.toFixed(2)}%
        </div>
      </div>
      
      {/* Placeholder for charts */}
      <div className="space-y-6">
        {[
          'Total Wealth',
          'Growth Accounts',
          'IRA Traditional',
          'IRA ESP',
          'IRA Roth',
          'Real Estate',
          'Savings',
          'Annual Surplus/Deficit'
        ].map((chartTitle) => (
          <div key={chartTitle} className="
            bg-white 
            border border-[#1b5e20] 
            rounded-xl 
            p-6 
            mx-auto 
            shadow-lg 
            hover:shadow-xl 
            transition-shadow 
            duration-200 
            w-[90%]
          ">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">{chartTitle}</h4>
            <div className="h-[400px] bg-gray-100 rounded flex items-center justify-center text-gray-500">
              Chart placeholder for {chartTitle}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SimulationResults;
