import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './Registration/Login'
import Register from './Registration/Register'
import OrderHistory from './orders/OrderHistory'
import OrderDetails from './orders/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import CreateProduct from './AddProduct/CreateProduct'
import payment from './payment/payment'
import {GlobalState} from '../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/orderHistory" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/orderDetails/:id" exact component={isLogged ? OrderDetails : NotFound} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/payment" exact component={isLogged ? payment : NotFound} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
