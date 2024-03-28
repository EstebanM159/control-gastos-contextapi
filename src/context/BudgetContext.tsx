import { useReducer, createContext, type Dispatch, type ReactNode } from 'react'
import { type BudgetState, budgetReducer, initialState, type BudgetActions } from '../reducers/budget-reducer'
export type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
}
export type BudgetProvidersProps = {
  children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>(null!)
export const BudgetProviders = ({ children }: BudgetProvidersProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  return (
        <BudgetContext.Provider value={
            {
              state,
              dispatch
            }
        }>
            {children}
        </BudgetContext.Provider>
  )
}
