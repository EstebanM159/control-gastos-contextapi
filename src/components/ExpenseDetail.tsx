import { type Expense } from '../types'

type ExpenseDetailProps = {
  expense: Expense
}
export default function ExpenseDetail ({ expense }: ExpenseDetailProps) {
  return (
    <p
        key={expense.id}
        className='max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-5 p-10'
    >
        {expense.expenseName}
    </p>
  )
}
