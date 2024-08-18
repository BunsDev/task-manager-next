import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-[50vh] w-full flex items-center justify-center'>
      <LoaderCircle className='animate-spin text-3xl' size={50}/>
    </div>
  )
}

export default Loader
