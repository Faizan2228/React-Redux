const { configureStore, combineReducers, applyMiddleware } = require('@reduxjs/toolkit');
const { createLogger, default: logger } = require('redux-logger')

const reduxLogger = createLogger()

const BUY_Cake = 'BUY_CAKE';
const ICE_CREAM = 'ICE_CREAM';

const buycake = () => {
    return {
        type: BUY_Cake,
        info: 'hello world'
    };
};

const iceCream = () => {
    return {
        type: ICE_CREAM,
        add: {
            info: 'hello world'
        }
    };
};

const initialState = {
    numberOfCakes: 10
};

const iceState = {
    numberOfCreams: 20
};

const reducerCake = (state = initialState, action) => {
    switch (action.type) {
        case BUY_Cake:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 2
            };
        default:
            return state;
    }
};

const reducerIceCream = (state = iceState, action) => {
    switch (action.type) {
        case ICE_CREAM:
            return {
                ...state,
                numberOfCreams: state.numberOfCreams - 2
            };
        default:
            return state;
    }
};

const rootReducers = combineReducers({
    cakes: reducerCake,
    iceCream: reducerIceCream
});

const store = configureStore({
    reducer: rootReducers,
    middleware: (getInitialState) => getInitialState().concat(logger)
});

console.log("Initial state:", store.getState());

store.dispatch(buycake());
store.dispatch(iceCream());

const unsubscribe = store.subscribe(() => console.log("Updated state:", store.getState()));

console.log("Updated state after dispatching actions:", store.getState());

unsubscribe();
