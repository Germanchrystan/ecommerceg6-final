import { stockUpdated } from "../actions/products_actions";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  DETAIL_PRODUCT,
  SEARCH_PRODUCTS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  FILTER_BY_PRICE,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_SIZE,
  EDIT_STOCK,DELETE_STOCK
} from "../constants";

const initialState = {
  allProducts: [],
  addProduct: null,
  isLoading: false,
  error: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: [], isLoading: true, error: null };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, allProducts: action.payload, isLoading: false, error: null };
    case GET_PRODUCTS_ERROR:
      return { ...state, allProducts: [], isLoading: false, error: true };
    case ADD_PRODUCT:
      return { ...state, addProduct: null, isLoading: true, error: null };
    case ADD_PRODUCT_SUCCESS:
      console.log("ENTRA AL REduceR", action.payload)
      return { ...state, addProduct: action.payload, isLoading: false, error: false };
    case ADD_PRODUCT_ERROR:
      return { ...state, addProduct: null, isLoading: false, error: true }
    case EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.products.map((prod) => {
          if (action.payload.id === prod.id) {
            prod = {
              ...prod,
              ...action.payload,
            }
          }
          return prod;
        })
      }
    case EDIT_STOCK:
      return { ...state,
      allProducts: action.payload}
    case DELETE_STOCK:
      return{...state,
        allProducts:action.payload
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.products.filter((prod) => prod.id !== action.payload)
      }
    case DETAIL_PRODUCT:
      return { ...state, allProducts: action.payload };
    case SEARCH_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case FILTER_BY_NAME:
      return { ...state, allProducts: action.payload }
    case FILTER_BY_PRICE:
      return { ...state, allProducts: action.payload }
    case FILTER_BY_CATEGORY:
      return { ...state, allProducts: action.payload }
    case FILTER_BY_BRAND:
      return { ...state, allProducts: action.payload }
    case FILTER_BY_SIZE:
      return { ...state, allProducts: action.payload }
    default:
      return state;
  }
};

export default productsReducer;
