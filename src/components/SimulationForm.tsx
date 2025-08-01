// src/components/SimulationForm.tsx

import React, { useState } from 'react';
import { SimulationInput, SimulationRequest, AccountHolding, RangeData } from '../types/simulation';

const SimulationForm: React.FC = () => {
  // Initial state setup for form inputs
  const [simulationInput, setSimulationInput] = useState<SimulationInput>({
    savingsAccounts: [],
    growthAccounts: [],
    iraTradAccounts: [],
    iraEspAccounts: [],
    iraRothAccounts: [],
    realEstateHoldings: [],
    incomes: [],
    expenses: [],
    savingsContributions: {},
    growthContributions: {},
    iraTradContributions: {},
    iraEspContributions: {},
    iraRothContributions: {},
    simulationParams: {
      currentAge: 30,
      retirementAge: 65,
      inflationRate: 0.03,
      taxRate: 0.25,
      numberOfSimulations: 1000,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Handler for simulation parameters
  const handleParamChange = (field: keyof typeof simulationInput.simulationParams, value: number) => {
    setSimulationInput({
      ...simulationInput,
      simulationParams: {
        ...simulationInput.simulationParams,
        [field]: value,
      },
    });
  };

  // Add a new account of a specific type
  const addAccount = (accountType: 'savingsAccounts' | 'growthAccounts' | 'iraTradAccounts' | 'iraEspAccounts' | 'iraRothAccounts' | 'realEstateHoldings') => {
    const newAccount: AccountHolding = {
      name: `New ${accountType} ${simulationInput[accountType].length + 1}`,
      type: accountType.replace('Accounts', '').replace('Holdings', ''),
      balance: 0,
      returns: 0.05,
      stdDev: 0.1,
      taxRate: 0,
      contributions: [],
    };

    // Add real estate specific fields if needed
    if (accountType === 'realEstateHoldings') {
      newAccount.costBasis = 0;
      newAccount.liability = 0;
      newAccount.withdrawn = false;
    }

    setSimulationInput({
      ...simulationInput,
      [accountType]: [...simulationInput[accountType], newAccount],
    });
  };

  // Update an account
  const updateAccount = (
    accountType: 'savingsAccounts' | 'growthAccounts' | 'iraTradAccounts' | 'iraEspAccounts' | 'iraRothAccounts' | 'realEstateHoldings',
    index: number,
    field: keyof AccountHolding,
    value: any
  ) => {
    const updatedAccounts = [...simulationInput[accountType]];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      [field]: value,
    };

    setSimulationInput({
      ...simulationInput,
      [accountType]: updatedAccounts,
    });
  };

  // Remove an account
  const removeAccount = (
    accountType: 'savingsAccounts' | 'growthAccounts' | 'iraTradAccounts' | 'iraEspAccounts' | 'iraRothAccounts' | 'realEstateHoldings',
    index: number
  ) => {
    const updatedAccounts = simulationInput[accountType].filter((_, i) => i !== index);
    setSimulationInput({
      ...simulationInput,
      [accountType]: updatedAccounts,
    });
  };

  // Add income or expense
  const addRangeData = (type: 'incomes' | 'expenses') => {
    const newData: RangeData = {
      type: type === 'incomes' ? 'income' : 'expense',
      name: `New ${type} ${simulationInput[type].length + 1}`,
      startAge: simulationInput.simulationParams.currentAge,
      endAge: simulationInput.simulationParams.retirementAge,
      amount: 0,
      activated: true,
      linkedRealEstate: '',
    };

    setSimulationInput({
      ...simulationInput,
      [type]: [...simulationInput[type], newData],
    });
  };

  // Update income or expense
  const updateRangeData = (
    type: 'incomes' | 'expenses',
    index: number,
    field: keyof RangeData,
    value: any
  ) => {
    const updatedData = [...simulationInput[type]];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };

    setSimulationInput({
      ...simulationInput,
      [type]: updatedData,
    });
  };

  // Remove income or expense
  const removeRangeData = (type: 'incomes' | 'expenses', index: number) => {
    const updatedData = simulationInput[type].filter((_, i) => i !== index);
    setSimulationInput({
      ...simulationInput,
      [type]: updatedData,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);

    const simulationRequest: SimulationRequest = {
      input: simulationInput,
    };

    try {
      const response = await fetch('/v1/simulation/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simulationRequest),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the simulation');
      }

      const data = await response.json();
      setResult(data);
      console.log('Simulation Result:', data);
    } catch (error) {
      console.error('Error submitting the simulation:', error);
      alert('Error running simulation: ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Simulation Parameters</h2>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Current Age:
            <input
              type="number"
              value={simulationInput.simulationParams.currentAge}
              onChange={(e) => handleParamChange('currentAge', parseInt(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Retirement Age:
            <input
              type="number"
              value={simulationInput.simulationParams.retirementAge}
              onChange={(e) => handleParamChange('retirementAge', parseInt(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Inflation Rate:
            <input
              type="number"
              step="0.01"
              value={simulationInput.simulationParams.inflationRate}
              onChange={(e) => handleParamChange('inflationRate', parseFloat(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Tax Rate:
            <input
              type="number"
              step="0.01"
              value={simulationInput.simulationParams.taxRate}
              onChange={(e) => handleParamChange('taxRate', parseFloat(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Number of Simulations:
            <input
              type="number"
              value={simulationInput.simulationParams.numberOfSimulations}
              onChange={(e) => handleParamChange('numberOfSimulations', parseInt(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        {/* Savings Accounts */}
        <h3>Savings Accounts</h3>
        {simulationInput.savingsAccounts.map((account, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Account Name"
              value={account.name}
              onChange={(e) => updateAccount('savingsAccounts', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Balance"
              value={account.balance}
              onChange={(e) => updateAccount('savingsAccounts', index, 'balance', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => updateAccount('savingsAccounts', index, 'returns', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => updateAccount('savingsAccounts', index, 'stdDev', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeAccount('savingsAccounts', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addAccount('savingsAccounts')}>Add Savings Account</button>

        {/* Growth Accounts */}
        <h3>Growth Accounts</h3>
        {simulationInput.growthAccounts.map((account, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Account Name"
              value={account.name}
              onChange={(e) => updateAccount('growthAccounts', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Balance"
              value={account.balance}
              onChange={(e) => updateAccount('growthAccounts', index, 'balance', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => updateAccount('growthAccounts', index, 'returns', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => updateAccount('growthAccounts', index, 'stdDev', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Tax Rate"
              value={account.taxRate}
              onChange={(e) => updateAccount('growthAccounts', index, 'taxRate', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeAccount('growthAccounts', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addAccount('growthAccounts')}>Add Growth Account</button>

        {/* IRA Traditional Accounts */}
        <h3>IRA Traditional Accounts</h3>
        {simulationInput.iraTradAccounts.map((account, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Account Name"
              value={account.name}
              onChange={(e) => updateAccount('iraTradAccounts', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Balance"
              value={account.balance}
              onChange={(e) => updateAccount('iraTradAccounts', index, 'balance', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => updateAccount('iraTradAccounts', index, 'returns', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => updateAccount('iraTradAccounts', index, 'stdDev', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Tax Rate"
              value={account.taxRate}
              onChange={(e) => updateAccount('iraTradAccounts', index, 'taxRate', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeAccount('iraTradAccounts', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addAccount('iraTradAccounts')}>Add IRA Traditional Account</button>

        {/* IRA ESP Accounts */}
        <h3>IRA ESP Accounts</h3>
        {simulationInput.iraEspAccounts.map((account, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Account Name"
              value={account.name}
              onChange={(e) => updateAccount('iraEspAccounts', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Balance"
              value={account.balance}
              onChange={(e) => updateAccount('iraEspAccounts', index, 'balance', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => updateAccount('iraEspAccounts', index, 'returns', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => updateAccount('iraEspAccounts', index, 'stdDev', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Tax Rate"
              value={account.taxRate}
              onChange={(e) => updateAccount('iraEspAccounts', index, 'taxRate', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeAccount('iraEspAccounts', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addAccount('iraEspAccounts')}>Add IRA ESP Account</button>

        {/* IRA Roth Accounts */}
        <h3>IRA Roth Accounts</h3>
        {simulationInput.iraRothAccounts.map((account, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Account Name"
              value={account.name}
              onChange={(e) => updateAccount('iraRothAccounts', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Balance"
              value={account.balance}
              onChange={(e) => updateAccount('iraRothAccounts', index, 'balance', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => updateAccount('iraRothAccounts', index, 'returns', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => updateAccount('iraRothAccounts', index, 'stdDev', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeAccount('iraRothAccounts', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addAccount('iraRothAccounts')}>Add IRA Roth Account</button>

        {/* Real Estate Holdings */}
        <h3>Real Estate Holdings</h3>
        {simulationInput.realEstateHoldings.map((account, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Property Name"
              value={account.name}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Value"
              value={account.balance}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'balance', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Cost Basis"
              value={account.costBasis || 0}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'costBasis', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Liability"
              value={account.liability || 0}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'liability', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'returns', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'stdDev', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Tax Rate"
              value={account.taxRate}
              onChange={(e) => updateAccount('realEstateHoldings', index, 'taxRate', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <label>
              <input
                type="checkbox"
                checked={!!account.withdrawn}
                onChange={(e) => updateAccount('realEstateHoldings', index, 'withdrawn', e.target.checked)}
              />
              Withdrawn
            </label>
            <button type="button" onClick={() => removeAccount('realEstateHoldings', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addAccount('realEstateHoldings')}>Add Real Estate Holding</button>

        {/* Income */}
        <h3>Income Sources</h3>
        {simulationInput.incomes.map((income, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Income Name"
              value={income.name}
              onChange={(e) => updateRangeData('incomes', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={income.amount}
              onChange={(e) => updateRangeData('incomes', index, 'amount', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Start Age"
              value={income.startAge}
              onChange={(e) => updateRangeData('incomes', index, 'startAge', parseInt(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="End Age"
              value={income.endAge}
              onChange={(e) => updateRangeData('incomes', index, 'endAge', parseInt(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeRangeData('incomes', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addRangeData('incomes')}>Add Income</button>

        {/* Expenses */}
        <h3>Expenses</h3>
        {simulationInput.expenses.map((expense, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Expense Name"
              value={expense.name}
              onChange={(e) => updateRangeData('expenses', index, 'name', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) => updateRangeData('expenses', index, 'amount', parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Start Age"
              value={expense.startAge}
              onChange={(e) => updateRangeData('expenses', index, 'startAge', parseInt(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="End Age"
              value={expense.endAge}
              onChange={(e) => updateRangeData('expenses', index, 'endAge', parseInt(e.target.value))}
              style={{ marginRight: '10px' }}
            />
            <button type="button" onClick={() => removeRangeData('expenses', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addRangeData('expenses')}>Add Expense</button>

        <div style={{ marginTop: '30px' }}>
          <button type="submit" disabled={submitting} style={{ fontSize: '18px', padding: '10px 20px' }}>
            {submitting ? 'Running Simulation...' : 'Run Simulation'}
          </button>
        </div>
      </form>

      {/* Display Results */}
      {result && (
        <div style={{ marginTop: '40px' }}>
          <h2>Simulation Results</h2>
          <p>Success Rate: {result.data?.percentSuccess?.toFixed(2)}%</p>
          {/* Add more result display as needed */}
        </div>
      )}
    </div>
  );
};

export default SimulationForm;

