import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from "axios";
import {Action} from "redux";
import {Alert, Platform} from "react-native";

const API_URL = Platform.select({
    ios: 'http://localhost:3000/',
    android: 'http://10.0.2.2:3000/',
});

export const fetchCategories = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        const response = await axios.get(API_URL as string);
        dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('error', error);
        dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: 'An error occurred while fetching categories.' });
        Alert.alert('Error', 'Failed to fetch categories. Please try again later.');
    }
};