import {
  fetchCurrenciesList, fetchCurrenciesObject,
} from '../../services/currenciesAPI';

export const LOGIN = 'LOGIN';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export const setCurrencies = (currenciesList) => ({
  type: SET_CURRENCIES,
  payload: currenciesList,
});

export const getCurrencies = () => (
  async (dispatch) => {
    const currenciesList = await fetchCurrenciesList();
    dispatch(setCurrencies(currenciesList));
  }
);

export const addExpense = (expenseInfosObject) => ({
  type: ADD_EXPENSE,
  payload: expenseInfosObject,
});

export const createExpense = (expenseInfosObject) => (
  async (dispatch) => {
    const currenciesList = await fetchCurrenciesObject();
    const expenseInfosAndExchangeRatesObject = {
      ...expenseInfosObject,
      exchangeRates: currenciesList,
    };
    dispatch(addExpense(expenseInfosAndExchangeRatesObject));
  }
);
