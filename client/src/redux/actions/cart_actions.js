import * as api from '../api/index.js';
import { 
    GET_ACTIVE_CART_FROM_USER, GET_ACTIVE_CART_FROM_USER_SUCCESS, GET_ACTIVE_CART_FROM_USER_ERROR,
    GET_ALL_CARTS, GET_ALL_CARTS_SUCCESS, GET_ALL_CARTS_ERROR,
    DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_ERROR,
    CHANGE_CART_STATE, CHANGE_CART_STATE_SUCCESS, CHANGE_CART_STATE_ERROR,
    DECREMENT_PRODUCT_UNIT, DECREMENT_PRODUCT_UNIT_SUCCESS, DECREMENT_PRODUCT_UNIT_ERROR,
    INCREMENT_PRODUCT_UNIT, INCREMENT_PRODUCT_UNIT_SUCCESS, INCREMENT_PRODUCT_UNIT_ERROR,
    ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, GET_CART_BY_ID_SUCCESS, GET_CART_BY_ID_ERROR, GET_CART_BY_ID
} from '../constants/';
//=============================================//
///////////////////NOT LOGGED////////////////////
//=============================================//
export const getCartNotLogged = () => {
    const getCart = JSON.parse(localStorage.getItem('cart'))
    console.log("BBBBB",getCart)
    if (!getCart){
        const newCart = {
            userId: null,
            items:[], 
            state: 'active',
            totalAmount: 0
        }
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart;
    }
    return getCart;
}
//=============================================//
export const addItemNotLogged = (productBody) => {
    let cart = getCartNotLogged();
    console.log("CCCCC",cart)
    console.log("ADDITEMNOTLOGGED",productBody)
    let price = productBody.price;
    let quantity = productBody.quantity;
    let productId = productBody.productId;

    let productIndex = cart.items.findIndex((i) => i.productId === productId && i.colorName === productBody.colorName && i.sizeName === productBody.sizeName);
    if(productIndex === -1){
        cart.items.push(productBody);
        cart.totalAmount += price*quantity;
    } else {
        cart.items[productIndex].quantity += quantity;
        cart.totalAmount += price*quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}
//=============================================//
export const deleteItemNotLogged = (productId) => {
    let cart = getCartNotLogged();
    let productIndex = cart.items.findIndex((i) => i.productId === productId);
    if( productIndex > -1){
        const price = cart.items[productIndex].price;
        const quantity = cart.items[productIndex].quantity;
        
        const items = cart.items.filter((i) => i.productId !== productId);
        cart.items = items;
        cart.totalAmount -= price * quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
    } 
}
//=============================================//
export const incrementProductUnitNotLogged = (productId,color,size) => {
    let cart = getCartNotLogged();
    let productIndex = cart.items.findIndex((i) => i.productId === productId);
    if( productIndex > -1){
        const price = cart.items[productIndex].price;
        cart.items[productIndex].quantity++;
        cart.totalAmount+=price;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}
//=============================================//
export const decrementProductUnitNotLogged = (productId) => {
    let cart = getCartNotLogged();
    let productIndex = cart.items.findIndex((i) => i.productId === productId);
    if( productIndex > -1){
        const price = cart.items[productIndex].price;
        cart.items[productIndex].quantity--;
        cart.totalAmount-=price;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}
//=============================================//
/////////////////////LOGGED//////////////////////
//=============================================//
export const getCartFromUser = (userId) => async(dispatch) => {
    dispatch({
        type: GET_ACTIVE_CART_FROM_USER
    });
    return await api.getActiveCartFromUser(userId)
    .then((active)=>{
        console.log("ACTIVE",active.data)
        dispatch({
            type: GET_ACTIVE_CART_FROM_USER_SUCCESS,
            payload: active?.data
        })
        localStorage.setItem('cart', JSON.stringify(active.data))
    })
    .catch((error)=> {
        dispatch({
            type: GET_ACTIVE_CART_FROM_USER_ERROR,
            payload: error?.response?.data,
        })
    })
}

//=============================================//
export const addItem = (productBody, userId) => async (dispatch) => {
    console.log("DENTRO DEL ACTION",productBody,userId)
    if(!userId){
        addItemNotLogged(productBody)
    } else {
        dispatch({
            type: ADD_ITEM
        })
        return await api.addItem(productBody, userId)
        .then((cart)=>{
            dispatch({
                type:ADD_ITEM_SUCCESS,
                payload: cart.data
            })
            localStorage.setItem('cart', JSON.stringify(cart.data))
        }).catch((error)=>{
            dispatch({
                type: ADD_ITEM_ERROR,
                payload: error.response.data
            })
        })
    }
}
//=============================================//
export const deleteItem = (product, userId,colorName,colorSize) => async(dispatch) =>{
    if(!userId){
        deleteItemNotLogged(product,colorName,colorSize)
    } else {
        dispatch({
            type: DELETE_ITEM
        })
        return await api.removeProductFromCart(product,userId,colorName,colorSize)
        .then((cart) => {
            dispatch({
                type: DELETE_ITEM_SUCCESS,
                payload: cart.data
            })
            localStorage.setItem('cart', JSON.stringify(cart.data))
        }).catch((error) => {
            dispatch({
                type: DELETE_ITEM_ERROR,
                payload: error
            })
        })
    }
}
//=============================================//
export const changeCartState = (state, userId) => async(dispatch) => {
    dispatch({
        type: CHANGE_CART_STATE
    })
    return await api.changeCartState(state,userId)
    .then((cart)=>{
        dispatch({
            type: CHANGE_CART_STATE_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: CHANGE_CART_STATE_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const decrementProductUnit = (product, userId,colorName,colorSize) => async(dispatch) => {
    dispatch({
        type: DECREMENT_PRODUCT_UNIT
    })
    return await api.decrementProductUnit(product,userId,colorName,colorSize)
    .then((cart)=>{
        dispatch({
            type: DECREMENT_PRODUCT_UNIT_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: DECREMENT_PRODUCT_UNIT_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const incrementProductUnit = (product, userId,colorName,colorSize) => async(dispatch) => {
    dispatch({
        type: INCREMENT_PRODUCT_UNIT
    })
    return await api.incrementProductUnit(product,userId,colorName,colorSize)
    .then((cart)=>{
        dispatch({
            type: INCREMENT_PRODUCT_UNIT_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: INCREMENT_PRODUCT_UNIT_ERROR,
            payload: error.response.data
        })
    })
}

//=============================================//
export const getAllCarts = (state,page) => async(dispatch) => {
    dispatch({
        type: GET_ALL_CARTS
    });
    return await api.getAllCarts(state,page)
    .then((active)=>{
        dispatch({
            type: GET_ALL_CARTS_SUCCESS,
            payload: active.data
        })
        localStorage.setItem('cart', JSON.stringify(active.data))
    })
    .catch((error)=> {
        dispatch({
            type: GET_ALL_CARTS_ERROR,
            payload: error,
        })
    })
}
//=============================================//
export const getCartsById = (cartId) => async(dispatch) => {
    dispatch({
        type: GET_CART_BY_ID
    });
    return await api.getCartsById(cartId)
    .then((cart)=>{
        dispatch({
            type: GET_CART_BY_ID_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    })
    .catch((error)=> {
        dispatch({
            type: GET_CART_BY_ID_ERROR,
            payload: error,
        })
    })
}
//=============================================//
    export function addToCart(obj) {
        return {
            type: "ADD_TO_CART",
            payload: obj
        };
    }
    
    export function delFromCart(obj) {
        return {
            type: "DEL_FROM_CART",
            payload: obj
        };
    }
    
    export function buy(){
        return {
            type: "BUY",
            payload: []
        };
    }
