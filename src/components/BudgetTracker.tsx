import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from '../hooks/useBudget'
import AmountDisplay from './AmountDisplay'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker () {
  const { dispatch, state, totalExpenses, remainingBudget } = useBudget()
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
  const getColor = (per: number) => {
    switch (true) {
      case per === 100:
        return '#DC2626'
      case per >= 80:
        return '#F87171'
      case per >= 60:
        return '#FBBF24'
      case per >= 40:
        return '#FCD34D'
      case per >= 20:
        return '#A5B4FC'
      default:
        return '#3B82F6'
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: getColor(percentage),
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: getColor(percentage)
          })}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <button
        type="button"
        className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        onClick={() => { dispatch({ type: 'reset-app' }) }}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget}/>
        <AmountDisplay label="Disponible" amount={remainingBudget}/>
        <AmountDisplay label="Gastado" amount={totalExpenses}/>
      </div>
    </div>
  )
}
