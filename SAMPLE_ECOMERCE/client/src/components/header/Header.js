import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './header.css';




function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/orderHistory">ORDERS</Link></li>
                <li><Link to="/create_product">ADD Product</Link></li>
              
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1 >
                    <Link to="/">{isAdmin ? 'Admin' : 'MrDev Shop'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>

           
                <li><b><Link to="/">Products</Link></b></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login"><b>Login  </b></Link></li>
                }

               {     isLogged ? '' : <li><Link to="/register"> <b> Register</b></Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :
                !isLogged ? '':
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                       CART
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
