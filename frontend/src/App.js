import React, { useEffect, useState } from "react";
import { BrowserRouter , Routes , Route} from "react-router-dom";
import { Payhere, AccountCategory } from 'payhere-js-sdk';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Cart } from "./components/cart/Cart";
import { Featured } from "./components/featured/Featured";
import { Header } from "./components/header/Header";
import { Hero } from "./components/hero/Hero";
import { Login } from "./components/login/Login";
import { SignUp } from "./components/sign-up/SignUp";
import axios from "axios";
import { Axios } from "./axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AddProduct } from "./components/add-product/AddProduct";
import { Menu } from "./components/menu/Menu";
import 'react-toastify/dist/ReactToastify.css';
import { EditProduct } from "./components/edit-product/EditProduct";
import { SingleProduct } from "./components/single-product/SingleProduct";
import { Checkout } from "./components/checkout/Checkout";

axios.defaults.withCredentials = true;

Payhere.init('1219571', AccountCategory.SANDBOX);

const App = () => {
  const user = useSelector(state=>state.user);
  const products = useSelector(state=>state.products)
  const cart = useSelector(state=>state.cart);
  const editProductId = useSelector(state=>state.editProductId);
  const getSingleProductId = useSelector(state=>state.getSingleProductId);
  const [isAdmin,setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  let getEditProductId;
  let getSingleProduct;


  useEffect(()=>{
    console.log('inside useEffect');

    Axios.get('/products').then((response) => {
           
      dispatch({
          type:'GET_PRODUCTS',
          products:response.data
      })
    }).catch((error) => {
        console.log(error);
    });

      Axios.get('/auth/logged-in').then(response=>{
        if(response){
          dispatch({
            type:'LOGGED_IN',
            user:{
              userData:response.data.userData,
              loggedIn:response.data.loggedIn,
              token:response.data.token,
              isAdmin:response.data.isAdmin
            }
        });
        
        }
        
    }).catch(error=>{console.log(error);});
    
    if(user.token){
      Axios.get('/carts/cart/find/').then(response=>{
        dispatch({
          type:'SET_CART',
          cart:response.data
        });
      }).catch(error=>{console.log(error);});
    }

    if(user.token && user.isAdmin && user.loggedIn){
      return setIsAdmin(true);
    } else{
      return setIsAdmin(false);
    } 

  },[user.token]);


  if(window.location.pathname.split('/')[1]=='edit-product'){
      getEditProductId=window.location.pathname.split('/')[2];
  }

  if(window.location.pathname.split('/')[1]=='products'){
    getSingleProduct=window.location.pathname.split('/')[2];
  }

  // console.log(user);
  // console.log(cart);
  // console.log(products);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<React.Fragment><Header /><Hero /><Featured/></React.Fragment> }/>
        <Route path='/cart' element={<React.Fragment><Header /><Cart/></React.Fragment>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        {isAdmin && <Route path='/add-product' element={<React.Fragment><Header /><AddProduct/></React.Fragment>} />}
        {isAdmin && <Route path={`/edit-product/${editProductId  ? editProductId :getEditProductId}`} element={<React.Fragment><Header /><EditProduct /></React.Fragment>} />}
        <Route path={`/products/${getSingleProductId ? getSingleProductId :getSingleProduct}`} element={<React.Fragment><Header /><SingleProduct id={getSingleProductId ? getSingleProductId :getSingleProduct}/></React.Fragment>} />
        <Route path='/menu' element={<React.Fragment><Header /><Menu /></React.Fragment>} />
        {user && <Route path='/checkout' element={<React.Fragment><Header /><Checkout /></React.Fragment>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
