import * as constants from './../constants/index';

const initialState = {
    allBrands: null,
    brandDetail: null,
    isLoading: false,
    error: null
} 

const brandReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_BRANDS:
            return { ...state, allBrands: null, isLoading: true, error:null }
        case constants.GET_BRANDS_SUCCESS:
            return { ...state, allBrands: action.payload, isLoading: false, error:null }
        case constants.GET_BRANDS_ERROR:
            return { ...state, isLoading: false, error:action.payload }
        case constants.GET_BRAND_BY_ID:
            return { ...state, brandDetail:null, isLoading: true, error:null }
        case constants.GET_BRAND_BY_ID_SUCCESS:
            return { ...state, brandDetail:action.payload, isLoading:false, error:null }
        case constants.GET_BRAND_BY_ID_ERROR:
            return { ...state, brandDetail:null, isLoading:false, error:null }
        case constants.ADD_BRAND:
            return { ...state, allBrands:null, isLoading:true, error:null }
        case constants.ADD_BRAND_SUCCESS:
            return { ...state, allBrands:action.payload, isLoading:false, error:null } 
        case constants.ADD_BRAND_ERROR: 
            return { ...state, allBrands:null, isLoading:false, error:action.payload }
        case constants.REMOVE_BRAND:
            return { ...state, isLoading:true, error:null }
        case constants.REMOVE_BRAND_SUCCESS:
            return { ...state, allBrands:action.payload, isLoading:false, error:null }
        case constants.REMOVE_BRAND_ERROR:
            return { ...state, isLoading:false, error:null }
        default:
            return state;
    }
}

export default brandReducer;