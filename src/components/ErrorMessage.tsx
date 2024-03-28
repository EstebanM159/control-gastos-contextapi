import { type PropsWithChildren } from 'react'

export default function ErrorMessage ({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 p-2 font-bold text-white text-sm uppercase text-center">
        {children}
    </p>
  )
}
