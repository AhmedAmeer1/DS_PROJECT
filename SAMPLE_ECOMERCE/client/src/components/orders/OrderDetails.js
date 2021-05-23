import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
const nodemailer = require('nodemailer');

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

///////




//sending  a mail to the delivery services  which containing  delivery details of the customer 
const sendTextDelivery = ()=> {



    const message="new  order  : "+ orderDetails.name +  "  customer email : " + orderDetails.email +" customer Address : "+ orderDetails.address+
    " customer number : "+orderDetails.number +  orderDetails.cart.map(item =>("product name :"+item.title +"product quantity :"+item.quantity))

           let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'agroup482@gmail.com',
                    pass: 'sumathyabi123'
                }
                
            });
            let mailDetails = {
                from: 'ahagaash@gmail.com',
                to: 'ahmedameer1999421@gmail.com',
                subject: 'Test mail',
                text: message
            };
            
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                    console.log(err);
                } else {
                    console.log('Email sent successfully');
                }
            })



            alert("delivery details send successfully")
           
}





//sending  a mail to the customer 
const sendOrderSuccess = ()=> {
    let mailTransporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: 'agroup482@gmail.com',
             pass: 'sumathyabi123'
         }

         

         
     });
     let mailDetails = {
         from: 'ahagaash@gmail.com',
         to: orderDetails.email,
         subject: 'Test mail',
         text: 'order succusss'
     };
     

     mailTransporter.sendMail(mailDetails, function(err, data) {
         if(err) {
             console.log('Error Occurs');
             console.log(err);
         } else {
             console.log('Email sent successfully');
         }
     })

     
     alert("customer  message send successfully")
}











///////




    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
               
            })



        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>EMAIL</th>
                        <th>Address</th>
                        <th>CITY</th>
                        <th>NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.name}</td>
                        <td>{orderDetails.email}</td>
                        <td>{orderDetails.address}</td>
                        <td>{orderDetails.city}</td>
                        <td>{orderDetails.number}</td>
                       
                       
                    </tr>
                </tbody>
            </table>

            <table style={{margin: "31px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.price * item.quantity}</td>
                        </tr>

                       

                        ))
                    }
                    
                </tbody>
            </table>

                    <button onClick={sendOrderSuccess}><h1>ORDER SUCCESS  </h1></button><br/><br/>
                    <button  onClick={sendTextDelivery} ><h1>Delivery  Services</h1></button>

        </div>
    )
}

export default OrderDetails
