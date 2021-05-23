import React, {useContext,useState} from 'react'
import axios from 'axios'
import './payment.css';
import {useHistory} from 'react-router-dom'
import PaypalButton from './PaypalButton'
import {GlobalState} from '../../GlobalState'


function Payment() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const history = useHistory()
   
    const [user, setUser] = useState({
        cardNumber:'', name:'', cvv: '',cardExpire:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/payment/add', {...user}, {
                headers: {Authorization: token}
            }).then(res => alert(res.data.msg))
           history.push("/")
   
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page"  style={{  height: 500}} >
            <form onSubmit={registerSubmit}>
                <h2>Payment Details</h2>
                <input type="number" name="cardNumber" required
                placeholder="cardNumber" value={user.cardNumber} onChange={onChangeInput} />

                <input type="text" name="name" required
                placeholder="name" value={user.name} onChange={onChangeInput} />

                <input type="number" name="cvv" required autoComplete="on"
                placeholder="cvv" value={user.cvv} onChange={onChangeInput} />

                <input type="number" name="cardExpire" required autoComplete="on"
                placeholder="cardExpire" value={user.cardExpire} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Add card Details</button>
                    <h1>OR</h1>
            <PaypalButton   style={{marginLeft:"70px"}}></PaypalButton>
                    
                </div>
            </form>
           

       </div>
    )
}

export default Payment