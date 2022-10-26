import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Products from "./app/screens/Products";
import PlaceOrder from "./app/screens/PlaceOrder";
import Orders from "./app/screens/Orders";
import Login from "./app/screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Place Order" component={PlaceOrder} />
        <Stack.Screen name="Orders" component={Orders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9e9e9e",
    alignItems: "center",
    justifyContent: "center",
  },
});
