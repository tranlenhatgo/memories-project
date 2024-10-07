import { AUTH, LOGOUT } from "../constants/actionTypes";

// This reducer will handle the state of the user authentication
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            console.log("Action Data", action.data);
            return { ...state, authData: action?.data };
        
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;