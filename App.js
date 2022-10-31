import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import MainNavigator from "./app/navigators/MainNavigator";

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
}
