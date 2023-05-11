import { combineReducers } from '@reduxjs/toolkit';
import cart from './reducers/cart';
import user from './reducers/user';
import generalData from './reducers/generalData';
import category from './reducers/category';

export default combineReducers({ cart, category, user, generalData });
