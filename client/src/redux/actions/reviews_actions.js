import axios from "axios";
import * as api from "../api/index.js";
import {
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  ADD_REVIEW_SUCCESS,
  GET_ALL_REVIEWS,
  GET_REVIEW_ERROR,
  GET_REVIEW_SUCCESS,
  GET_REVIEWS_ID,
  FILTER_BY_ID,
} from "../constants";

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea

export const getAllReviews = (page) => async (dispatch) => {
  dispatch({
    type: GET_ALL_REVIEWS,
  });
  return await api
    .getAllReviews(page)
    .then((res) => {
      dispatch({
        type: GET_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_REVIEW_ERROR,
        payload: err.response,
      });
    });
};

export const getReviewsById = (id, page) => async (dispatch) => {
  dispatch({
    type: GET_REVIEWS_ID,
  });
  return await api
    .getReviewsById(id, page)
    .then((res) => {
      dispatch({
        type: GET_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_REVIEW_ERROR,
        payload: err.response,
      });
    });
};

export const filterById = (id) => async (dispatch) => {
  dispatch({
    type: FILTER_BY_ID,
  });
  return await api.filterReviewsById(id)
    .then((res) => {
      dispatch({
        type: FILTER_BY_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FILTER_BY_ID,
        payload: err.response,
      });
    });
};

export const addReviews = (body) => async (dispatch) => {
  dispatch({
    type: ADD_REVIEW,
  });
  return await api
    .addReviews(body)
    .then((p) => {
      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: p.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: err.response,
      });
    });
};
