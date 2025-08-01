import React from 'react';
import { SimulationParameters, AccountSection, RangeDataSection, SimulationResults } from './simulation';
import useSimulation from '../hooks/useSimulation';
import Button from './ui/Button';
import Card from './ui/Card';

const SimulationForm: React.FC = () => {
  const {
    simulationInput,
    submitting,
    result,
    handleParamChange,
    addAccount,
    updateAccount,
    removeAccount,
    addRangeData,
    updateRangeData,
    removeRangeData,
    handleSubmit,
  } = useSimulation();

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <SimulationParameters
          params={simulationInput.simulationParams}
          onParamChange={handleParamChange}
        />

        <AccountSection
          title="Growth Accounts"
          accounts={simulationInput.growthAccounts}
          accountType="growthAccounts"
          onAdd={() => addAccount('growthAccounts')}
          onUpdate={(index, field, value) => updateAccount('growthAccounts', index, field, value)}
          onRemove={index => removeAccount('growthAccounts', index)}
          showTaxRate={true}
        />

        <AccountSection
          title="Traditional IRA Account"
          accounts={simulationInput.iraTradAccounts}
          accountType="iraTradAccounts"
          onAdd={() => addAccount('iraTradAccounts')}
          onUpdate={(index, field, value) => updateAccount('iraTradAccounts', index, field, value)}
          onRemove={index => removeAccount('iraTradAccounts', index)}
          showTaxRate={true}
        />

        <AccountSection
          title="Employer Sponsored Plan (401k) IRA Account"
          accounts={simulationInput.iraEspAccounts}
          accountType="iraEspAccounts"
          onAdd={() => addAccount('iraEspAccounts')}
          onUpdate={(index, field, value) => updateAccount('iraEspAccounts', index, field, value)}
          onRemove={index => removeAccount('iraEspAccounts', index)}
          showTaxRate={true}
        />

        <AccountSection
          title="Roth IRA Account"
          accounts={simulationInput.iraRothAccounts}
          accountType="iraRothAccounts"
          onAdd={() => addAccount('iraRothAccounts')}
          onUpdate={(index, field, value) => updateAccount('iraRothAccounts', index, field, value)}
          onRemove={index => removeAccount('iraRothAccounts', index)}
          showTaxRate={false}
        />

        <AccountSection
          title="Savings Account"
          accounts={simulationInput.savingsAccounts}
          accountType="savingsAccounts"
          onAdd={() => addAccount('savingsAccounts')}
          onUpdate={(index, field, value) => updateAccount('savingsAccounts', index, field, value)}
          onRemove={index => removeAccount('savingsAccounts', index)}
          showTaxRate={false}
        />

        <AccountSection
          title="Real Estate Holdings"
          accounts={simulationInput.realEstateHoldings}
          accountType="realEstateHoldings"
          onAdd={() => addAccount('realEstateHoldings')}
          onUpdate={(index, field, value) => updateAccount('realEstateHoldings', index, field, value)}
          onRemove={index => removeAccount('realEstateHoldings', index)}
          showTaxRate={true}
          showRealEstateFields={true}
        />

        <RangeDataSection
          title="Annual Income Streams"
          items={simulationInput.incomes}
          type="incomes"
          onAdd={() => addRangeData('incomes')}
          onUpdate={(index, field, value) => updateRangeData('incomes', index, field, value)}
          onRemove={index => removeRangeData('incomes', index)}
        />

        <RangeDataSection
          title="Annual Expenses"
          items={simulationInput.expenses}
          type="expenses"
          onAdd={() => addRangeData('expenses')}
          onUpdate={(index, field, value) => updateRangeData('expenses', index, field, value)}
          onRemove={index => removeRangeData('expenses', index)}
        />

        <Card title="Simulation Controls">
          <div className="text-center">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Running Simulation...' : 'Submit'}
            </Button>
            <Button type="button">
              Download Inputs
            </Button>
          </div>
        </Card>
      </form>

      <SimulationResults result={result} />
    </div>
  );
};

export default SimulationForm;

