import { 
    REGISTER, REGISTER_SUCCESS, REGISTER_ERROR, 
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, 
    GET_USER_BY_ID,
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, 
    GOOGLE_LOGIN, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_ERROR, 
    CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR,
} from '../constants/';

import * as api from '../api/index.js';

//=====================================================================================//
export const login = (formData, history, swalert) => async (dispatch) => {
    dispatch({
        type: LOGIN
    });
    return await api.login(formData)
    .then(async(u)=>{
        localStorage.setItem('profile', JSON.stringify(u.data))
        //Agregando el cart del local storage al usuario logueado
        let localStorageCart = await JSON.parse(localStorage.getItem('cart'))
        if(localStorageCart){
            localStorageCart.items?.map(async(i)=> api.addItem({productId: i.productId, quantity: i.quantity , colorName: i.colorName, sizeName: i.sizeName, stock: i.stock}, u.data?.result?._id))
        }         
        dispatch({
            type: LOGIN_SUCCESS,
            payload: u.data
        })
        document.cookie=`isAdmin=${u.data?.result?.isAdmin}`
        document.cookie=`_id=${u.data?.result?._id}` 
    })
    .then(() => history.push('/'))
    .then(async()=> {
        const message =  await JSON.parse(localStorage.getItem('profile'))
        swalert({
            title: message?.message?.message,
            text: 'Welcome Back!',
            icon: `success`
        })
    })
    .catch ((error) => {
        dispatch({
            type:LOGIN_ERROR,
            payload:error?.response?.data,

        });
        swalert({
            title: error?.response?.data?.message?.message,
            text: 'Try again!',
            icon: `warning`
        })
    });
};
//=====================================================================================//
export const register = (formData, history, swalert) => async (dispatch) => {
    dispatch({
        type: REGISTER
    });
    return await api.register(formData)
    .then(async(u)=>{
        localStorage.setItem('profile', JSON.stringify(u.data))
        //Agregando el cart del local storage al usuario logueado
        let localStorageCart = await JSON.parse(localStorage.getItem('cart'))
        if(localStorageCart){
            localStorageCart.items?.map(async(i)=> api.addItem({productId: i.productId, quantity: i.quantity, colorName: i.colorName, sizeName: i.sizeName, stock: i.stock}, u.data?.result?._id))
        }  
        dispatch({
            type: REGISTER_SUCCESS,
            payload: u.data
        })
        document.cookie=`isAdmin=${u.data?.result?.isAdmin}`
        document.cookie=`_id=${u.data?.result?._id}` 
    })
    .then(async()=> {
        const message =  await JSON.parse(localStorage.getItem('profile'))
        swalert({
            title: message?.message?.message,
            text: 'Welcome!',
            icon: `success`
        })
    })
    .then(() => history.push('/'))
    .catch((error)=> {
        dispatch({
            type:REGISTER_ERROR,
            payload: error.response.data
        })
        swalert({
            title: error?.response?.data?.message?.message,
            text: 'Try again!',
            icon: `warning`
        })
    })
}
//=====================================================================================//
export const logout = () => async(dispatch) => {
    dispatch({
        type: LOGOUT
    })
}
//=====================================================================================//
export const getUserById = (_id) => async(dispatch) => {
    try {
        const { data } = await api.getUserById(_id);
        dispatch({type: GET_USER_BY_ID, payload: data});
    } catch (error) {
        console.log(error)
    }
}
//=====================================================================================//
export const googleLogIn = (formData, history) => async(dispatch) => {
    dispatch({
        type: GOOGLE_LOGIN
    });
    return await api.googleLogIn(formData)
    .then(async(u)=>{
        localStorage.setItem('profile', JSON.stringify(u.data))
        //Agregando el cart del local storage al usuario logueado
        let localStorageCart = await JSON.parse(localStorage.getItem('cart'))
        if(localStorageCart){
            localStorageCart.items?.map(async(i)=> api.addItem({productId: i.productId, quantity: i.quantity}, u.data?.result?._id))
        }  
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: u.data
        })
        document.cookie=`isAdmin=${u.data?.result?.isAdmin}`
        document.cookie=`_id=${u.data?.result?._id}` 
    })
    .then(() => history.push('/'))
    .catch((error)=>{
        dispatch({
            type:GOOGLE_LOGIN_ERROR,
            payload: error.response.data
        })
    })
}
//=====================================================================================//
export const changePassword = (passwords, history) => async(dispatch) => {
    dispatch({
        type: CHANGE_PASSWORD
    });
    return await api.changePassword(passwords)
    .then((p)=>{
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: p.data
        })
        localStorage.setItem('profile', JSON.stringify(p.data))
    })
    .then(()=> history.push('/'))
    .catch((error)=>{
        dispatch({
            type: CHANGE_PASSWORD_ERROR,
            payload: error.response.data
        })
    })
}
//=====================================================================================//
export const updateUser = (userBody, _id) => async(dispatch) => {
    dispatch({
        type: UPDATE_USER
    })
    return await api.updateUser(userBody, _id)
    .then((updated)=>{
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updated.data
        })
        localStorage.setItem('profile', JSON.stringify(updated.data))
    }).catch((error)=>{
        dispatch({
            type: UPDATE_USER_ERROR,
            payload: error.response.data
        })
    })
}
//=====================================================================================//