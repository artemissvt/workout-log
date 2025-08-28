import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

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
      <Button title="Log in" onPress={() => navigation.navigate("signup")} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SignupScreen({ navigation }: any) {
  const [regularText, setRegularText] = useState('');
  const [Password, setPassword] = useState('');
  const [retypePassword, setretypePassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder=" "
        value={regularText}
        onChangeText={setRegularText}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder=" "
        secureTextEntry={true}   
        value={Password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Retype Password:</Text>
      <TextInput
        style={styles.input}
        placeholder=" "
        secureTextEntry={true}   
        value={retypePassword}
        onChangeText={setretypePassword}
      />

      <Button 
        title="Submit" 
        onPress={() => {
          console.log('Username:', regularText);
          console.log('Password:', Password);
          console.log('Retype Password:', retypePassword);
        }} 
      />
    </View>
  );
}

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="signup" component={SignupScreen}/>
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

