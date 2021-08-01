import { stockUpdated } from "../actions/products_actions";
import * as constants from "../constants";

const initialState = {
  allProducts: [],
  addProduct: null,
  isLoading: false,
  error: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_PRODUCTS:
      return { ...state, allProducts: [], isLoading: true, error: null };
    case constants.GET_PRODUCTS_SUCCESS:
      return { ...state, allProducts: action.payload, isLoading: false, error: null };
    case constants.GET_PRODUCTS_ERROR:
      return { ...state, allProducts: [], isLoading: false, error: true };
    case constants.ADD_PRODUCT:
      return { ...state, addProduct: null, isLoading: true, error: null };
    case constants.ADD_PRODUCT_SUCCESS:
      return { ...state, addProduct: action.payload, isLoading: false, error: false };
    case constants.ADD_PRODUCT_ERROR:
      return { ...state, addProduct: null, isLoading: false, error: true }
    case constants.EDIT_PRODUCT:
      return { ...state, allProducts: state.allProducts.products.map((prod) => {
          if (action.payload.id === prod.id) {
            prod = {
              ...prod,
              ...action.payload,
            }
          }
          return prod;
        })
      }
    case constants.EDIT_STOCK:
      return { ...state,
      allProducts: action.payload}
    case constants.DELETE_STOCK:
      return{...state, allProducts:action.payload}
    case constants.DELETE_PRODUCT:
      return {...state, allProducts: state.allProducts.products.filter((prod) => prod.id !== action.payload)}
    case constants.DETAIL_PRODUCT:
      return {...state, allProducts:null, isLoading:true, error:null}
    case constants.DETAIL_PRODUCT_SUCCESS:
      return { ...state, allProducts: action.payload, isLoading:false};
    case constants.SEARCH_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case constants.FILTER_BY_NAME:
      return { ...state, allProducts: action.payload }
    case constants.FILTER_BY_PRICE:
      return { ...state, allProducts: action.payload }
    case constants.FILTER_BY_CATEGORY:
      return { ...state, allProducts: action.payload }
    case constants.FILTER_BY_BRAND:
      return { ...state, allProducts: action.payload }
    case constants.FILTER_BY_SIZE:
      return { ...state, allProducts: action.payload }
    case constants.ADD_PRODUCT_DISCOUNT:
      return { ...state, allProducts: null, isLoading: true, error: null }
    case constants.ADD_PRODUCT_DISCOUNT_SUCCESS:
      return { ...state, allProducts: action.payload, isLoading: false, error: null }
    case constants.ADD_PRODUCT_DISCOUNT_ERROR:
      return { ...state, allProducts: null, isLoading: false, error: action.payload }
    case constants.APPROVE_CUSTOM_PRODUCT:
      return { ...state, allProducts: null, isLoading: true, error: null } 
    case constants.APPROVE_CUSTOM_PRODUCT_SUCCESS:
      return { ...state, allProducts: action.payload, isLoading: false, error: null }
    case constants.APPROVE_CUSTOM_PRODUCT_ERROR:
      return { ...state, allProducts: null, isLoading: false, error: action.payload }
    case constants.DISAPPROVE_CUSTOM_PRODUCT:
      return { ...state, allProducts: null, isLoading: true, error: null }
    case constants.DISAPPROVE_CUSTOM_PRODUCT_SUCCESS:
      return { ...state, allProducts: action.payload, isLoading: false, error: null }
    case constants.DISAPPROVE_CUSTOM_PRODUCT_ERROR:
      return { ...state, allProducts: null, isLoading: false, error: action.payload }
    default:
      return state;
  }
};

export default productsReducer;
