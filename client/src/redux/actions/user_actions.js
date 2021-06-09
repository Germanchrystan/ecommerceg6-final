import * as api from '../api/index.js';

import {
	GET_USER_ID,
	EDIT_USER,
	GET_USERS,
	DELETE_USER,
	GET_ERROR_USER,
	SEARCH_USER,
	ADMIN_USER,
	GET_ERROR_ADMIN,
	EDIT_PASSWORD,
	ADD_ADDRESS,
	ADD_ADDRESS_ERROR,
	REMOVE_ADDRESS,
	REMOVE_ADDRESS_ERROR
} from '../constants';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
//const { REACT_APP_API } = process.env; // En deploy comentar esta linea


export const getUsers = (page) => async(dispatch) => {
	return await api.getUsers(page)
	.then((user) => {
		dispatch({
			type: GET_USERS,
			payload: user.data
			})
	})
	.catch((err) => {
		dispatch({
			type: GET_USERS,
        	id: err.response,
		})
	})
}


export const searchUser = (payload) => async(dispatch) => {
	return await api.searchUser(payload)
	.then((user) => {
		dispatch({
			type: SEARCH_USER,
			payload: user.data
		})
	})
	.catch((err) => {
	dispatch({
		type: SEARCH_USER,
        id: err.response,
		})
	})
}


export const getUserById = (id) => async(dispatch) => {
	return await api.getUserById(id)
	.then((user) => {
	dispatch({
			type: GET_USER_ID,
			payload: user.data
			})
		})
		.catch((err) => {
		dispatch({
			type: GET_USER_ID,
        	id: err.response,
		})
	})
}

export const editUser = (payload) => async(dispatch) => {
	return await api.editUser(payload)
	.then((userEdit) => {
		localStorage.setItem('profile', JSON.stringify(userEdit.data))

		dispatch({
			type: EDIT_USER,
			payload: userEdit.data
		})
	})
	.catch((err) => {
		dispatch({
			type: EDIT_USER,
        	payload: err.response,
		})
	})
}

export const editUserAdmin = (payload,admin) => async(dispatch) => {
	console.log("·$AWEDASDSAd",payload,admin)
	return await api.editUser(payload)
	.then((userEdit) => {
		if(userEdit.data._id==admin.result._id){
			localStorage.setItem('profile', JSON.stringify(userEdit.data))
		}
		
		dispatch({
			type: EDIT_USER,
			payload: userEdit.data
		})
	})
	.catch((err) => {
		dispatch({
			type: EDIT_USER,
        	payload: err.response,
		})
	})
}


export const deleteUser = (payload) => async(dispatch) => {
	return await api.delUser(payload)
	.then((users) => {
		dispatch({
			type: DELETE_USER,
			payload: users.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_USER,
        	payload: err.response,
		})
	})
}


export const toggleAdmin = (payload) => async (dispatch) => {
	return await api.toggleAdmin(payload)
	.then((users) => {
		localStorage.setItem('profile', JSON.stringify(users.data))
		dispatch({
			type: ADMIN_USER,
			payload: users.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_ADMIN,
            payload: err.response,
		})
	})
}




export const editPassword = (id, payload) => async(dispatch) => {
	return await api.editPassword(id,payload)
	.then((edit) => {
		dispatch({
			type: EDIT_PASSWORD,
			payload: edit.data
		})
	})
	.catch((err) => {
	dispatch({
		type: EDIT_PASSWORD,
        payload: err.response,
		})
	})
}

export const addAddress = (id, payload, history, swal) => async(dispatch) => {
    return await api.addAddress(id, payload)
    .then((edit) => {
        dispatch({
            type: ADD_ADDRESS,
            payload: edit.data
        })
        localStorage.setItem('profile', JSON.stringify(edit?.data))
    })
	.then(async()=> {
        swal({
            title: "Done!",
            text: 'Address Added',
            icon: `success`
        })
    })
    .then(() => history.push('/myProfile'))
    .catch((error) => {
        dispatch({
            type: ADD_ADDRESS_ERROR,
            payload: error?.response?.data
        })
		swal({
            title: "Error",
            text: 'All fields are required',
            icon: `warning`
        })
    })
}

export const removeAddress = (id, addressId, history, swal) => async(dispatch) => {

    return await api.removeAddress(id, addressId)
    .then((edit) => {
        dispatch({
            type: REMOVE_ADDRESS,
            payload: edit.data
        })
        localStorage.setItem('profile', JSON.stringify(edit?.data))
    })
	.then(async()=> {
        swal({
            title: "Done!",
            text: 'Address removed from your Account',
            icon: `info`
        })
    })
    .then(() => history.push('/myProfile'))
    .catch((error) => {
        dispatch({
            type: REMOVE_ADDRESS_ERROR,
            payload: error?.response?.data
        })
    })
}