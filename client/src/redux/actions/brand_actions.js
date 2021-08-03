import * as api from '../api/index.js';
import * as constants from '../constants/'; 

export const  getBrands = () => async(dispatch) => {
    dispatch({
        type: constants.GET_BRANDS
    })
    return await api.getBrands()
    .then((brands) => {
        dispatch({
            type: constants.GET_BRANDS_SUCCESS,
            payload: brands.data
        })
    })
    .catch((error) => {
        dispatch({
            type: constants.GET_BRANDS_ERROR,
            payload: error.response?.data
        })
    })
}

export const getBrandById = (id) => async(dispatch) => {
    dispatch({
        type: constants.GET_BRAND_BY_ID
    })
    return await api.getBrandById(id)
    .then((brand) => 
        dispatch({
            type: constants.GET_BRAND_BY_ID_ERROR,
            payload: brand.data
        })
    )
    .catch((error) => {
        dispatch({
            type: constants.GET_BRAND_BY_ID_ERROR,
            payload: error.response?.data
        })
    })
}

export const addBrand = (brandBody, history, swal) => async(dispatch) => {
    dispatch({
        type: constants.ADD_BRAND
    })
    return await api.addBrand(brandBody)
    .then((brand) => {
        dispatch({
            type: constants.ADD_BRAND_SUCCESS,
            payload: brand.data
        })
    }) 
    .then(async()=> {
        swal({
            title: "Brand Added",
            text: 'Welcome!',
            icon: `success`
        })
    })
    .then(() => history.push('/brands'))
    .catch((error) => {
        dispatch({
            type: constants.ADD_BRAND_ERROR,
            payload: error.response?.data
        })
        swal({
            title: error?.response?.data?.message || "There was an error",
            text: 'Try again!',
            icon: `warning`
        })
    })
}

export const removeBrand = (id) => async(dispatch) => {
    dispatch({
        type: constants.REMOVE_BRAND
    })
    return await api.removeBrand(id)
    .then((res) => {
        dispatch({
            type: constants.REMOVE_BRAND_SUCCESS,
            payload: res.data
        })
    })
    .then((error) => {
        dispatch({
            type: constants.REMOVE_BRAND_ERROR,
            payload: error.response?.data
        })
    })
}