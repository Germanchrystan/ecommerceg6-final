import { ADD_CATEGORY, GET_CATEGORIES,GET_CATEGORY_ID, EDIT_CATEGORY, DELETE_CATEGORY,SEARCH_CATEGORY } from './../constants';

const initialState = {
	categories: {
		isLoading: false,
		list: [],
		category: {},
		error: false
	}
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: {
					...state.categories,
					list: action.payload
				}
			}
			case GET_CATEGORY_ID:
				return{
					...state,
					categories:{
						...state.categories,
						category:action.payload
					}
				}
			case SEARCH_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					list: action.payload
				}
			}
		case ADD_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					list: [
						...state.categories.list,
						action.payload
					]
				}
			}
		case EDIT_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					list: state.categories.list.map(el => {
						if (el.id === action.payload.id) {
							return action.payload;
						}
						return el;
					})
				}
			}
		case DELETE_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					list: state.categories.list.filter(category => category.id !== action.payload.id)
				}
			}
		default: return state;
	}
}

export default categoriesReducer;