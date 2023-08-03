import { createContext, useContext, useReducer } from "react";
import { ExpenseActions, ExpensesReducer } from "./expenses-reducer";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A book",
    amount: 59.99,
    date: new Date("2022-11-20"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2023-04-05"),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2023-05-12"),
  },
  {
    id: "e4",
    description: "A Pair of shoes",
    amount: 50.99,
    date: new Date("2021-02-12"),
  },
  {
    id: "e5",
    description: "Burger Meal",
    amount: 18.59,
    date: new Date("2023-07-27"),
  },
];

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

export function useExpensesContext() {
  return useContext(ExpensesContext);
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(ExpensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: ExpenseActions.Add, payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: ExpenseActions.Delete, payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: ExpenseActions.Update,
      payload: { id, data: expenseData },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
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
