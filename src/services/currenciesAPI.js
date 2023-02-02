const fetchCurrencies = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const currenciesObject = await response.json();
  const currenciesList = Object.values(currenciesObject);

  const filteredCurrenciesList = currenciesList
    .filter(({ codein }) => codein !== 'BRLT');

  const currenciesAbbreviationsList = filteredCurrenciesList
    .map(({ code }) => code);

  return currenciesAbbreviationsList;
};

export default fetchCurrencies;
