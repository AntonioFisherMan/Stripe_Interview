import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import StripeReducer from './StripeReducer';
import AuthReducer from './AuthReducer';
import SuccessErrorReducer from './SuccessErrorsReducer';


let reducers=combineReducers({
    form: formReducer,
    stripe:StripeReducer,
    auth:AuthReducer,
    messages:SuccessErrorReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers( applyMiddleware(thunkMiddleware)))

window.store=store;
export default store