import { combineReducers } from "redux";
import drawerReducer from "./slices/drawer";

export interface RootState {
  drawer: ReturnType<typeof drawerReducer>;
}

const rootReducer = combineReducers({
  drawer: drawerReducer,
});

export default rootReducer;
