import axios from 'axios';

//backend url
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

//intercept request, add token to header
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        //get token from profile
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
    }
);
//send id or post data to backend

//localhost:5000/posts GET
export const fetchPosts = () => API.get('/posts');
//localhost:5000/posts POST newPost
export const createPost = (newPost) => API.post('/posts', newPost);
//localhost:5000/posts/id PATCH updatedPost
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
//localhost:5000/posts/id DELETE
export const deletePost = (id) => API.delete(`/posts/${id}`);
//localhost:5000/posts/id/likePost PATCH
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//localhost:5000/auth/signin POST formData
export const signIn = (formData) => API.post(`/user/signin`, formData);
//localhost:5000/auth/signup POST formData
export const signUp = (formData) => API.post(`/user/signup`, formData);