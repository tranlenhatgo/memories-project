import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

//All function handles the state management of posts in THE ENTIRE CLIENT
//The reducer runs whenever an action is dispatched.

export default (posts = [],action) => {
    switch (action.type) {

      case FETCH_ALL:
        //console.log('Reducer received posts:', action.payload);
        return action.payload;

      case CREATE:
        return [...posts, action.payload];

      case UPDATE:
        return posts.map((post) => post._id === action.payload._id ? action.payload : post );

      //It's not really a deletion; it just filters out the posts with the deleted ID
      //It's more convenient than fetching all posts.
      case DELETE:
        return posts.filter((post) => post._id !== action.payload);
      
      //It's the same as update
      case LIKE:
        console.log('Reducer received liked post:', action.payload);
        return posts.map((post) => post._id === action.payload._id ? action.payload : post );

      default:
        return posts;
    }
}
        