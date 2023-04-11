import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

const Root = () => {
  return (
    <>
      <Header />
      <div className='app-wrapper'>
        <SideMenu />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Root
