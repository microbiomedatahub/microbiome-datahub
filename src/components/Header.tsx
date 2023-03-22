import logo from '../images/site-logo.png'
const Header = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>
        <a href='/'>
          <img src={logo} className='header__title__logo' alt='logo' />
        </a>
      </h1>
    </header>
  )
}
export default Header
