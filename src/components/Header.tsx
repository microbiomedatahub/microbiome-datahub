import { Link } from 'react-router-dom'
import logo from '../images/site-logo.png'
const Header = () => {
  return (
    <header className='header'>
      <Link to='/projects' className='header__title'>
        <img src={logo} className='header__title__logo' alt='logo' />
      </Link>
      <Link to='/document' className='header__link'>Document</Link>
    </header>
  )
}
export default Header
