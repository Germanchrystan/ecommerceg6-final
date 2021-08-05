import * as constants from "../constants";

const initialState = {
  allReviews: [],
  addReview: null,
  isLoading: false,
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_REVIEWS:
      return { ...state, allReviews: [], isLoading: true, error: null };
    case constants.GET_REVIEWS_ID:
      return { ...state, allReviews: [], isLoading: true, error: null };
    case constants.GET_REVIEW_SUCCESS:
      return {...state, allReviews: action.payload, isLoading: false, error: null };
    case constants.GET_REVIEW_ERROR:
      return { ...state, allReviews: [], isLoading: false, error: true };
    case constants.ADD_REVIEW:
      return { ...state, addReview: null, isLoading: true, error: null };
    case constants.ADD_REVIEW_SUCCESS:
      return {...state, addReview: action.payload, isLoading: false, error: false };
    case constants.ADD_REVIEW_ERROR:
      return { ...state, addReview: null, isLoading: false, error: true };
    case constants.FILTER_BY_ID:
      return { ...state, allReviews: action.payload, isLoading: true, error: null };
    case constants.GET_USER_REVIEWS:
      return { ...state, isLoading: true, error: null }
    case constants.GET_USER_REVIEWS_SUCCESS:
      return { ...state, allReviews: action.payload, isLoading: false, error:null };
    case constants.GET_USER_REVIEWS_ERROR:
      return { ...state, allReviews: null, isLoading: false, error: action.payload }
    default:
      return state;
  }
};

export default reviewsReducer;
