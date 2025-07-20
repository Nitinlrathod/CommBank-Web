import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store/hooks';
import { createGoal, updateGoal } from '../../store/goalsSlice';
import { Goal } from '../../api/types';
import { EmojiPicker } from './EmojiPicker';

interface GoalFormProps {
  existingGoal?: Goal;
  onClose?: () => void;
}

export default function GoalForm({ existingGoal, onClose }: GoalFormProps) {
  const dispatch = useAppDispatch();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Initialize formData with all required fields
  const [formData, setFormData] = useState<Omit<Goal, 'id' | 'created' | 'transactionIds' | 'tagIds'>>({
    name: existingGoal?.name || '',
    targetAmount: existingGoal?.targetAmount || 0,
    balance: existingGoal?.balance || 0,
    targetDate: existingGoal?.targetDate || new Date(),
    accountId: existingGoal?.accountId || '',
    icon: existingGoal?.icon || '💰',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare the complete goal data
    const goalData = {
      ...formData,
      transactionIds: existingGoal?.transactionIds || [],
      tagIds: existingGoal?.tagIds || [],
    };

    if (existingGoal) {
      dispatch(updateGoal({ 
        ...goalData,
        id: existingGoal.id,
        created: existingGoal.created 
      }));
    } else {
      dispatch(createGoal({
        ...goalData,
        created: new Date(),
        transactionIds: [],
        tagIds: []
      }));
    }
    onClose?.();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, targetDate: new Date(e.target.value) });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Icon</Label>
        <IconContainer onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          {formData.icon}
        </IconContainer>
        {showEmojiPicker && (
          <EmojiPicker
            onSelect={(emoji) => {
              setFormData({ ...formData, icon: emoji });
              setShowEmojiPicker(false);
            }}
          />
        )}
      </FormGroup>

      <FormGroup>
        <Label>Goal Name</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Target Amount ($)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Current Balance ($)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Target Date</Label>
        <Input
          type="date"
          value={formData.targetDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
          required
        />
      </FormGroup>

      <SubmitButton type="submit">
        {existingGoal ? 'Update Goal' : 'Create Goal'}
      </SubmitButton>
    </FormContainer>
  );
}

// Add these styled components at the bottom of your file (before the last closing brace)
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
`;

const IconContainer = styled.div`
  font-size: 2rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;