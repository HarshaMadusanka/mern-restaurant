import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Axios } from "../../axios";
import { Card } from "../ui/card/Card";
import './Menu.css'

export const Menu = () => {
    const products = useSelector(state=>state.products);
    const filteredProducts = useSelector(state=>state.filteredProducts);
    // const [category,setCategory] = useState();
    const dispatch = useDispatch();

    useEffect( ()=>{
         Axios.get('/products').then((response) => {
           
           dispatch({
               type:'GET_PRODUCTS',
               products:response.data
           })
         }).catch((error) => {
             console.log(error);
         });

         dispatch({
             type:'GET_FILTERED_PRODUCTS',
             filteredProducts:undefined
         })
   },[]);

   const getCategoryHandler = async (e)=>{
       if(e.target.value=='all'){
       return await Axios.get('/products').then(response => {
            dispatch({
                type:'GET_FILTERED_PRODUCTS',
                filteredProducts:response.data
            })
        }).catch((error)=>{
            console.log(error);
        })
       }
       await Axios.post('/products/category',{
           category:e.target.value,
       }).then(response => {
           dispatch({
               type:'GET_FILTERED_PRODUCTS',
               filteredProducts:response.data
           })
       }).catch((error)=>{
           console.log(error);
       })
   }

  return (
    <div className="menu">
      <Container>
        <Row>
          <Col md={12}>
              <h1>Menu</h1>
          </Col>
          <Col md={12}>
            <Row>
              <Col md={12}>
                  <label>Filter :</label>
                  <select name="categories" id="categories" onChange={getCategoryHandler}>
                        <option value="all">All</option>
                      <option value="coffee">Coffee</option>
                      <option value="cookies">Cookies</option>
                      <option value="chocolate">Chocolate</option>
                      <option value="beer">Beer</option>
                      <option value="burger">Burger</option>
                      <option value="cakes">Cakes</option>
                      <option value="beverage">Beverage</option>
                      <option value="featured">Featured</option>
                  </select>
              </Col>
              {filteredProducts &&  filteredProducts.map((product) => (
                  <Col md={4} key={product._id}>
                    <Card
                      img={product.image}
                      price={product.price}
                      title={product.name}
                      description={product.description}
                      id={product._id}
                    />
                  </Col>))}
              {filteredProducts===undefined && products.length > 0 &&
                products.map((product) => (
                  <Col md={4} key={product._id}>
                    <Card
                      img={product.image}
                      price={product.price}
                      title={product.name}
                      description={product.description}
                      id={product._id}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    </div>
  );
};
