import axios from "axios";
import { BACKEND_URL } from "@env";

const EXPENSE_ROUTE = "/expenses";

export async function storeExpense(expenseData) {
  await axios.post(`${BACKEND_URL}${EXPENSE_ROUTE}`, expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}${EXPENSE_ROUTE}`);
  const expenses = response.data?.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));

  const sortedExpenses = expenses?.sort((a, b) => b.createdAt - a.createdAt);

  return sortedExpenses || [];
}

export function updateExpense(id, expenseData) {
  return axios.put(`${BACKEND_URL}/${EXPENSE_ROUTE}`, { id, ...expenseData });
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/${EXPENSE_ROUTE}/object/${id}`);
}
