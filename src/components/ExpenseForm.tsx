import { useState } from 'react'
import { categories } from '../data'
import DatePicker from 'react-date-picker'
import { type DraftExpense } from '../types'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
const initialState: DraftExpense = {
  amount: 0,
  expenseName: '',
  category: '',
  date: new Date()
}
export default function ExpenseForm () {
  const [expense, setExpense] = useState(initialState)
  return (
    <form className="space-y-5">
        <legend className="uppercase text-2xl text-center font-black border-b-4 py-2 border-b-blue-500">
            Nuevo Gasto
        </legend>
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Nombre Gasto :
            </label>
            <input
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Cantidad :
            </label>
            <input
                type="text"
                id="amount"
                placeholder="Añade la cantidad del gasto"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Categoria :
            </label>
            <select
                id="category"
                className="bg-slate-100 p-2"
                name="category">
                    <option value="">Seleccione</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                            >{category.name}
                        </option>
                    ))}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Fecha Gasto :
            </label>
            <DatePicker
                className='bg-slate-100 p-2 border-0'
                value={expense.date}
            />
        </div>
        <input
            type="submit"
            className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg mt-4'
            value='Registrar gasto'
        />
    </form>
  )
}
