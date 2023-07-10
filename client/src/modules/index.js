import { combineReducers } from "redux";
import signup from "./signup.js";
import login from "./login.js";
import accesstoken from "./accesstoken.js";
import user from "./user.js";
import paper from "./paper.js";
import topic from "./topic.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accesstoken", "user", "login"],
};

const rootReducer = combineReducers({
  signup,
  login,
  accesstoken,
  user,
  paper,
  topic,
});

export default persistReducer(persistConfig, rootReducer);
