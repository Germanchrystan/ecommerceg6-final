import{
    FILTER_BY_PRICE,
    FILTER_BY_CATEGORY,
    FILTER_BY_NAME,
} from "../constants";

const initialState = {
    filterResults = []
};

const filtersReducer = (state = initialState, action) => {
    switch (action.payload) {
        case FILTER_BY_NAME:
            return{...state, filterResults: action.payload}
        case FILTER_BY_PRICE:
            return{...state, filterResults: action.payload}
        case FILTER_BY_CATEGORY:
            return{...state, filterResults: action.payload}
        default:
            return state;
    }

}

export default filtersReducer;