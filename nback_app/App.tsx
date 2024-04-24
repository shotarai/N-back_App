import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import QuestionScreen from "./screens/QuestionScreen";
import CheckScreen from "./screens/CheckScreen";
import LoginScreen from "./screens/LoginScreen";
import StartScreen from "./screens/StartScreen";
import PlayScreen from "./screens/PlayScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export type StackParamList = {
  Login: undefined;
  Question: undefined;
  Start: undefined;
  Play: undefined;
  Check: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentDate: Date = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      setCurrentTime(`${year}/${month}/${day}/${hours}:${minutes}:${seconds}`);
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
        <Text>BehaviorTracking is up and running!</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Question"
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          >
            {() => <QuestionScreen currentTime={currentTime} />}
          </Stack.Screen>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Play"
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          >
            {() => <PlayScreen currentTime={currentTime} />}
          </Stack.Screen>
          <Stack.Screen
            name="Check"
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          >
            {() => <CheckScreen currentTime={currentTime} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
