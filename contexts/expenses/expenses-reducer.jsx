import { generateRandomId } from "../../util/randomId";

export const ExpenseActions = {
  Add: "ADD_EXPENSE",
  Update: "UPDATE_EXPENSE",
  Delete: "DELETE_EXPENSE",
};

export function ExpensesReducer(state, action) {
  switch (action.type) {
    case ExpenseActions.Add:
      const id = generateRandomId();
      return [{ ...action.payload, id }, ...state];
    case ExpenseActions.Update:
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case ExpenseActions.Delete:
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
