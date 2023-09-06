import { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { useExpensesContext } from "../contexts/expenses/expenses-context";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import {
  storeExpense,
  updateExpense as httpUpdateExpense,
  deleteExpense as httpDeleteExpense,
} from "../util/http";
import { generateRandomId } from "../util/randomId";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function createExpense(expense) {
  return {
    ...expense,
    id: generateRandomId(),
    createdAt: new Date(),
  };
}

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useExpensesContext();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await httpDeleteExpense(editedExpenseId);
      deleteExpense(editedExpenseId);

      // setIsSubmitting(false); not needed as we are going back to previous screen
      navigation.goBack();
    } catch (err) {
      setError("Could not delete expense - please try again later");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function addOrUpdateHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await httpUpdateExpense(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);

        // setIsSubmitting(false); not needed as we are going back to previous screen
        navigation.goBack();
      } else {
        const expense = createExpense(expenseData);
        await storeExpense(expense);
        addExpense(expense);
      }
    } catch (err) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
        onSubmit={addOrUpdateHandler}
        onCancel={cancelHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
