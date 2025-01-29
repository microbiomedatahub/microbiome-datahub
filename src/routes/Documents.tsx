import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Documents = () => {
  return (
    <>
      <Header />
      <div className='app-wrapper'>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default Documents
