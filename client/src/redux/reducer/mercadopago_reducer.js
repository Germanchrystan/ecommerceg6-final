import * as constants from './../constants/index';

const initialState = {
    order = {}
}

const mercadoPagoReducer = (state = initialState, action) => {
    switch(action.type){
        case constants.POST_MERCADO_PAGO:
            return{...state, order: {}, isLoading: true, error: null}
        case constants.POST_MERCADO_PAGO_SUCCESS:
            return {...state, order: action.payload, isLoading: false, error: null}
        case constants.POST_MERCADO_PAGO_ERROR:
            return {...state, order: {}, isLoading: false, error: action.payload}
        default:
            return state;
    }
}