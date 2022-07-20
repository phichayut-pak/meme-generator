import React, { FC } from 'react'
import { useRouter } from 'next/router'

interface NavbarProps {
  children: any
}

const Navbar : FC<NavbarProps> = ({ children }) => {
  const { push } = useRouter()

  return (
    <>
      <div 
        onClick={() => push('/')}
        className='cursor-pointer w-full bg-[#020202] flex justify-center items-center font-bold font-montsterrat text-white py-5 text-xl lg:text-3xl'>
        Meme Generator
      </div>

      { children }
    </>
  )
}

export default Navbar