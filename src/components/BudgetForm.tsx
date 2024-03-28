import { useState, type ChangeEvent, useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
export default function BudgetForm () {
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value)
  }
  const isValid = useMemo(() => { return isNaN(budget) || budget <= 0 }, [budget])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'add-budget', payload: { budget } })
  }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className=" text-center font-bold text-blue-600 text-4xl">Definir Presupuesto</label>
            <input
                type="number"
                className="w-full bg-white border-gray-200 p-2 "
                placeholder="Define tu presupuesto"
                name="budget"
                onChange={handleChange}

            />
        </div>
        <input
            type="submit"
            value="Definir presupuesto"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-black w-full p-2 uppercase disabled:opacity-20"
            disabled={isValid}
        />
    </form>
  )
}
