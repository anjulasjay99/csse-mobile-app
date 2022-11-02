import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";

//create a drawer navigator
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerBackVisible: false }}
      />
    </Drawer.Navigator>
  );
}
