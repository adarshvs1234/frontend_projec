import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error1 = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen bg-red-600 flex justify-center items-center text-white text-center'>
      <div className='text-center'>
      <div className='underline underline-offset-8 mb-4 text-xl sm:text-2xl xl:text-lg 2xl:text-lg text-center md:text-2xl'>         
    User Not Entered                 
</div>

      
       <div className='hover:text-sky-500 cursor-pointer  border-2  border-white' onClick={()=>{navigate('/signup')}}>Sign Up</div>
       
       <div className='hover:text-sky-500 cursor-pointer border-2 border-white mt-4' onClick={()=>{navigate('/login')}}>Log In</div>
      </div>
    </div>
  )
}

export default Error1
