import {
  ADD_TO_CART,
  BUY,
  ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR,
  DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_ERROR, GET_CART_BY_ID_SUCCESS, 
  GET_ACTIVE_CART_FROM_USER, GET_ACTIVE_CART_FROM_USER_SUCCESS,DECREMENT_PRODUCT_UNIT_SUCCESS,INCREMENT_PRODUCT_UNIT_SUCCESS, GET_ACTIVE_CART_FROM_USER_ERROR, CHANGE_CART_STATE, CHANGE_CART_STATE_SUCCESS, INCREMENT_PRODUCT_UNIT, CHANGE_CART_STATE_ERROR, GET_REVIEWS_ID, GET_ALL_CARTS_SUCCESS
} from "../constants";
//{name:"test",price:100,brand:"a"},{name:"test2",price:100,brand:"a"}
const initialState = {
  cart: null,
  cartsList: null,
  isLoading: false,
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, cart: null, isLoading: true, error: null }
    case ADD_ITEM_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: null }
    case ADD_ITEM_ERROR:
      return { ...state, cart: action.payload, isLoading: false, error: true }
    case GET_ACTIVE_CART_FROM_USER:
      return { ...state, cart: null, isLoading: true, error: null }
    case GET_ACTIVE_CART_FROM_USER_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: false }
    case GET_ACTIVE_CART_FROM_USER_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case DELETE_ITEM:
      return { ...state, isLoading: true, error: null }
    case DELETE_ITEM_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: null }
    case DELETE_ITEM_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case CHANGE_CART_STATE:
      return { ...state, isLoading: true, error: null }
    case CHANGE_CART_STATE_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false, error: null }
    case CHANGE_CART_STATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case INCREMENT_PRODUCT_UNIT_SUCCESS:
      return { ...state, cart: action.payload }
    case DECREMENT_PRODUCT_UNIT_SUCCESS:
      return {...state,cart:action.payload}
    case GET_ALL_CARTS_SUCCESS:
      return { ...state, cart: action.payload }
    case GET_CART_BY_ID_SUCCESS:
      return { ...state, cart: action.payload }
    //======REDUCER VIEJO (A DEPRECAR)======// 
    case ADD_TO_CART:
      return { cart: [...state.cart, action.payload] };
    case DELETE_ITEM:
      return {...state, cart: action.payload, isLoading: false, error: false}
    case BUY:
      return {cart: action.payload}
    default:
      return state;
  }
};

export default cartReducer;
