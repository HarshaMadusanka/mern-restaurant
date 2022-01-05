import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "../../axios";
import "./Checkout.css";
import {
  Customer,
  CurrencyType,
  PayhereCheckout,
  CheckoutParams,
} from "payhere-js-sdk";

export const Checkout = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.products && cart.products.length != 0) {
      setTotalPrice(
        cart.products
          .map((el) => el.totalPrice)
          .reduce((preEl, curEl) => preEl + curEl)
      );
      return setCartQuantity(
        cart.products
          .map((el) => el.quantity)
          .reduce((preEl, curEl) => preEl + curEl)
      );
    }
    setTotalPrice(0);
    return setCartQuantity(0);
  }, [cart]);

  const checkout = () => {
    try {
      const customer = new Customer({
        first_name: "Pavindu",
        last_name: "Lakshan",
        phone: phoneNumber,
        email: user.userData.email,
        address: address,
        city: city,
        country: country,
      });
      const checkoutData = new CheckoutParams({
        returnUrl: "http://localhost:3001/",
        cancelUrl: "http://localhost:3001/",
        order_id: "112233",
        itemTitle: "Demo Item",
        currency: CurrencyType.LKR,
        amount: totalPrice,
      });

      const checkout = new PayhereCheckout(customer, checkoutData);
      checkout.start();
    } catch (err) {
      console.log(err);
    }
  };

  const getPhone = (e) => {
    setPhoneNumber(e.target.value);
  };
  const getAddress = (e) => {
    setAddress(e.target.value);
  };

  const getCity = (e) => {
    setCity(e.target.value);
  };
  const getCountry = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="checkout">
      <Container>
        <Row>
          <Col md={8} className="form">
            <div className="form-container">
              <h1>Checkout</h1>
              <form
                method="post"
                action="https://sandbox.payhere.lk/pay/checkout"
              >
                <input type="hidden" name="merchant_id" value="1219571" />
                <input
                  type="hidden"
                  name="return_url"
                  value="http://localhost:3001/cart"
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value="http://localhost:3001/cart"
                />
                <input
                  type="hidden"
                  name="notify_url"
                  value="http://localhost:3001/"
                />
                Item Details
                <br/>
                <input type="text" name="order_id" value={Math.random()} readOnly={true}/>
                {cart.products && cart.products.map(el=>
                    <input type="text" name="items" value={el.product.name} readOnly={true}/>)}

                <input type="text" name="currency" value="LKR" readOnly={true}/>
                <input type="text" name="amount" value={totalPrice} readOnly={true}/>
                <br/>
                Customer Details
                <br/>
                <input type="text" name="first_name" value="Saman" />
                <input type="text" name="last_name" value="Perera" />

                <input type="text" name="email" value={user.userData.email} readOnly={true} />
                <input type="text" name="phone" value={phoneNumber} onChange={getPhone} />

                <input type="text" name="address" value={address} onChange={getAddress} />
                <input type="text" name="city" value={city} onChange={getCity} />
                <input type="hidden" name="country" value={country} onChange={getCountry} />

                <button onClick={checkout}>Checkout</button>
              </form>
            </div>
          </Col>
          <Col md={4}>
            <div className="checkout__details">
              {cart.products &&
                cart.products.map((el) => (
                  <h5 key={el.product._id}>
                    x{el.quantity}&nbsp;{el.product.name}
                  </h5>
                ))}
              <h4>total Items:&nbsp;{cartQuantity}</h4>
              <h4>Total Price:&nbsp;Rs:&nbsp;{totalPrice}</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
