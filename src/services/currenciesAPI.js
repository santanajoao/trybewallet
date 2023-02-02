export const fetchCurrenciesObject = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const currenciesObject = await response.json();
  delete currenciesObject.USDT;
  return currenciesObject;
};

export const fetchCurrenciesList = async () => {
  const currenciesObject = await fetchCurrenciesObject();
  const currenciesAbbreviationsList = Object.keys(currenciesObject);
  return currenciesAbbreviationsList;
};
