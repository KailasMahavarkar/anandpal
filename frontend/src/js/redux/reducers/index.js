import cartItems from "./cartItems";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  cartItems: cartItems,
});

export default rootReducers;
