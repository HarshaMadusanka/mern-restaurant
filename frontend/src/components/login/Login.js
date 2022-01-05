import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import { Axios } from '../../axios';
import './Login.css'

export const Login = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
   
    
    const onChangeEmailHandler = (e)=>{
        setEmail(e.target.value);
        
    }
    const onChangePasswordHandler = (e)=>{
        setPassword(e.target.value);
        
    }


    const formSubmitHandler = async (e)=>{
        
        e.preventDefault();

        if(email && password){
            
            try{
              await  Axios.post('/auth/login',{
                  email:email,
                  password:password
                },{withCredentials:true}).then(response=>{
                    dispatch({
                        type:'SET_USER',
                        user:{
                            userData:response.data,
                            token:response.data.accessToken,
                            loggedIn:true,
                            isAdmin:response.data.isAdmin
                        }
                    });
                    toast.success('Logging...', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme:'colored',
                        onClose:() => navigate('/',{replace:true})
                    });
                }).catch(error=>{
                    toast.error('Email or Password is incorrect', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme:'colored',
                    });
                })
                
            }catch(err){
                console.log(err);
            }
            
        }  

    
    }
 
    

    return (
        <div>
            <Container className="form-page-container">
                <Row>
                    <Col md={6} className="form">
                        <div className="form-container">
                        <h1>Sign In</h1>
                        <form action="">
                          <label>Email</label>
                          <input type="email" name="email" onChange={onChangeEmailHandler} value={email}/>
                          <label>Password</label>
                          <input type="password" name="password" onChange={onChangePasswordHandler} value={password}/>
                          <button type="submit" onClick={formSubmitHandler}>Sign In</button>
                          <h6><Link to="/sign-up">Don't have a Account? Sign Up</Link></h6>
                        </form>
                        </div>
                    </Col>
                    <Col md={6} className="image-container-col">
                        <div className="image-container">
                            <img src="https://freepngimg.com/thumb/burger/5-2-burger-png.png" alt="" />
                        </div>
                    </Col>
                    
                </Row>
                <ToastContainer/>
            </Container>
        </div>
    )
}
