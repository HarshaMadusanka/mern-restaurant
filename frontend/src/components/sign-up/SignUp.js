import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import {Axios} from '../../axios'
import './SignUp.css'
import {Link, Navigate , useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';


export const SignUp = () => {

    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const onChangeFirstNameHandler = (e)=>{
        setFirstName(e.target.value);
    }
    const onChangeLastNameHandler = (e)=>{
        setLastName(e.target.value);
    }
    const onChangeUsernameHandler = (e)=>{
        setUsername(e.target.value);
    }
    const onChangeEmailHandler = (e)=>{
        setEmail(e.target.value);
    }
    const onChangePasswordHandler = (e)=>{
        setPassword(e.target.value);
    }
    const onChangeConfirmPasswordHandler = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        if(password===confirmpassword){
            Axios.post('/auth/register',{
                firstname:firstname,
                lastname:lastname,
                username:username,
                email:email,
                password:password,
            }).then(response=>{
                toast.error('Creating Your Account...', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme:'colored',
                    onClose:()=> navigate('/login',{replace:true})
                });     
            }).catch(error=>{
                toast.error('One or Many Required Fields are Missing', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme:'colored'
                });
            })

            
        } else if(password!==confirmpassword){
            toast.error('Password is not matched.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:'colored'
            });
        } else{
            toast.error('One or Many Required Fields are Missing', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:'colored'
            });
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    
                    <Col md={6} className="image-container-col">
                        <div className="image-container">
                            <img src="https://freepngimg.com/thumb/burger/5-2-burger-png.png" alt="" />
                        </div>
                    </Col>

                    <Col md={6} className="form">
                        <div className="form-container">
                        <h1>Sign Up</h1>
                        <form action="">
                          <label>First Name</label>
                          <input type="text" name="firstname" onChange={onChangeFirstNameHandler} value={firstname}/>
                          <label>Last Name</label>
                          <input type="text" name="lastname" onChange={onChangeLastNameHandler} value={lastname}/>
                          <label>Username</label>
                          <input type="text" name="username" onChange={onChangeUsernameHandler} value={username}/>
                          <label>Email</label>
                          <input type="email" name="email" onChange={onChangeEmailHandler} value={email}/>
                          <label>Password</label>
                          <input type="password" name="password" onChange={onChangePasswordHandler} value={password}/>
                          <label>Confirm Password</label>
                          <input type="password" name="confirmpassword" onChange={onChangeConfirmPasswordHandler} value={confirmpassword}/>
                          <button type="submit" onClick={formSubmitHandler}>Sign Up</button>
                          <h6><Link to="/login">Already have an Account? Sign In</Link></h6>
                        </form>
                        </div>
                    </Col>
                </Row>
                <ToastContainer/>
            </Container>
            
        </div>
    )
}
