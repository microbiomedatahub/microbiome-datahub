import logo from '../images/site-logo.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <img src={logo} alt='Logo:Microbiome Datahub' className='footer__logo' />
      <nav className='footer__navigation'>
        <a href='https://mdatahub.org/document/#about_us' title='About us' className='footer__navigation__link'>
          About us
        </a>
        <a href='https://mdatahub.org/document/#faq' title='FAQ' className='footer__navigation__link'>FAQ</a>
        <a
          href='https://mdatahub.org/document/#terms_and_use'
          title='Terms and Use'
          className='footer__navigation__link'
        >
          Terms and Use
        </a>
        <a href='https://mdatahub.org/document/#' title='Contact us' className='footer__navigation__link'>Contact us</a>
      </nav>
      <p className='footer__copyright'>
        © Microbiome Datahub | Except where otherwise noted, content on this site is licensed under a Creative Commons
        Attribution 4.0 International license (CC-BY-4.0)
      </p>
    </footer>
  )
}
export default Footer
