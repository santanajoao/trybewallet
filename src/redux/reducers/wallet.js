import {
  SET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, START_EDITION, EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id !== state.idToEdit) {
          return expense;
        }
        const { value, description, currency, method, tag } = action.payload;
        const editedExpense = { ...expense };

        editedExpense.value = value;
        editedExpense.description = description;
        editedExpense.currency = currency;
        editedExpense.method = method;
        editedExpense.tag = tag;

        return editedExpense;
      }),
    };
  case START_EDITION:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
