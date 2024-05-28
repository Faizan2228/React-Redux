const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
const { createLogger } = require('redux-logger');

const logger = createLogger();

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: '' };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, users: [], error: action.payload };
        default:
            return state;
    }
};

const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUsersRequest());
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
        } catch (error) {
            dispatch(fetchUsersFailure(error.message));
        }
    };
};

const middlewares = [thunk, logger];
console.log('Middlewares :', middlewares);

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);


store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(fetchUsers());
