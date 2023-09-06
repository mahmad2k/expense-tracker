import { createContext, useContext, useReducer } from "react";
import { ExpenseActions, ExpensesReducer } from "./expenses-reducer";

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ id, description, amount, date, createdAt }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date, createdAt }) => {},
});

export function useExpensesContext() {
  return useContext(ExpensesContext);
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(ExpensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: ExpenseActions.ADD_EXPENSE, payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: ExpenseActions.SET_EXPENSES, payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: ExpenseActions.DELETE_EXPENSE, payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: ExpenseActions.UPDATE_EXPENSE,
      payload: { id, data: expenseData },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
