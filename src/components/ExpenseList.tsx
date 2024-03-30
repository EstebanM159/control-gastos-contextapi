import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'
import { categories } from '../data'
export default function ExpenseList () {
  const { state } = useBudget()
  // Filtra por categoria
  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(expense => expense.category === state.currentCategory)
    : state.expenses
  const isEmpty = useMemo(() => filteredExpenses.length > 0, [filteredExpenses])
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === state.currentCategory)[0], [filteredExpenses])

  return (
    <>
    {/* CARTEL : NO HAY PARA ESA CATEGORIA */}
     <div className='mt-10 bg-white shadow-lg rounded-lg p-10'>
        {isEmpty
          ? <>
            <p className='text-gray-600 text-2xl font-bold mb-5'>Listado de Gastos</p>
            {
                filteredExpenses.map(exp => (
                    <ExpenseDetail
                        key={exp.id}
                        expense={exp}
                    />
                ))
            }
        </>
          : <p className='text-xl text-center font-semibold'>No hay gastos {categoryInfo && `de ${categoryInfo.name}`}</p>
        }
    </div>

    </>
  )
}
