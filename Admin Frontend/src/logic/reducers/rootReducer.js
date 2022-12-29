import { combineReducers } from "redux";
import { dataReducer } from "./allData";
import { orderReducer, boolReducer } from "./orderData";

const rootReducer = combineReducers({
  gBool: boolReducer,
  allData: dataReducer,
  orderData: orderReducer,
});

export default rootReducer;
