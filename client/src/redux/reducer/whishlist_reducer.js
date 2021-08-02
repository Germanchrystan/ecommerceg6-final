import * as constants from '../constants';

const initialState = {
    whishlist : {},
    isLoading: false,
    error: null,
    includes: null,
}

const whishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_WHISHLIST:
            return {...state, whishlist: {}, isLoading: true, error:null}
        case constants.GET_WHISHLIST_SUCCESS:
            return {...state, whishlist: action.payload, isLoading:false, error:null}
        case constants.GET_WHISHLIST_ERROR:
            return {...state, whishlist:{}, isLoading:false, error: action.payload}
        case constants.ADD_PRODUCT_TO_WHISHLIST:
            return {...state, whishlist:{}, isLoading: true, error: null}
        case constants.ADD_PRODUCT_TO_WHISHLIST_SUCCESS:
            return {...state, whishlist:action.payload, isLoading:false, error:null}
        case constants.ADD_PRODUCT_TO_WHISHLIST_ERROR:
            return {...state, whishlist:{}, isLoading:false, error:action.payload}
        case constants.REMOVE_PRODUCT_FROM_WHISHLIST:
            return {...state, whishlist:{}, isLoading:true, error: null}
        case constants.REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS:
            return {...state, whishlist:action.payload, isLoading:false, error:null}
        case constants.REMOVE_PRODUCT_FROM_WHISHLIST_ERROR:
            return {...state, whishlist:{}, isLoading:false, error:action.payload}
        case constants.IS_PRODUCT_IN_WHISHLIST:
            return {...state, includes:null, isLoading:true, error:null}
        case constants.IS_PRODUCT_IN_WHISHLIST_SUCCESS:
            return {...state, includes: action.payload, isLoading: false, error:null}
        case constants.IS_PRODUCT_IN_WHISHLIST_ERROR:
            return {...state, isLoading:false, error: action.payload}
        case constants.TOGGLE_PRODUCT_IN_WHISHLIST:
            return {...state, isLoading: true, error: null}
        case constants.TOGGLE_PRODUCT_IN_WHISHLIST_SUCCESS:
            return {...state, whishlist: action.payload, isLoading: false, error:null}
        case constants.TOGGLE_PRODUCT_IN_WHISHLIST_ERROR:
            return {...state, isLoading:false, error:action.payload}
        default:
            return state
    }
} 

export default whishlistReducer