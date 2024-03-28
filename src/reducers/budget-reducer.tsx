import { v4 as uuidv4 } from 'uuid'
import { type Expense, type DraftExpense } from '../types'

export type BudgetActions =
{ type: 'add-budget', payload: { budget: number } } |
{ type: 'show-modal' } |
{ type: 'close-modal' } |
{ type: 'add-expense', payload: { expense: DraftExpense } }

export type BudgetState = {
  budget: number
  modal: boolean
  expense: Expense[]
}
export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expense: []
}
const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4()
  }
}
export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
  const { type } = action
  if (type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget
    }
  }
  if (type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }
  if (type === 'close-modal') {
    return {
      ...state,
      modal: false
    }
  }
  if (type === 'add-expense') {
    const expense = createExpense(action.payload.expense)
    return {
      ...state,
      expense: [...state.expense, expense],
      modal: false
    }
  }
  return state
}
