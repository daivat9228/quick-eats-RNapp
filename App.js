import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import HomeScreen from "./screens/HomeScreen.js";
import CartScreen from "./screens/CartScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";

// Import Context Provider
import StoreContext from "./context/StoreContext";
import CheckoutScreen from "./screens/CheckoutScreen.js";

import { Provider } from "react-redux";
import { store } from "./redux/store"; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Provider store={store}>
    <StoreContext>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreContext>
    </Provider>
  );
}
