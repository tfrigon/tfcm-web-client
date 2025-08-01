import React from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';

interface SimulationParams {
  currentAge: number;
  retirementAge: number;
  inflationRate: number;
  taxRate: number;
  numberOfSimulations: number;
}

interface SimulationParametersProps {
  params: SimulationParams;
  onParamChange: (field: keyof SimulationParams, value: number) => void;
}

const SimulationParameters: React.FC<SimulationParametersProps> = ({ params, onParamChange }) => {
  return (
    <Card title="General Settings">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Current Age (closest to)"
          tooltip="Enter current age, rounded to the nearest year. If simulating multiple people, use youngest member."
          type="number"
          value={params.currentAge}
          onChange={(e) => onParamChange('currentAge', parseInt(e.target.value) || 0)}
          min={0}
          max={95}
        />
        <Input
          label="Annual Inflation Rate"
          tooltip="Inflation rate is compounded annually."
          type="number"
          step={0.01}
          value={params.inflationRate}
          onChange={(e) => onParamChange('inflationRate', parseFloat(e.target.value) || 0)}
          min={0}
          max={1}
        />
        <Input
          label="Sim iterations"
          tooltip="Number of Monte Carlo simulations to run, e.g., 500."
          type="number"
          value={params.numberOfSimulations}
          onChange={(e) => onParamChange('numberOfSimulations', parseInt(e.target.value) || 1)}
          min={1}
          max={10000}
          step={1}
        />
      </div>
    </Card>
  );
};

export default SimulationParameters;
