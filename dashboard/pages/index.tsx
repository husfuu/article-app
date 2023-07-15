import Navbar from './components/molecules/navbar'
import Header from './components/organisms/header'
import Table from './components/organisms/article/table'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <Header />
        <Table />
      </div>
    </div>
  )
}

export default Home
