import { useEffect, useState } from "react";

import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useExpensesContext } from "../contexts/expenses/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useExpensesContext();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (err) {
        setError("Could not fetch expenses - please try again later!");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='No expenses registered for the last 7 days'
    />
  );
}

export default RecentExpenses;
