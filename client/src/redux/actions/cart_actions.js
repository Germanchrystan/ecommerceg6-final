import * as api from '../api/index.js';
import * as constants from '../constants/';
//=============================================//
///////////////////NOT LOGGED////////////////////
//=============================================//
export const getCartNotLogged = () => {
    const getCart = JSON.parse(localStorage.getItem('cart'))
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
export const incrementProductUnitNotLogged = (productId,color,size) => { //REVISAR: COLOR Y SIZE NO SE ESTÁN USANDO
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
        type: constants.GET_ACTIVE_CART_FROM_USER
    });
    return await api.getActiveCartFromUser(userId)
    .then((active)=>{
        dispatch({
            type: constants.GET_ACTIVE_CART_FROM_USER_SUCCESS,
            payload: active?.data
        })
        localStorage.setItem('cart', JSON.stringify(active.data))
    })
    .catch((error)=> {
        dispatch({
            type: constants.GET_ACTIVE_CART_FROM_USER_ERROR,
            payload: error?.response?.data,
        })
    })
}

//=============================================//
export const addItem = (productBody, userId) => async (dispatch) => {
    if(!userId){
        addItemNotLogged(productBody)
    } else {
        dispatch({
            type: constants.ADD_ITEM
        })
        return await api.addItem(productBody, userId)
        .then((cart)=>{
            dispatch({
                type: constants.ADD_ITEM_SUCCESS,
                payload: cart.data
            })
            localStorage.setItem('cart', JSON.stringify(cart.data))
        }).catch((error)=>{
            dispatch({
                type: constants.ADD_ITEM_ERROR,
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
            type: constants.DELETE_ITEM
        })
        return await api.removeProductFromCart(product,userId,colorName,colorSize)
        .then((cart) => {
            dispatch({
                type: constants.DELETE_ITEM_SUCCESS,
                payload: cart.data
            })
            localStorage.setItem('cart', JSON.stringify(cart.data))
        }).catch((error) => {
            dispatch({
                type: constants.DELETE_ITEM_ERROR,
                payload: error
            })
        })
    }
}
//=============================================//
export const changeCartState = (state, userId) => async(dispatch) => {
    dispatch({
        type: constants.CHANGE_CART_STATE
    })
    return await api.changeCartState(state,userId)
    .then((cart)=>{
        dispatch({
            type: constants.CHANGE_CART_STATE_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: constants.CHANGE_CART_STATE_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const decrementProductUnit = (product, userId,colorName,colorSize) => async(dispatch) => {
    dispatch({
        type: constants.DECREMENT_PRODUCT_UNIT
    })
    return await api.decrementProductUnit(product,userId,colorName,colorSize)
    .then((cart)=>{
        dispatch({
            type: constants.DECREMENT_PRODUCT_UNIT_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: constants.DECREMENT_PRODUCT_UNIT_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const incrementProductUnit = (product, userId,colorName,colorSize) => async(dispatch) => {
    dispatch({
        type: constants.INCREMENT_PRODUCT_UNIT
    })
    return await api.incrementProductUnit(product,userId,colorName,colorSize)
    .then((cart)=>{
        dispatch({
            type: constants.INCREMENT_PRODUCT_UNIT_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: constants.INCREMENT_PRODUCT_UNIT_ERROR,
            payload: error.response.data
        })
    })
}

//=============================================//
export const getAllCarts = (state,page) => async(dispatch) => {
    dispatch({
        type: constants.GET_ALL_CARTS
    });
    return await api.getAllCarts(state,page)
    .then((active)=>{
        dispatch({
            type: constants.GET_ALL_CARTS_SUCCESS,
            payload: active.data
        })
        localStorage.setItem('cart', JSON.stringify(active.data))
    })
    .catch((error)=> {
        dispatch({
            type: constants.GET_ALL_CARTS_ERROR,
            payload: error,
        })
    })
}
//=============================================//
export const getCartsById = (cartId) => async(dispatch) => {
    dispatch({
        type: constants.GET_CART_BY_ID
    });
    return await api.getCartsById(cartId)
    .then((cart)=>{
        dispatch({
            type: constants.GET_CART_BY_ID_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    })
    .catch((error)=> {
        dispatch({
            type: constants.GET_CART_BY_ID_ERROR,
            payload: error,
        })
    })
}
//=============================================//
export const getMercadoPago = (userId) => async(dispatch) =>{
    return await api.getMercadoPago(userId);
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
