// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import invariant from "redux-immutable-state-invariant";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"], // Specify slices to persist
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Custom middleware array
const middleware = [thunk]; // Adding redux-thunk as middleware

// Add development-only middlewares (redux-logger, redux-immutable-state-invariant)
if (process.env.NODE_ENV === "development") {
  // Add redux-immutable-state-invariant as middleware, it must be invoked to return a function
  middleware.push(invariant()); // Ensure it's invoked to return the middleware

  // Set up redux-logger, it must be invoked to return a middleware function
  const logger = createLogger({
    collapsed: true, // Log actions in collapsed form
  });
  middleware.push(logger); // Add logger middleware
}

// Create store with persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware), // Concatenate custom middleware
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

// Create the persistor to manage persistence
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
