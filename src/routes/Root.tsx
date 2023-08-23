import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Search from '../features/search/Search'

const Root = () => {
  return (
    <>
      <Header />
      <div className='app-wrapper'>
        <Search />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default Root
