import { ControlPoint, IndeterminateCheckBoxOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Axios } from "../../axios";
import { Button } from "../ui/button/Button";
import "./SingleProduct.css";

export const SingleProduct = (props) => {
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const getSingleProductId = useSelector(state=>state.getSingleProductId);
  let [quantity,setQuantity] = useState(1);

  console.log(getSingleProductId);

  useEffect(async () => {
    await Axios.get(`/products/${props.id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        toast.error("Can't Find Product", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
  }, []);

  const increseQuantityHandler = () => {
      if(quantity>=1){
        setQuantity(quantity+=1);
      }
      
  }

  const decreaseQuantityHandler = () => {
      if(quantity>1){
        setQuantity(quantity-=1);
      }
}

    const addToCartButtonHandler = async () => {

       await  Axios.post("/carts/cart/find/",{
            products:{
              product:product != undefined && product._id,
              price:product != undefined && product.price,
              quantity:quantity,
              
            }
          }).then(response=>{
              console.log(response.data)
          }).catch (err=>{
              console.log(err);
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

  return (
    <div className="singleProduct">
      <Container>
        <Row>
          <Col md={6}>
            <img src={product != undefined ? product.image:''} alt="" />
          </Col>
          <Col md={6}>
            <h1>{product != undefined && product.name}</h1>
            <p>{product != undefined && product.description}</p>
            <div className="cartProduct__actions">
            <h5>Rs: &nbsp;{product != undefined && product.price*quantity}</h5>
            <div className="cartProduct__quantity__actions">
              <IconButton onClick={increseQuantityHandler}>
                <ControlPoint  />
              </IconButton>
              <p className="cartProduct__quantity">{quantity}</p>
              <IconButton onClick={decreaseQuantityHandler}>
                <IndeterminateCheckBoxOutlined  />
              </IconButton>
            </div>
            <Button onClick={addToCartButtonHandler}>Add to Cart</Button>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};
