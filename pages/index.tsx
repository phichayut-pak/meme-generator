import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import ImageCard from './components/ImageCard'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Meme } from '../interfaces/meme'

interface HomeProps {
  memes: Meme[]
}

const Home: NextPage<HomeProps> = ({ memes }) => {
  const { push } = useRouter()

  return (
    <div>
      <div className='mt-10 px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 content-center justify-items-center gap-y-16 gap-x-7'>
        {memes.map(meme => {
          return (
            <ImageCard key={meme.id} id={meme.id} name={meme.name} url={meme.url} width={meme.width} height={meme.height} box_count={meme.box_count} />
            )
          })}
      </div>
      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get('https://api.imgflip.com/get_memes')
  const data = await response.data

  if(!data.success) {
    return {
      notFound: true
    }
  }

  const sortedMemes = data.data.memes.filter((meme: { box_count: number }) => meme.box_count == 2)

  return {
    props: {
      memes: sortedMemes
    }
  }

}

export default Home
