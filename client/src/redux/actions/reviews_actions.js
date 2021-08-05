//import axios from "axios";
import * as api from "../api/index.js";
import * as constants from "../constants";

//===================================================================================//
export const getAllReviews = (page) => async (dispatch) => {
  dispatch({
    type: constants.GET_ALL_REVIEWS,
  });
  return await api
    .getAllReviews(page)
    .then((res) => {
      dispatch({
        type: constants.GET_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: constants.GET_REVIEW_ERROR,
        payload: err.response,
      });
    });
};
//===================================================================================//
export const getReviewsById = (id, page) => async (dispatch) => {
  dispatch({
    type: constants.GET_REVIEWS_ID,
  });
  return await api
    .getReviewsById(id, page)
    .then((res) => {
      dispatch({
        type: constants.GET_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: constants.GET_REVIEW_ERROR,
        payload: err.response,
      });
    });
};
//===================================================================================//
export const filterById = (id) => async (dispatch) => {
  dispatch({
    type: constants.FILTER_BY_ID,
  });
  return await api.filterReviewsById(id)
    .then((res) => {
      dispatch({
        type: constants.FILTER_BY_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: constants.FILTER_BY_ID,
        payload: err.response,
      });
    });
};
//===================================================================================//
export const addReviews = (body, history, swal) => async (dispatch) => {
  dispatch({
    type: constants.ADD_REVIEW,
  });
  return await api.addReviews(body)
  .then((p) => {
    dispatch({
      type: constants.ADD_REVIEW_SUCCESS,
      payload: p.data,
    });
  })
  .then(async() => {
    swal("Good job!", "Well done!", "success", { button: true })
  })
  .then(() => history.push("/"))
  .catch((err) => {
    dispatch({
      type: constants.ADD_REVIEW_ERROR,
      payload: err.response,
    });
  });
};
//===================================================================================//
export const getUserReviews = (userId) => async(dispatch) => {
  dispatch({
    type: constants.GET_USER_REVIEWS
  })
  return await api.getUserReviews(userId)
  .then((res) => {
    dispatch({
      type: constants.GET_USER_REVIEWS_SUCCESS,
      payload: res.data
    })
  })
  .catch((error) => {
    dispatch({
      type: constants.GET_USER_REVIEWS_ERROR,
      payload: error.response.data
    })
  })
}
//===================================================================================//