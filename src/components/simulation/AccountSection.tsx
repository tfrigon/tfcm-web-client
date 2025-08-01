import React from 'react';
import { AccountHolding } from '../../types/simulation';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface AccountSectionProps {
  title: string;
  accounts: AccountHolding[];
  accountType: 'savingsAccounts' | 'growthAccounts' | 'iraTradAccounts' | 'iraEspAccounts' | 'iraRothAccounts' | 'realEstateHoldings';
  onAdd: () => void;
  onUpdate: (index: number, field: keyof AccountHolding, value: any) => void;
  onRemove: (index: number) => void;
  showTaxRate?: boolean;
  showRealEstateFields?: boolean;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  title,
  accounts,
  accountType,
  onAdd,
  onUpdate,
  onRemove,
  showTaxRate = false,
  showRealEstateFields = false,
}) => {
  const getAddButtonText = () => {
    switch (accountType) {
      case 'savingsAccounts':
        return 'Add Savings Account';
      case 'growthAccounts':
        return 'Add Growth Account';
      case 'iraTradAccounts':
        return 'Add IRA Traditional Account';
      case 'iraEspAccounts':
        return 'Add IRA ESP Account';
      case 'iraRothAccounts':
        return 'Add IRA Roth Account';
      case 'realEstateHoldings':
        return 'Add Property';
      default:
        return 'Add Account';
    }
  };

  const getTooltips = () => {
    switch (accountType) {
      case 'savingsAccounts':
        return {
          balance: 'Current value of savings account.',
          returns: 'Expected annual return for savings account. (0.03 for 3%)',
          stdDev: 'Standard deviation of returns for savings account. (0.05 for 5%)',
        };
      case 'growthAccounts':
        return {
          balance: 'Total value of taxable growth investments.',
          returns: 'Expected annual return for growth investments. (0.11 for 11%)',
          stdDev: 'Standard deviation of returns. (0.2 for 20%)',
          taxRate: 'Tax rate on capital gains for growth investments. (0.15 for 15%)',
        };
      case 'iraTradAccounts':
        return {
          balance: 'Current value of tax-deferred traditional IRA.',
          returns: 'Expected annual return for traditional IRA. (0.11 if 11%)',
          stdDev: 'Standard deviation of returns for traditional IRA. (0.2 for 20%)',
          taxRate: 'Tax rate applied when withdrawing from traditional IRA. (0.15 for 15%)',
        };
      case 'iraEspAccounts':
        return {
          balance: 'Current value of tax-deferred employer sponsored plan.',
          returns: 'Expected annual return for ESP. (0.11 if 11%)',
          stdDev: 'Standard deviation of returns for ESP. (0.2 for 20%)',
          taxRate: 'Tax rate applied when withdrawing from ESP. (0.15 for 15%)',
        };
      case 'iraRothAccounts':
        return {
          balance: 'Current value of Tax-free IRA Investments.',
          returns: 'Expected annual return for Roth IRA. (0.11 if 11%)',
          stdDev: 'Standard deviation of returns for Roth IRA. (0.2 for 20%)',
        };
      case 'realEstateHoldings':
        return {
          balance: 'Current market value of the property.',
          returns: 'Expected annual appreciation rate.',
          stdDev: 'Standard deviation of returns.',
          taxRate: 'Tax rate on property sale.',
        };
      default:
        return {};
    }
  };

  const tooltips = getTooltips();

  return (
    <Card title={title}>
      {accounts.map((account, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Input
              label={showRealEstateFields ? 'Property Name' : 'Account Name'}
              type="text"
              placeholder={showRealEstateFields ? 'Property Name' : 'Account Name'}
              value={account.name}
              onChange={(e) => onUpdate(index, 'name', e.target.value)}
            />
            <Input
              label={showRealEstateFields ? 'Value ($)' : 'Balance ($)'}
              tooltip={tooltips.balance}
              type="number"
              placeholder={showRealEstateFields ? 'Value' : 'Balance'}
              value={account.balance}
              onChange={(e) => onUpdate(index, 'balance', parseFloat(e.target.value) || 0)}
            />
            {showRealEstateFields && (
              <>
                <Input
                  label="Cost Basis ($)"
                  type="number"
                  placeholder="Cost Basis"
                  value={account.costBasis || 0}
                  onChange={(e) => onUpdate(index, 'costBasis', parseFloat(e.target.value) || 0)}
                />
                <Input
                  label="Liability ($)"
                  type="number"
                  placeholder="Liability"
                  value={account.liability || 0}
                  onChange={(e) => onUpdate(index, 'liability', parseFloat(e.target.value) || 0)}
                />
              </>
            )}
            <Input
              label="Annual Returns"
              tooltip={tooltips.returns}
              type="number"
              step="0.01"
              placeholder="Returns"
              value={account.returns}
              onChange={(e) => onUpdate(index, 'returns', parseFloat(e.target.value) || 0)}
            />
            <Input
              label="Std. Dev."
              tooltip={tooltips.stdDev}
              type="number"
              step="0.01"
              placeholder="Std Dev"
              value={account.stdDev}
              onChange={(e) => onUpdate(index, 'stdDev', parseFloat(e.target.value) || 0)}
            />
            {(showTaxRate || showRealEstateFields) && (
              <Input
                label="Tax Rate"
                tooltip={tooltips.taxRate}
                type="number"
                step="0.01"
                placeholder="Tax Rate"
                value={account.taxRate}
                onChange={(e) => onUpdate(index, 'taxRate', parseFloat(e.target.value) || 0)}
              />
            )}
            {showRealEstateFields && (
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!account.withdrawn}
                    onChange={(e) => onUpdate(index, 'withdrawn', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Withdrawn</span>
                </label>
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <Button
              type="button"
              variant="remove"
              onClick={() => onRemove(index)}
              className="text-sm py-1 px-3"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="text-center">
        <Button
          type="button"
          variant="add"
          onClick={onAdd}
        >
          {getAddButtonText()}
        </Button>
      </div>
    </Card>
  );
};

export default AccountSection;
