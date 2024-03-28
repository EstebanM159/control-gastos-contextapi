import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'
export default function ExpenseList () {
  const { state } = useBudget()
  const isEmpty = useMemo(() => state.expense.length > 0, [state.expense])
  return (
    <>
     <div className='mt-10'>
        {isEmpty
          ? <>
            <p className='text-gray-600 text-2xl font-bold'>Listado de Gastos</p>
            {
                state.expense.map(exp => (
                    <ExpenseDetail
                        key={exp.id}
                        expense={exp}
                    />
                ))
            }
        </>
          : <p className='text-xl text-center font-semibold'>No hay gastos</p>
        }
    </div>

    </>
  )
}
