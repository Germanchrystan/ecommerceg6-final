import {
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  ADD_REVIEW_SUCCESS,
  GET_ALL_REVIEWS,
  GET_REVIEW_ERROR,
  GET_REVIEW_SUCCESS,
  GET_REVIEWS_ID,
  FILTER_BY_ID
} from "../constants";

const initialState = {
  allReviews: [],
  addReview: null,
  isLoading: false,
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return { ...state, allReviews: [], isLoading: true, error: null };
    case GET_REVIEWS_ID:
      return { ...state, allReviews: [], isLoading: true, error: null };
    case GET_REVIEW_SUCCESS:
      return {...state, allReviews: action.payload, isLoading: false, error: null };
    case GET_REVIEW_ERROR:
      return { ...state, allReviews: [], isLoading: false, error: true };
    case ADD_REVIEW:
      return { ...state, addReview: null, isLoading: true, error: null };
    case ADD_REVIEW_SUCCESS:
      return {...state, addReview: action.payload, isLoading: false, error: false };
    case ADD_REVIEW_ERROR:
      return { ...state, addReview: null, isLoading: false, error: true };
    case FILTER_BY_ID:
      return { ...state, allReviews: action.payload, isLoading: true, error: null };
    default:
      return state;
  }
};

export default reviewsReducer;
