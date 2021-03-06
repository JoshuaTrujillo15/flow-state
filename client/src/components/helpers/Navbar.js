import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import '../../styles/helpers/Navbar.css'
import Hamburger from './Hamburger'
import { connect } from 'react-redux'

const Navbar = props => {
    const { toggleMenu, showMenu, user } = props
    return (
        <header className='nav'>
            {
                user.account ? 
                    <div style={{flex: 1}}>
                        <Hamburger toggleMenu={toggleMenu} showMenu={showMenu} /> 
                    </div>
                :
                    null
            }
            <Link to='/' className='nav-brand noselect'>
                <img src={Logo} alt='logo' className='nav-logo'/>
            </Link>
            {
                user.account ?
                    <div className='nav-button'>
                        <button className='button'>
                            <Link
                                className='button-text nav-button-text'
                                to='/checkout'
                            >New Flow</Link>
                        </button>
                    </div>
                :
                    null
            }

        </header>
    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(Navbar)