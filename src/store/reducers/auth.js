import * as actionTypes from '../actions/actionTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    let updatedState = { ...state, error: null, loading: true }
    return updatedState
}

const authSuccess = (state, action) => {
    let updatedState = { 
        ...state, 
    }

    updatedState = {
        token: action.token, 
        userId: action.userId,
        error: null, 
        loading: false 
    }
    return updatedState
}

const authFail = (state, action) => {
    let updatedState = { 
        ...state, 
        error: action.error, 
        loading: false 
    }
    return updatedState
}

const authLogout = (state, action) => {
    let updatedState = { 
        ...state,
        token: null,
        userId: null
    }
    return updatedState
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

export default reducer