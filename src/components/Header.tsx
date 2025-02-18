import { Link } from 'react-router-dom'
import logo from '../images/site-logo.png'
import { useAtomValue } from 'jotai'
import { linkStringBaseGenomeAtom } from '../store/store'
const Header = () => {

  const linkStringGenome: string = useAtomValue(linkStringBaseGenomeAtom)

  return (
    <header className='header'>
      <Link to='/' className='header__title'>
        <img src={logo} className='header__title__logo' alt='logo' />
      </Link>
      <Link to={`${linkStringGenome}`} className='header__link'>Search</Link>
      <Link to='/apimanual' className='header__link'>API Manual</Link>
      <Link to='/document' className='header__link'>Document</Link>
    </header>
  )
}
export default Header
