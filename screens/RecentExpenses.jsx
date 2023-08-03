import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useExpensesContext } from "../contexts/expenses/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const { expenses } = useExpensesContext();

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
