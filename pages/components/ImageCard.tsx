import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface ImageCardProps {
  id: string,
  name: string,
  url: string,
  width: number,
  height: number,
  box_count: number
}

const ImageCard: FC<ImageCardProps> = ({ id, name, url, width, height, box_count }) => {
  const { push } = useRouter()

  const onCardClickHandler = () => {
    push(`/memes/${id}`)
  }


  return (
    <div 
      onClick={onCardClickHandler}
      className='cursor-pointer w-60 h-72 bg-[#020202] flex flex-col justify-center items-center shadow-lg rounded-md transition transform duration-150 ease-in hover:scale-105'>
      <div className='h-full w-full inline-flex'>
        <Image src={url} width={width} height={height} alt="image" className='rounded-t-md'></Image>
      </div>

      <div className='w-full bg-white rounded-b-md relative py-2'>
        <div id="title" className='h-full w-full inline-flex justify-center items-center font-montsterrat font-black text-lg '>
          { name }
        </div>
      </div>
    </div>
  )
}

export default ImageCard