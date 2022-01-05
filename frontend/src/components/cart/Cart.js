import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProduct } from "../cart-product/CartProduct";
import { Button } from "../ui/button/Button";
import './Cart.css';

export const Cart = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(cart.products && cart.products.length != 0){
      setTotalPrice(cart.products.map(el=>el.totalPrice).reduce((preEl,curEl)=> preEl + curEl));
      return setCartQuantity(cart.products.map(el=>el.quantity).reduce((preEl,curEl)=> preEl + curEl));
    } 
    setTotalPrice(0);
    return setCartQuantity(0);
  },[cart]);


  return (
    <div className="cart">
      <Container>
        <Row>
          <Col md={12}>
            <h1>Your Shopping Cart</h1>
          </Col>
          <Col md={8}>
            <div className="cart__products">
              {cart.products && cart.products.map((el) => (
                <CartProduct
                  key={el._id}
                  id={el.product._id}
                  name={el.product.name}
                  image={el.product.image}
                  description={el.product.description}
                  quantity={el.quantity}
                  price={el.price}
                  totalPrice={el.totalPrice}
                />
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="cart__details">
              <h2>Shopping Cart</h2>
              <h4 className="cart__quantity">
                Cart Items : &nbsp; {cartQuantity}
              </h4>
              <h4 className="cart__total">
                Total Price : &nbsp; Rs: &nbsp; {totalPrice}
              </h4>
              <Button>
                <Link to="/checkout">
                Proceed to Checkout
                </Link>
                </Button>
            </div>
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    </div>
  );
};
