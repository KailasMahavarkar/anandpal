import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

// importing all reducers fro mstore
import { cartReducer } from "./reducers/cartReducer";

import logger from "redux-logger";

const config = {
	key: "shop",
	storage,
	debug: true,
};

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== "production") {
		// I require this only in dev environment
		const { composeWithDevTools } = require("redux-devtools-extension");
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return bindMiddleware(...middleware);
};

export const configureStore = () => {
	const store = createStore(
		persistCombineReducers(config, {
			shop: cartReducer,
		}),
		bindMiddleware([thunk, logger])
	);
	const persistor = persistStore(store);
	return { persistor, store };
};
