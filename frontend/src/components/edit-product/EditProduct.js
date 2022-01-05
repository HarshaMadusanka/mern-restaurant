import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Axios } from '../../axios';

export const EditProduct = () => {
    const [productName,setProductName] = useState();
    const [productImage,setProductImage] = useState();
    const [productDesc,setProductDesc] = useState();
    const [productPrice,setProductPrice] = useState();
    const [productCategory,setProductCategory] = useState();
    const products = useSelector(state=>state.products);
    const navigate = useNavigate();
    let getEditProductId;

    if(window.location.pathname.split('/')[1]=='edit-product'){
        getEditProductId=window.location.pathname.split('/')[2];
    }

    const editProduct = products.find(product=>product._id==getEditProductId);

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
        await Axios.post(`/products/product/${getEditProductId}`,{
            name:productName ? productName : editProduct.name,
            image:productImage ? productImage : editProduct.image,
            description:productDesc ? productDesc : editProduct.description,
            categories:productCategory ? productCategory.split(',') : editProduct.categories,
            price:productPrice ? productPrice : editProduct.price
        }).then(response=>{
            toast.success('Updating Item...', {
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
                        <h1>Edit Product</h1>
                        <form action="">
                          <label>Edit Product Name</label>
                          <input type="text" name="name" value={productName ? productName : editProduct.name} onChange={getProductNameHandler} />
                          <label>Edit Product Image Url</label>
                          <input type="text" name="image" value={productImage ? productImage : editProduct.image} onChange={getProductImageHandler} />
                          <label>Edit Product Description</label>
                          <input type="text" name="description" value={productDesc ? productDesc : editProduct.description} onChange={getProductDescHandler} />
                          <label>Edit Product Categories</label>
                          <input type="text" name="categories" value={productCategory ? productCategory : editProduct.categories} onChange={getProductCategoryHandler} />
                          <label>Edit Price</label>
                          <input type="number" name="price" value={productPrice ? productPrice : editProduct.price} onChange={getProductPriceHandler} />
                          <button type="submit" onClick={onClickSubmitHandler}>Update Product</button>
                        </form>
                        </div>
                    </Col>
                </Row>
                <ToastContainer/>
            </Container>
        </div>
    )
}
