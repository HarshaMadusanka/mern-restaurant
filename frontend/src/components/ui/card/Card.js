import { AddShoppingCart, Edit, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../../../axios";
import "./Card.css";

export const Card = (props) => {
    const user = useSelector(state=> state.user);
    const getSingleProductId = useSelector(state=>state.getSingleProductId);
    const dispatch = useDispatch();
    
    const addtoCartHandler = async () => {
       await Axios.post("/carts/cart/find/",{
          products:{
            product:props.id,
            price:props.price
          }
        }).then(()=>{
          toast.success('Adding to cart...', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme:'colored',
        });
        }).catch(err => {
           toast.error('You are not logged In.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme:'colored',
        });
        });

        Axios.get("/carts/cart/find/").then(response=>{
          dispatch({
            type:'ADD_TO_CART',
            cart:response.data
          })
        }).catch(err => {
          console.log(err);
        });
        

    }

    const setEditProductRouteIdHandler = () => {
      dispatch({
        type:'SET_EDIT_PRODUCT_ID',
        id:props.id
      });
    }

    const getProductIdHandler =  () => {
     dispatch({
        type:'SET_GET_PRODUCT_ID',
        id:props.id
      });
    }
    

  return (
    <div className="card">
      <div className="card__img">
        <img src={props.img} alt="" />
      </div>
      <div className="card__description">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <h3>Rs: &nbsp;{props.price}</h3>
      </div>
      <div className="card__actions">
        <Link to={`/products/${props.id}`}>
        <IconButton color="primary" aria-label="add to shopping cart" onClick={getProductIdHandler}>
          <Search />
        </IconButton>
        </Link>
        {user.isAdmin && <Link to={`/edit-product/${props.id}`}> <IconButton color="primary" onClick={setEditProductRouteIdHandler}>
         <Edit/>
        </IconButton> </Link> }
        <IconButton color="primary" aria-label="add to shopping cart" onClick={addtoCartHandler}>
          <AddShoppingCart />
        </IconButton>
      </div>
    </div>
  );
};
