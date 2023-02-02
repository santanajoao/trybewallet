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

export const fetchCurrencies = () => (
  async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const dataArray = Object.values(await response.json());
    const filteredData = dataArray.filter(({ codein }) => codein !== 'BRLT');
    const currencies = filteredData.map(({ code }) => code);
    dispatch(setCurrencies(currencies));
  }
);
