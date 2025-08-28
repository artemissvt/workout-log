import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from 'expo-sqlite';
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
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [retypePassword, setretypePassword] = useState('');

  const [db, setDb] = useState<any>(null);

  React.useEffect(() => {
    async function initDB() {
      const database = SQLite.openDatabaseAsync('userdata.db');
      setDb(database);

      await db.executeSqlAsync(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );`
      );
    }

    initDB();
  }, []);

  const handleSubmit = async () => {
    if (!Username || !Password || !retypePassword) {
      alert('Please fill all fields');
      return
    }

    if (Password !== retypePassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await db.executeSqlAsync(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [Username, Password]
      );

      alert('User signed up successfully');
      setUsername('');
      setPassword('');
      setretypePassword('');

    } catch (error: any) {
    if (error.message.includes('UNIQUE')) {
      alert('Username already exists');
    }
  }
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder=" "
        value={Username}
        onChangeText={setUsername}
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
          /* insert into DB */  }} 
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

