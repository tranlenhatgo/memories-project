import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";

// This is the root reducer that combines all the reducers
// Component => Actions => Reducer => Store => Component

export default combineReducers({
    posts, auth
});
