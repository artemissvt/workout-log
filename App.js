import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

// --- Home Screen ---
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏋️ Workout Log</Text>
      <Button
        title="Go to Log"
        onPress={() => navigation.navigate("Log")}
      />
    </View>
  );
}

// --- Log Screen ---
function LogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout Log</Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// --- App Entry ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Log" component={LogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});
