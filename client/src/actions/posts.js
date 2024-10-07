import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

//The client can receive the data `res` from backend here
//The actions will send the data to reducers to change the state of posts

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        // console.log("Fetched posts in actions:", data);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);   
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload:data })
    } catch (error) {
        console.log(error)
    }
}
