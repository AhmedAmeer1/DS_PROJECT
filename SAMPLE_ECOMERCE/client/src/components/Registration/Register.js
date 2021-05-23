import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './login.css';


function Register() {
    const [user, setUser] = useState({
        name:'',number:'' ,address :'',city:'' ,email:'', password: ''
    })

  

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page"  style={{  height: 700}} >
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />
  

                <input type="text" name="number" required
                placeholder="number" value={user.number} onChange={onChangeInput} />

                <input type="text" name="address" required
                placeholder="address" value={user.address} onChange={onChangeInput} />

                 <input type="text" name="city" required
                placeholder="city" value={user.city} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register