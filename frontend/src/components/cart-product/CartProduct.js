import {
  ControlPoint,
  DeleteOutline,
  DeleteOutlined,
  IndeterminateCheckBoxOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Axios } from "../../axios";
import "./CartProduct.css";

export const CartProduct = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onClickAddHandler = async () => {
    await Axios.post("/carts/cart/find/",{
      products:{
        product:props.id,
        price:props.price
      }
    });

    Axios.get("/carts/cart/find/").then(response=>{
      dispatch({
        type:'ADD_TO_CART',
        cart:response.data
      })
    }).catch(err => {
      console.log(err);
    });
  };

  const onClickMinusHandler = async () => {
    await Axios.put("/carts/cart/find/",{
      products:{
        product:props.id,
        price:props.price
      }
    });

    Axios.get("/carts/cart/find/").then(response=>{
      dispatch({
        type:'ADD_TO_CART',
        cart:response.data
      })
    }).catch(err => {
      console.log(err);
    });
  };

  const onClickDeleteHandler = async () => {
    await Axios.post("/carts/cart/find/product",{
      id:props.id
    }).then(response=>{
      toast.success('Cart Item Deleted', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'colored',
    });
    }).catch(err=>{
      toast.error(err, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'colored',
    })})

     Axios.get("/carts/cart/find/").then(response=>{
      dispatch({
        type:'ADD_TO_CART',
        cart:response.data
      })
    }).catch(err => {
      console.log(err);
    });
  };


  return (
    <div className="cartProduct">
        <Row>
            <div className="col-md-12 cartProduct__container">
              <div className="product">
              <Col md={4}>
            <img src={props.image} alt="" />
          </Col>
          <Col md={8}>
            <div className="cartProduct__details">
              <h2 className="cartProduct__name">{props.name}</h2>
              <p className="cartProduct__description">{props.description}</p>
            </div>
            <div className="cartProduct__actions">
              <div className="cartProduct__quantity__actions">
                <IconButton >
                <ControlPoint onClick={onClickAddHandler} />
                </IconButton>
                <p className="cartProduct__quantity">{props.quantity}</p>
                <IconButton >
                <IndeterminateCheckBoxOutlined onClick={onClickMinusHandler} />
                </IconButton>
              </div>
              <h3 className="cartProduct__price">Rs: &nbsp; {props.totalPrice}</h3>
              <IconButton color="primary" >
              <DeleteOutline onClick={onClickDeleteHandler} />
              </IconButton>
            </div>
          </Col>
              </div>
          </div>
        </Row>
    </div>
  );
};
