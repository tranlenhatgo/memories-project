import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //go to api, send to backend, get data, dispatch to reducer
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
