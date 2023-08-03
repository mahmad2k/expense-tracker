import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useExpensesContext } from "../contexts/expenses/expenses-context";

function AllExpenses() {
  const { expenses } = useExpensesContext();

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod='Total'
      fallbackText='No registered expenses found'
    />
  );
}

export default AllExpenses;
