import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { postReducers, evaluationReducers } from '../reducers';

function configureStore(initialState) {
  const store = createStore(
    postReducers,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  );

  return store;
}

function configureEvaluationStore(initialState) {
  const store = createStore(
    evaluationReducers,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  );

  return store;
}

export {
  configureStore,
  configureEvaluationStore
};
