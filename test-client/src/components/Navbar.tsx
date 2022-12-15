import logo from '../react-logo.svg'

export const Navbar = () => {
  return (
    <div className="navbar">
      <img className='navbar-logo' src={logo} alt="react logo" />
      <span className='navbar-title'>Technical test: By Antonio Alvarez</span>
    </div>
  )
}
