import {
    GET_WHISHLIST,
    GET_WHISHLIST_SUCCESS,
    GET_WHISHLIST_ERROR,
    ADD_PRODUCT_TO_WHISHLIST, ADD_PRODUCT_TO_WHISHLIST_SUCCESS, ADD_PRODUCT_TO_WHISHLIST_ERROR,
    REMOVE_PRODUCT_FROM_WHISHLIST, REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS, REMOVE_PRODUCT_FROM_WHISHLIST_ERROR,
    TOGGLE_PRODUCT_IN_WHISHLIST, TOGGLE_PRODUCT_IN_WHISHLIST_SUCCESS, TOGGLE_PRODUCT_IN_WHISHLIST_ERROR,
    IS_PRODUCT_IN_WHISHLIST, IS_PRODUCT_IN_WHISHLIST_SUCCESS, IS_PRODUCT_IN_WHISHLIST_ERROR
} from '../constants';

const initialState = {
    whishlist : {},
    isLoading: false,
    error: null,
    includes: null,
}

const whishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WHISHLIST:
            return {...state, whishlist: {}, isLoading: true, error:null}
        case GET_WHISHLIST_SUCCESS:
            return {...state, whishlist: action.payload, isLoading:false, error:null}
        case GET_WHISHLIST_ERROR:
            return {...state, whishlist:{}, isLoading:false, error: action.payload}
        case ADD_PRODUCT_TO_WHISHLIST:
            return {...state, whishlist:{}, isLoading: true, error: null}
        case ADD_PRODUCT_TO_WHISHLIST_SUCCESS:
            return {...state, whishlist:action.payload, isLoading:false, error:null}
        case ADD_PRODUCT_TO_WHISHLIST_ERROR:
            return {...state, whishlist:{}, isLoading:false, error:action.payload}
        case REMOVE_PRODUCT_FROM_WHISHLIST:
            return {...state, whishlist:{}, isLoading:true, error: null}
        case REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS:
            return {...state, whishlist:action.payload, isLoading:false, error:null}
        case REMOVE_PRODUCT_FROM_WHISHLIST_ERROR:
            return {...state, whishlist:{}, isLoading:false, error:action.payload}
        case IS_PRODUCT_IN_WHISHLIST:
            return {...state, includes:null, isLoading:true, error:null}
        case IS_PRODUCT_IN_WHISHLIST_SUCCESS:
            return {...state, includes: action.payload, isLoading: false, error:null}
        case IS_PRODUCT_IN_WHISHLIST_ERROR:
            return {...state, isLoading:false, error: action.payload}
        case TOGGLE_PRODUCT_IN_WHISHLIST:
            return {...state, isLoading: true, error: null}
        case TOGGLE_PRODUCT_IN_WHISHLIST_SUCCESS:
            return {...state, whishlist: action.payload, isLoading: false, error:null}
        case TOGGLE_PRODUCT_IN_WHISHLIST_ERROR:
            return {...state, isLoading:false, error:action.payload}
        default:
            return state
    }
} 

export default whishlistReducer