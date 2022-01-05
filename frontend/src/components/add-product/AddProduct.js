import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { Axios } from '../../axios'
import './AddProduct.css'

export const AddProduct = () => {
     const [productName,setProductName] = useState();
     const [productImage,setProductImage] = useState();
     const [productDesc,setProductDesc] = useState();
     const [productPrice,setProductPrice] = useState();
     const [productCategory,setProductCategory] = useState();
     const navigate = useNavigate();

    const getProductNameHandler = (e)=>{
        setProductName(e.target.value);
    }
    const getProductImageHandler = (e)=>{
        setProductImage(e.target.value);
    }
    const getProductDescHandler = (e)=>{
        setProductDesc(e.target.value);
    }
    const getProductPriceHandler = (e)=>{
        setProductPrice(e.target.value);
    }
    const getProductCategoryHandler = (e)=>{ 
        setProductCategory(e.target.value);
    }

    const onClickSubmitHandler = async (e)=>{
        e.preventDefault();
        await Axios.post('/products/add-product',{
            name:productName,
            image:productImage,
            description:productDesc,
            categories:productCategory.split(','),
            price:productPrice
        }).then(response=>{
            toast.success('Adding Item...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:'colored',
                onClose:()=>navigate('/menu',{replace:true})
            });
            
        }).catch(err=>{
            toast.error('One or More Required Fields are Missing', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:'colored',
            });
        })
    }

    return (
        <div className="AddProduct">
            <Container>
                <Row>
                    <Col md={8} className="form">
                    <div className="form-container">
                        <h1>Add Product</h1>
                        <form action="">
                          <label>Product Name</label>
                          <input type="text" name="name" onChange={getProductNameHandler} value={productName}/>
                          <label>Product Image Url</label>
                          <input type="text" name="image" onChange={getProductImageHandler} value={productImage}/>
                          <label>Product Description</label>
                          <input type="text" name="description" onChange={getProductDescHandler} value={productDesc}/>
                          <label>Product Categories</label>
                          <input type="text" name="categories" onChange={getProductCategoryHandler} value={productCategory}/>
                          <label>Price</label>
                          <input type="number" name="price" onChange={getProductPriceHandler} value={productPrice}/>
                          <button type="submit" onClick={onClickSubmitHandler}>Add Product</button>
                        </form>
                        </div>
                    </Col>
                </Row>
                <ToastContainer/>
            </Container>
        </div>
    )
}
