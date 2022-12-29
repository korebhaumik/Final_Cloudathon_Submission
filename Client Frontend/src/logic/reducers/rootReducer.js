import { combineReducers } from "redux";
import { dataReducer } from "./allData";
import { cartReducer } from "./cartData";
import { globalBoolReducer, orderDataReducer } from "./global";

const rootReducer = combineReducers({
  allData: dataReducer,
  cartData: cartReducer,
  gBool: globalBoolReducer,
  orderData: orderDataReducer,
});

export default rootReducer;
