import React, { useState, useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Meme } from '../../interfaces/meme'

interface MemeIDProps {
  meme: Meme
}

const MemeID: NextPage<MemeIDProps> = ({ meme }) => {
  const { push } = useRouter()
  const { id, name, url, width, height, box_count } = meme
  const [boxCounts, setBoxCounts] = useState<number[]>([])

  const firstInputBoxRef = useRef<HTMLInputElement>(null)
  const secondInputBoxRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    for(let i = 1; i <= box_count; i++) {
      setBoxCounts(prev => [...prev, i])
    }
  }, [box_count])

  const onGenerateMemeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = `template_id=${id}&username=${process.env.USERNAME}&password=${process.env.PASSWORD}&text0=${firstInputBoxRef.current?.value}&text1=${secondInputBoxRef.current?.value}&font=impact`
    const response = await axios.post('https://api.imgflip.com/caption_image?'+params)
    
    const data = await response.data
    
    if(!data.success) {
      alert('An error occurred')
      return
    }
    
    push(data.data.url)

    

  } 

  
  return (
    <div className='flex flex-col justify-center items-center relative pt-10 px-5 space-y-10'>

      <div className='shadow-lg'>
        <Image src={url} width={width} height={height} alt="meme"></Image>
      </div>
      
      <div className='w-full text-center pb-20'>
        <div className='text-2xl font-montsterrat font-bold text-center mb-10'>
          Generate Memes
        </div>

        <form 
          onSubmit={onGenerateMemeHandler}
          className='flex flex-col justify-center items-center space-y-5'>
          
          <label htmlFor="firstInputBox"></label>

          <input 
            type="text" 
            className='outline-none border-black border w-1/2 rounded-md font-montserrat font-medium px-3 py-1 block' 
            placeholder="1"
            id="firstInputBox" 
            ref={firstInputBoxRef}
          />

          <label htmlFor="secondInputBox"></label>

          <input 
            type="text" 
            className={`outline-none border-black border w-1/2 rounded-md font-montserrat font-medium px-3 py-1`} 
            placeholder="2"
            id="secondInputBox" 
            ref={secondInputBoxRef}
            
          />

          
          <button type="submit" className='py-1 px-3 bg-blue-500 text-white font-montserrat font-bold rounded'>Generate!</button>
        </form>
      </div>
      
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://api.imgflip.com/get_memes')
  const data = await response.data
  const { memes } = data.data

  const sortedMemes = memes.filter((meme: { box_count: number }) => meme.box_count == 2)

  const ids = sortedMemes.map((meme: { id: string }) => {
    return {
      params: {
        id: meme.id
      }
    }
  })

  return {
    paths: ids,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const id = params?.id 

  const response = await axios.get('https://api.imgflip.com/get_memes')
  const data = await response.data

  const meme = data.data.memes.find((meme: { id: string }) => {
    return id === meme.id
  })

  return {
    props: {
      meme
    }
  }

}

export default MemeID