import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userCreateReducer,
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  paperCreateReducer,
  paperDeleteReducer,
  paperDetailsReducer,
  paperMyListReducer,
  paperUpdateReducer,
} from './reducers/paperReducers';
import { subjectListReducer } from './reducers/subjectReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userCreate: userCreateReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  paperMyList: paperMyListReducer,
  paperCreate: paperCreateReducer,
  paperDelete: paperDeleteReducer,
  paperDetails: paperDetailsReducer,
  paperUpdate: paperUpdateReducer,
  subjectList: subjectListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
