import {CategoriesState} from "../../types";

const initialState: CategoriesState = {
    data: [],
    error: null,
};

const categoriesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_SUCCESS':
            return { ...state, data: action.payload };
        case 'FETCH_CATEGORIES_FAILURE':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default categoriesReducer;