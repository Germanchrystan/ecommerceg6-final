import * as constants from './../constants/index';

const initialState = {
    order: {},
    id:''
}

const mercadoPagoReducer = (state = initialState, action) => {
    switch(action.type){
        case constants.POST_MERCADO_PAGO:
            return{...state, order: {}, isLoading: true, error: null}
        case constants.POST_MERCADO_PAGO_SUCCESS:
            console.log(action.payload)
            localStorage.setItem('mercadopagoid', JSON.stringify(action.payload.id))
            return {...state, order: action.payload, id:action.payload.id, isLoading: false, error: null}
        case constants.POST_MERCADO_PAGO_ERROR:
            return {...state, order: {}, isLoading: false, error: action.payload}
        default:
            return state;
    }
}

export default mercadoPagoReducer;