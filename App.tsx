import {CategoryScreenProps, RootScreenProps, SubCategoryScreenProps} from "./src/types";
import {createStackNavigator} from "@react-navigation/stack";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import {NavigationContainer} from "@react-navigation/native";
import CategoryScreen from "./src/screens/CategoryScreen";
import React, {useState} from "react";
import SubCategoryScreen from "./src/screens/SubCategoryScreen";
import SearchScreen from "./src/screens/SearchScreen";

type RootStackParamList = {
  Main: undefined;
  Category: CategoryScreenProps;
  SubCategory: SubCategoryScreenProps;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Main" component={SearchScreen} />
              <Stack.Screen
                  name="Category"
                  component={CategoryScreen}
                  options={{ presentation: 'modal' }}
              />
              <Stack.Screen name="SubCategory" component={SubCategoryScreen} options={{ presentation: 'modal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

