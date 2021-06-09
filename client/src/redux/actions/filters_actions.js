import * as api from '../api/index.js';

import{
    FILTER_BY_CATEGORY,
    FILTER_BY_NAME,
    FILTER_BY_BRAND,
} from "../constants";

export const filterByName = (filterName,filter) => async(dispatch) => {
  return await api.filterByName(filterName,filter)
  .then((res) => {
    dispatch({
      type: FILTER_BY_NAME,
      payload: res.data
    })
  })
  .catch((error) => console.log(error))
}


export const filterByBrand = (filter) => async(dispatch) => {
  return await api.filterByBrand(filter)
  .then((res) => {
    dispatch({
      type: FILTER_BY_BRAND,
      payload: res.data
    })
  })
  .catch((error) => console.log(error))
}



export const filterByCategory = (name) => async(dispatch) => {
  return await api.filterByCategory(name)
  .then((res) => {
    dispatch({
      type: FILTER_BY_CATEGORY,
      payload: res.data
    })
  })
  .catch((error) => console.log(error))
}


