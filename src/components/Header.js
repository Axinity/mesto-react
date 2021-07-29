import logo from '../images/vector.svg';

function Header() {
    return (
        <header className="header">
            <img src={logo} className="header__logo"  alt="Место логотип"/>
        </header>
    )
    
}

export default Header;