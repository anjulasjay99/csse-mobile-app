import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Products from "../screens/Products";
import PlaceOrder from "../screens/PlaceOrder";
import Orders from "../screens/Orders";
import Login from "../screens/Login";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="HomeScreen"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Place Order" component={PlaceOrder} />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
}
