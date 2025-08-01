// Type definitions for simulation data structures

export interface RangeData {
  startAge: number;
  endAge: number;
  amount: number;
  type: string;
  name: string;
  activated: boolean;
  linkedRealEstate: string;
}

export interface AccountHolding {
  name: string;
  type: string;
  balance: number;
  returns: number;
  stdDev: number;
  taxRate: number;
  costBasis?: number;     // For real estate
  liability?: number;     // For real estate
  withdrawn?: boolean;     // For real estate
  contributions: RangeData[];
}

export interface SimulationParams {
  currentAge: number;
  retirementAge: number;
  inflationRate: number;
  taxRate: number;
  numberOfSimulations: number;
}

export interface SimulationInput {
  savingsAccounts: AccountHolding[];
  growthAccounts: AccountHolding[];
  iraTradAccounts: AccountHolding[];
  iraEspAccounts: AccountHolding[];
  iraRothAccounts: AccountHolding[];
  realEstateHoldings: AccountHolding[];
  
  incomes: RangeData[];
  expenses: RangeData[];
  
  savingsContributions: { [accountName: string]: RangeData[] };
  growthContributions: { [accountName: string]: RangeData[] };
  iraTradContributions: { [accountName: string]: RangeData[] };
  iraEspContributions: { [accountName: string]: RangeData[] };
  iraRothContributions: { [accountName: string]: RangeData[] };
  
  simulationParams: SimulationParams;
}

export interface SimulationRequest {
  input: SimulationInput;
}

export interface SimulationResult {
  results: number[][];           // [simulation][year] results
  averageResults: number[];      // Average results per year
  percentile10: number[];        // 10th percentile per year
  percentile25: number[];        // 25th percentile per year
  percentile50: number[];        // 50th percentile per year (median)
  percentile75: number[];        // 75th percentile per year
  percentile90: number[];        // 90th percentile per year
  successRate: number;           // Percentage of simulations that succeeded
  averageFinalBalance: number;   // Average final balance across all simulations
}

export interface SimulationResponse {
  success: boolean;
  result?: SimulationResult;
  error?: string;
}
