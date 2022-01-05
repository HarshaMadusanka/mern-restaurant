import React, { useEffect, useState } from "react";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";
import { AddShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Axios } from "../../axios";
import { useDispatch } from "react-redux";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [navLogIn, setNavLogIn] = useState('Sign In');
  const [addProductLink, setAddProductLink] = useState(undefined);
  const [cartQuantity,setCartQuantity] = useState(0);
  useEffect(()=>{
    if(cart.products && cart.products.length != 0){
      return setCartQuantity(cart.products.map(el=>el.quantity).reduce((preEl,curEl)=> preEl + curEl));
    } 
    return setCartQuantity(0);
  },[cart])
  

  useEffect(() => {
    if (user.loggedIn) {
      setNavLogIn('Sign Out');
    }
    if (user.token && user.isAdmin) {
      setAddProductLink(
        <li className="header__nav-bar__nav-item">
          <Link to='/add-product'>
            Add Product
          </Link>
        </li>
      )
    } else {
      setAddProductLink(undefined);
    }
  }, [user])

  const logoutHandler = async () => {
    if (user.loggedIn) {
      await Axios.post('/auth/logout').then(response => {
        setNavLogIn('Sign In');
        setAddProductLink(undefined);
        dispatch({
          type:'LOGOUT_USER',
        
      });

      dispatch({
        type:'SET_CART',
        cart:{}
      });
        <Navigate replace to='/' />
      }).catch(err => {
        console.log(err);
      });
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="header">
            <nav className="header__nav-bar">
              <li className="header__nav-bar__icon">
              <Link to='/'>
              WebSite Logo
                  </Link>
                </li>
              <ul className="header__nav-bar__nav-items">
                <li className="header__nav-bar__nav-item">
                  <Link to='/'>
                    Home
                  </Link>
                </li>
                {addProductLink}

                <li className="header__nav-bar__nav-item">
                <Link to='/menu'>
                    Menu
                  </Link>
                </li>
                <li className="header__nav-bar__nav-item">
                  <Link to="/cart">
                    {cartQuantity} &nbsp; <AddShoppingCart />
                  </Link>
                </li>

                {!user.loggedIn ? <li className="header__nav-bar__nav-item"> <Link to='/login'>{navLogIn}</Link></li> : <li className="header__nav-bar__nav-item" onClick={logoutHandler}> {navLogIn}</li>}

                <li className="header__nav-bar__nav-item">Contact Us</li>
              </ul>
            </nav>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
