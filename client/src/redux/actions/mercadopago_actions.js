import * as api from '../api/index.js';
import * as constants from '../constants/index';


export const postMercadoPago = (userId, cartBody) => async(dispatch) => {
    dispatch({
        type: constants.POST_MERCADO_PAGO
    })
    return await api.postMercadoPagoPayment(userId,cartBody)
    .then((order) => {
        dispatch({
            type: constants.POST_MERCADO_PAGO_SUCCESS,
            payload: order.data
        })

    })
    .catch((error) => {
        dispatch({
            type: constants.POST_MERCADO_PAGO_ERROR,
            payload: error.response.data
        })
    })
}