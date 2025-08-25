import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();


function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏋️ Workout Log</Text>
      <Button title="Login" onPress={() => navigation.navigate("account")} />
    </View>
  );
}

function AccountScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout Log</Text>
      <Button title="Log in" onPress={() => navigation.navigate("login")} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

function LoginScreen({ navigation }: any) {
  const [regularText, setRegularText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Regular Field:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter something"
        value={regularText}
        onChangeText={setRegularText}
      />

      <Button 
        title="Submit" 
        onPress={() => {
          console.log('Regular Text:', regularText);
        }} 
      />
    </View>
  );
}

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="login" component={LoginScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
  },
});

