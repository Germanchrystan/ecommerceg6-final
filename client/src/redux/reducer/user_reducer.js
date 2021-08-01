import * as constants from './../constants';

const initialState = {
	user: {
		list: [],
		category: {},
	},
	isLoading: false,
	error: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.GET_USER_ID:
			return {...state, user: null, isLoading: true, error: null}
		case constants.GET_USER_ID_SUCCESS:
			return { ...state, user: { ...state.user, list: action.payload }, isLoading: false}
		case constants.GET_USER_ID_ERROR:
			return { ...state, user: null, isLoading: false, error: action.payload}
		case constants.GET_USERS:
			return { ...state, user: { ...state.user, list: action.payload }}
		case constants.EDIT_USER:
			return { ...state, user: { ...state.user, list: (state.user.list.userFound.id === action.payload.id)? action.payload:" "}}
		case constants.DELETE_USER:
			return { ...state, user: { ...state.user, list: state.user.list.filter(user => user.id !== action.payload.id)}}
		case constants.SEARCH_USER:
			return { ...state, user: { ...state.user, list: action.payload }}
		case constants.ADMIN_USER:
			return { ...state, user: { ...state.user, list: (state.user.list.id === action.payload.id)? action.payload:" "}}
		case constants.EDIT_PASSWORD:
			return { ...state, user: { ...state.user, list: (state.user.list.userFound._id === action.payload._id)? action.payload:" "}}
		case constants.ADD_ADDRESS:
			return { ...state, user: { ...state.user, list: (state.user.list.userFound._id === action.payload._id)?action.payload:" "}}
		case constants.ADD_ADDRESS_ERROR:
			return { ...state, error: action.payload }
		case constants.REMOVE_ADDRESS:
			return { ...state, user: { ...state.user, list: (state.user.list.userFound._id === action.payload._id)?action.payload:" "}}
		case constants.REMOVE_ADDRESS_ERROR:
			return { ...state, error: action.payload}
		default: return state;
	}
}

export default userReducer;