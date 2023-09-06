export const ExpenseActions = {
  ADD_EXPENSE: "ADD_EXPENSE",
  SET_EXPENSES: "SET_EXPENSES",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  DELETE_EXPENSE: "DELETE_EXPENSE",
};

export function ExpensesReducer(state, action) {
  switch (action.type) {
    case ExpenseActions.ADD_EXPENSE:
      return [action.payload, ...state];
    // set only sets the fetched expenses from backend
    case ExpenseActions.SET_EXPENSES:
      return action.payload.reverse();
    case ExpenseActions.UPDATE_EXPENSE:
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case ExpenseActions.DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
