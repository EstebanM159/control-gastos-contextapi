/* eslint-disable prefer-const */
import { v4 as uuidv4 } from 'uuid'
import { type Expense, type DraftExpense, type Category } from '../types'
// Acciones
export type BudgetActions =
{ type: 'add-budget', payload: { budget: number } } |
{ type: 'show-modal' } |
{ type: 'close-modal' } |
{ type: 'add-expense', payload: { expense: DraftExpense } } |
{ type: 'remove-expense', payload: { id: Expense['id'] } } |
{ type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
{ type: 'update-expense', payload: { expense: Expense } } |
{ type: 'reset-app' } |
{ type: 'add-filter-category', payload: { id: Category['id'] } }
// Tipo del estado
export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense['id']
  currentCategory: Category['id']
}
// Traer del localStorage
const localStorageExpenses = (): Expense[] => {
  const expenses = localStorage.getItem('expenses')
  return expenses ? JSON.parse(expenses) : []
}
const localStorageBudget = () => {
  const budget = localStorage.getItem('budget')
  return budget ? +budget : 0
}
// Estado inicial
export const initialState: BudgetState = {
  budget: localStorageBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: '',
  currentCategory: ''
}
// Al agragar un gasto se le agreaga una id
const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4()
  }
}
// Reducer que consume las acciones y modifica el estado inicial
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
      modal: false,
      editingId: ''
    }
  }
  // Agrega un gasto
  if (type === 'add-expense') {
    const expense = createExpense(action.payload.expense)
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false
    }
  }
  // Remueve un gasto
  if (type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(exp => exp.id !== action.payload.id)
    }
  }
  // Obtiene la id  de un gasto para editarla
  if (type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }
  // Edita un gasto
  if (type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map(exp => exp.id === action.payload.expense.id ? action.payload.expense : exp),
      modal: false,
      editingId: ''
    }
  }
  if (type === 'reset-app') {
    return {
      ...state,
      budget: 0,
      expenses: []
    }
  }
  // obtiene un id para filtrar por categoria
  if (type === 'add-filter-category') {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }
  return state
}
