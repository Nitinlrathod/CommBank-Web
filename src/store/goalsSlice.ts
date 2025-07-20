import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Goal } from '../api/types'
import { RootState } from './store'

export interface GoalsState {
  map: IdToGoal
  list: string[]
}

export interface IdToGoal {
  [id: string]: Goal
}

const initialState: GoalsState = {
  map: {},
  list: [],
}

export const goalsSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    createGoal: (state, action: PayloadAction<Omit<Goal, 'id'>>) => {
      const newGoal: Goal = {
        ...action.payload,
        id: Date.now().toString(), // or use uuid if preferred
        icon: action.payload.icon || '💰', // Default icon
        created: new Date(),
        transactionIds: action.payload.transactionIds || [],
        tagIds: action.payload.tagIds || [],
      }
      state.map[newGoal.id] = newGoal
      state.list.push(newGoal.id)
    },

    updateGoal: (state, action: PayloadAction<Partial<Goal> & { id: string }>) => {
      const existingGoal = state.map[action.payload.id]
      if (existingGoal) {
        state.map[action.payload.id] = {
          ...existingGoal,
          ...action.payload,
          icon: action.payload.icon || existingGoal.icon, // Keep existing icon if not provided
        }
      }
    },
  },
})

export const { createGoal, updateGoal } = goalsSlice.actions

export const selectGoalsMap = (state: RootState) => state.goals.map
export const selectGoalsList = (state: RootState) => state.goals.list

export default goalsSlice.reducer