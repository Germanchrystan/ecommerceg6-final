import * as api from '../api/index.js';
import {
	GET_CATEGORIES,
	GET_CATEGORY_ID,
	ADD_CATEGORY,
	EDIT_CATEGORY,
	GET_ERROR_CATEGORY,
	DELETE_CATEGORY	,
	SEARCH_CATEGORY,
} from '../constants';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea



export const getCategories = (page) => async(dispatch) => {
	return await api.getCategories(page)
	.then((categories) => {
		dispatch({
			type: GET_CATEGORIES,
			payload: categories.data
		})
	})
	.catch(err => {
		dispatch({
			type: GET_ERROR_CATEGORY,
            payload: err.response,
		})
	})
}

export const searchCategory = (name) => async(dispatch) => {
	return await api.searchCategory(name)
	.then((categories) => {
		dispatch({
			type: SEARCH_CATEGORY,
			payload: categories.data
		})
	})
	.catch(err => {
		dispatch({
			type: GET_ERROR_CATEGORY,
            payload: err.response,
		})
	})
}


export const getCategoryById = (payload) => async(dispatch) => {
	return await api.getCategoryById(payload)
	.then((categories) => {
		dispatch({
			type: GET_CATEGORY_ID,
			payload: categories.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_CATEGORY,
        	payload: err.response,
		})
	})
}

export const addCategory = (payload) => async(dispatch) => {
	return await api.addCategory(payload)
	.then((categories) => {
		dispatch({
			type: ADD_CATEGORY,
			payload: categories.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_CATEGORY,
            payload: err.response,
		})
	})
}

export const editCategory = (payload) => async(dispatch) => {
	return await api.editCategory(payload)
	.then((categories) => {
		dispatch({
			type: EDIT_CATEGORY,
			payload: categories.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_CATEGORY,
            payload: err.response,
		})
	})
}


export const deleteCategory = (payload) => async(dispatch) => {
	return await api.deleteCategory(payload)
	.then((categories) => {
		dispatch({
			type: DELETE_CATEGORY,
			payload: categories.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_CATEGORY,
            payload: err.response,
		})
	})
}