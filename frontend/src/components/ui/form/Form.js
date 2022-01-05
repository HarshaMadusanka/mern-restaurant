import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Form.css'

export const Form = () => {
    const [firstname,setFirstName] = useState('');

    const onChangeFirstNameHandler = (e)=>{
        setFirstName(e.target.value);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={6} className="form">
                        <div className="form-container">
                        <h1>Sign Up</h1>
                        <form action="">
                          <label>First Name</label>
                          <input type="text" name="firstname" onChange={onChangeFirstNameHandler}/>
                          <label>Last Name</label>
                          <input type="text" name="lastname" />
                          <label>Username</label>
                          <input type="text" name="username" />
                          <label>Email</label>
                          <input type="email" name="email" />
                          <label>Password</label>
                          <input type="password" name="password" />
                          <label>Confirm Password</label>
                          <input type="password" name="confirmpassword" />
                          <button type="submit">Sign Up</button>
                        </form>
                        </div>
                    </Col>
                    <Col md={6}>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
