import { createStore } from "redux";

const initialState = {
    user:{userData:null,token:null,loggedIn:undefined,isAdmin:undefined},
    products: {},
    editProductId:undefined,
    getSingleProductId:undefined,
    featuredProducts:{},
    filteredProducts:undefined,
    cart:{}
}

const reducerFunction = (state=initialState, action) =>{

    // let meal=undefined;

    switch(action.type){
        case 'GET_PRODUCTS':
            return {...state,products:action.products}
        case 'SET_USER':
            return {...state,user:{userData:action.user.userData,token:action.user.token,loggedIn:action.user.loggedIn,isAdmin:action.user.isAdmin}}
        case 'LOGOUT_USER':
            return {...state,user:{userData:undefined,token:undefined,loggedIn:undefined,isAdmin:undefined}}
        case 'LOGGED_IN':
            return {...state,user:{userData:action.user.userData,loggedIn:action.user.loggedIn,token:action.user.token,isAdmin:action.user.isAdmin}}
        case 'SET_CART':
            return {...state,cart:action.cart}
        case 'ADD_TO_CART':
            return {...state,cart:action.cart}
        case 'GET_FEATURED_PRODUCTS':
            return {...state,featuredProducts:action.featuredProducts}
        case 'GET_FILTERED_PRODUCTS':
            return {...state,filteredProducts:action.filteredProducts}
        case 'SET_EDIT_PRODUCT_ID':
            return {...state,editProductId:action.id}
        case 'SET_GET_PRODUCT_ID':
            return {...state,getSingleProductId:action.id}
        default:
        return state;
    }
}

export const store = createStore(reducerFunction)