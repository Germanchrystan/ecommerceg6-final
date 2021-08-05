import * as constants from "../constants";
//{name:"test",price:100,brand:"a"},{name:"test2",price:100,brand:"a"}

const initialState = {
  cart: null,
  cartsList: null,
  isLoading: null,
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ITEM:
      return { ...state, cart: null, isLoading: true, error: null }
    case constants.ADD_ITEM_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: null }
    case constants.ADD_ITEM_ERROR:
      return { ...state, cart: action.payload, isLoading: false, error: true }
    case constants.GET_ACTIVE_CART_FROM_USER:
      return { ...state, cart: null, isLoading: true, error: null }
    case constants.GET_ACTIVE_CART_FROM_USER_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: false }
    case constants.GET_ACTIVE_CART_FROM_USER_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case constants.DELETE_ITEM:
      return { ...state, isLoading: true, error: null }
    case constants.DELETE_ITEM_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: null }
    case constants.DELETE_ITEM_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case constants.CHANGE_CART_STATE:
      return { ...state, isLoading: true, error: null }
    case constants.CHANGE_CART_STATE_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: null }
    case constants.CHANGE_CART_STATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case constants.INCREMENT_PRODUCT_UNIT_SUCCESS:
      return { ...state, cart: action.payload }
    case constants.DECREMENT_PRODUCT_UNIT_SUCCESS:
      return {...state,cart:action.payload}
    case constants.GET_ALL_CARTS_SUCCESS:
      return { ...state, cart: action.payload }
    case constants.GET_CART_BY_ID_SUCCESS:
      return { ...state, cart: action.payload }
    //======REDUCER VIEJO (A DEPRECAR)======// 
    case constants.ADD_TO_CART:
      return { cart: [...state.cart, action.payload] };
    case constants.DELETE_ITEM:
      return {...state, cart: action.payload, isLoading: false, error: false}
    case constants.BUY:
      return {cart: action.payload}
    default:
      return state;
  }
};

export default cartReducer;
