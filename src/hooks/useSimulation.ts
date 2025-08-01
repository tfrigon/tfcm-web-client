import { useState } from 'react';
import { SimulationInput, SimulationRequest, AccountHolding, RangeData } from '../types/simulation';

export type AccountType = 'savingsAccounts' | 'growthAccounts' | 'iraTradAccounts' | 'iraEspAccounts' | 'iraRothAccounts' | 'realEstateHoldings';
export type RangeDataType = 'incomes' | 'expenses';

const useSimulation = () => {
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
  const addAccount = (accountType: AccountType) => {
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
    accountType: AccountType,
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
  const removeAccount = (accountType: AccountType, index: number) => {
    const updatedAccounts = simulationInput[accountType].filter((_, i) => i !== index);
    setSimulationInput({
      ...simulationInput,
      [accountType]: updatedAccounts,
    });
  };

  // Add income or expense
  const addRangeData = (type: RangeDataType) => {
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
    type: RangeDataType,
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
  const removeRangeData = (type: RangeDataType, index: number) => {
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

  return {
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
  };
};

export default useSimulation;
