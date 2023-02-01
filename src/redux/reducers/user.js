import { LOGIN } from '../actions';

const INITIAL_STORE = {
  email: '',
};

const userReducer = (store = INITIAL_STORE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...store,
      email: action.payload,
    };
  default:
    return store;
  }
};

export default userReducer;
