import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ManageExpense from "../screens/ManageExpenseScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { GlobalStyles } from "../constants/styles";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const { navigate } = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name='ExpensesOverview'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='ManageExpense'
        component={ManageExpense}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
