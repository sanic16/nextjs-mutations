import logo from '@/assets/logo.png'
import Link from 'next/link'
import './header.css'

const Header = () => {
    return(
        <header className='main-header'>
            <div className="header__container">
                <Link href="/" className='header__logo'>
                    <img src={logo.src} alt="Mobile phone with posts feed on it" />
                </Link>
                <nav>
                    <ul>
                        <li>
                            <Link href='/feed'>
                                Feed
                            </Link>
                        </li>
                        <li>
                            <Link 
                                className='cta-link'
                                href='/new-post'
                            >
                                New Post
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header