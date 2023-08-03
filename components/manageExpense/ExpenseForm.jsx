import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? "",
      isValid: true, // no warning at the start, will be validated on submit
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
  });

  function inputChangeHandler(name, enteredText) {
    setInputs((curInputs) => ({
      ...curInputs,
      [name]: { value: enteredText, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDesciptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDesciptionValid) {
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: isAmountValid },
          date: { value: currInputs.date.value, isValid: isDateValid },
          description: {
            value: currInputs.description.value,
            isValid: isDesciptionValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const isFormNotValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pod",
            value: inputs.amount.value,
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />

      {isFormNotValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    margin: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
    color: "white",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 128,
    marginHorizontal: 8,
  },
});
