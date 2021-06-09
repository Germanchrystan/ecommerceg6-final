import { GET_USER_ID ,EDIT_USER, GET_USERS, DELETE_USER, SEARCH_USER, ADMIN_USER,EDIT_PASSWORD,
	REMOVE_ADDRESS, REMOVE_ADDRESS_ERROR, ADD_ADDRESS_ERROR, ADD_ADDRESS
} from './../constants';

const initialState = {
	user: {
		list: [],
		category: {},
		error: false
	}
};


const userReducer = (state = initialState, action) => {

	switch (action.type) {
		case GET_USER_ID:
			return {
				...state,
				user: {
					...state.user,
					list: action.payload
				}
			}
		case GET_USERS:
			return {
				...state,
				user: {
					...state.user,
					list: action.payload
				}
			}
		case EDIT_USER:
			console.log(action.payload)	
			return {
				...state,
				user: {
					...state.user,
					list: (state.user.list.userFound.id === action.payload.id)? action.payload
						:" "
					
				}
			}
		case DELETE_USER:
			return {
				...state,
				user: {
					...state.user,
					list: state.user.list.filter(user => user.id !== action.payload.id)
				}
			}
		case SEARCH_USER:
			return {
				...state,
				user: {
					...state.user,
					list: action.payload
				}
			}
		case ADMIN_USER:
			return {
				...state,
				user: {
					...state.user,
					list: (state.user.list.id === action.payload.id)? action.payload
						:" "
				}
			}
		case EDIT_PASSWORD:
			console.log(action.payload)	
			return {
				...state,
				user: {
					...state.user,
					list: (state.user.list.userFound._id === action.payload._id)? action.payload
						:" "
				}
			}
		case ADD_ADDRESS:
			return {
				...state,
				user : {
					...state.user,
					list: (state.user.list.userFound._id === action.payload._id)?action.payload
					:" "
				}
			}
		case ADD_ADDRESS_ERROR:
			return {
				...state,
				error: action.payload
			}
		case REMOVE_ADDRESS:
			return {
				...state,
				user : {
					...state.user,
					list: (state.user.list.userFound._id === action.payload._id)?action.payload
					:" "
				}
			}
		case REMOVE_ADDRESS_ERROR:
			return {
				...state,
				error: action.payload
			}
		default: return state;
	}
}

export default userReducer;