import { Link } from 'react-router-dom'
import logo from '../images/site-logo.png'
const Header = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>
        <Link to='/projects'>
          <img src={logo} className='header__title__logo' alt='logo' />
        </Link>
      </h1>
    </header>
  )
}
export default Header
