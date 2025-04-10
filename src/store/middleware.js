import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import invariant from "redux-immutable-state-invariant";

import rootReducer from "./rootReducer";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(invariant());

  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
