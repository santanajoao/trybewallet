import fetchCurrencies from '../../services/currenciesAPI';

export const LOGIN = 'LOGIN';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const getCurrencies = () => (
  async (dispatch) => {
    const currencies = await fetchCurrencies();
    dispatch(setCurrencies(currencies));
  }
);
