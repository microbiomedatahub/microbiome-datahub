import logo from '../images/site-logo.png'
const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">
                <img src={logo} className="header__title__logo" alt="logo" />
            </h1>
        </header>
    )
}
export default Header
