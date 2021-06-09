import { 
    REGISTER, REGISTER_SUCCESS, REGISTER_ERROR, 
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, 
    GET_USER_BY_ID, 
    GOOGLE_LOGIN, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_ERROR,
    CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR,
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR
} from '../constants/';

const initialState = {
    authData: null,
    userDetail: null,
    isLoading: false,
    error: null 
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, authData: null, isLoading:true, error:null}
        case LOGIN_SUCCESS:
            return {...state, authData: action.payload, isLoading: false, error: null}    
        case LOGIN_ERROR:
            return {...state, authData: action.payload, isLoading: false, error:true}
        case GOOGLE_LOGIN:
            return {...state, authData: null, isLoading: true, error:null}
        case GOOGLE_LOGIN_SUCCESS:
            return{...state, authData: action.payload, isLoading:false, error:null}
        case GOOGLE_LOGIN_ERROR:
            return {...state, authData: action.payload, isLoading:false, error:true} 
        case LOGOUT:
            localStorage.clear();
            return {...state, authData : null}
        case REGISTER:
            return {...state, authData: null, isLoading: true, error:null}
        case REGISTER_SUCCESS:
            return {...state, authData: action.payload, isLoading: false, error: false}
        case REGISTER_ERROR:
            return {...state, authData: action.payload, isLoading: false, error: true}
        case GET_USER_BY_ID:
            return{...state, userDetail: action.payload}
        case CHANGE_PASSWORD:
            return{...state, authData: null, isLoading: true, error: null}
        case CHANGE_PASSWORD_SUCCESS:
            return{...state, authData: action.payload, isLoading: false, error: null}
        case CHANGE_PASSWORD_ERROR: //Acá habría que volver a agarrar al usuario del localStorage
            let profileFromStorage =  JSON.parse(localStorage.getItem('profile'));
            return {...state, authData: profileFromStorage, isLoading:false , error: action.payload}
        case UPDATE_USER:
            return {...state, authData: null, isLoading: true, error: null}
        case UPDATE_USER_SUCCESS:
            return {...state, authDate: action.payload, isLoading: false, error: false}
        case UPDATE_USER_ERROR:
            profileFromStorage =  JSON.parse(localStorage.getItem('profile'));
            return {...state, authData: profileFromStorage, isLoading: false, error: action.payload}
        default:
            return state;
    }
}

export default authenticationReducer;