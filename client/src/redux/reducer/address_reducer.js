const initialState = {
    provincias: [],
    municipios: [],
    calles: [],
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROVINCIAS':
            return {...state, provincias: action.payload}
        case 'GET_MUNICIPIOS':
            return {...state, municipios: action.payload}
        case 'GET_CALLES':
            return {...state, calles:action.payload}
        default:
            return state 
    }
}

export default addressReducer