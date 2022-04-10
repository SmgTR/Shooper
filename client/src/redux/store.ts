import { createStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import productsReducer from './slices/products-slice';
import pageNavReducer from './slices/pagenav-slice';

import categoriesReducer from './slices/categories-slice';


import { createGQLClient } from 'Apollo/client';
// ...

const rootReducer = combineReducers({
  products: productsReducer,
  pageNav: pageNavReducer,
  categories: categoriesReducer
});

export type StoreState = {
};

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ client: createGQLClient() }))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
