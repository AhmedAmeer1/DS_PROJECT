import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'

import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
import './products.css';


import BtnChange from './BtnChange'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/image/delete', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/product/deleteProducts/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="products">
            {
                products.map(product => (


//////////

<div className="product_card" key={product._id}>
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
               
            </div>

            
            <BtnChange product={product} deleteProduct={deleteProduct} />
        </div>
/////////////





                
                ))
            } 
        </div>

        <LoadMore />
        {products.length === 0 && <Loading />}
        </>
    )
}

export default Products