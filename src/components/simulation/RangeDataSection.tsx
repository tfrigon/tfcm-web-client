import React from 'react';
import { RangeData } from '../../types/simulation';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface RangeDataSectionProps {
  title: string;
  items: RangeData[];
  type: 'incomes' | 'expenses';
  onAdd: () => void;
  onUpdate: (index: number, field: keyof RangeData, value: any) => void;
  onRemove: (index: number) => void;
}

const RangeDataSection: React.FC<RangeDataSectionProps> = ({
  title,
  items,
  type,
  onAdd,
  onUpdate,
  onRemove,
}) => {
  const itemLabel = type === 'incomes' ? 'Income' : 'Expense';
  const addButtonText = type === 'incomes' ? 'Add Income Stream' : 'Add Expense Stream';

  return (
    <Card title={title}>
      {items.map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input
              label={`${itemLabel} Name`}
              type="text"
              placeholder={`${itemLabel} Name`}
              value={item.name}
              onChange={(e) => onUpdate(index, 'name', e.target.value)}
            />
            <Input
              label="Amount ($)"
              type="number"
              placeholder="Amount"
              value={item.amount}
              onChange={(e) => onUpdate(index, 'amount', parseFloat(e.target.value) || 0)}
            />
            <Input
              label="Start Age"
              type="number"
              placeholder="Start Age"
              value={item.startAge}
              onChange={(e) => onUpdate(index, 'startAge', parseInt(e.target.value) || 0)}
            />
            <Input
              label="End Age"
              type="number"
              placeholder="End Age"
              value={item.endAge}
              onChange={(e) => onUpdate(index, 'endAge', parseInt(e.target.value) || 0)}
            />
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
          {addButtonText}
        </Button>
      </div>
    </Card>
  );
};

export default RangeDataSection;
