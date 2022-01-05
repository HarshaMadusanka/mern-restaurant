import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Card } from '../ui/card/Card';
import './Featured.css';
import { Axios } from '../../axios';
import { useDispatch, useSelector} from 'react-redux';
import { ToastContainer } from 'react-toastify';

export const Featured = () => {
    const products = useSelector(state=>state.products);
    const featuredProducts = useSelector(state=>state.featuredProducts);
    const user = useSelector(state => state.user);
    
    const dispatch = useDispatch();

    useEffect(async ()=>{
         await Axios.get('/products/category/featured').then((response) => {
            
            dispatch({
                type:'GET_FEATURED_PRODUCTS',
                featuredProducts:response.data
            })
          })
    },[])



    return (
        <Container>
            <section className="featured">
                <Row>
                    <Col>
                        <h2 className="featured__header">Featured Meals</h2>
                    </Col>
                </Row>
                <Row>
                    {featuredProducts.length>0 && featuredProducts.map(product=>(
                        <Col md={4} key={product._id}>
                         <Card img={product.image} price={product.price} title={product.name} description={product.description} id={product._id}/>
                     </Col>
                    ))}
                </Row>
            </section>
            <ToastContainer/>
        </Container>
    )
}
