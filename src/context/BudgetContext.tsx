import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from 'react'
import { type BudgetState, budgetReducer, initialState, type BudgetActions } from '../reducers/budget-reducer'

export type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
  isValidBudget: boolean
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export type BudgetProvidersProps = {
  children: ReactNode
}

export const BudgetProviders = ({ children }: BudgetProvidersProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
  const remainingBudget = state.budget - totalExpenses
  return (
        <BudgetContext.Provider value={
            {
              state,
              dispatch,
              totalExpenses,
              remainingBudget,
              isValidBudget
            }
        }>
            {children}
        </BudgetContext.Provider>
  )
}
