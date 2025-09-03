import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";


const Stack = createNativeStackNavigator();


function HomeScreen({ navigation }: any) {
   return (
    <>
      <View style={styles.containerTopleft}>
        <Text style={styles.topLeft}>🏋️ Workout Log</Text>
      </View>

      <View style={styles.containerCenter}>
        <Button title="Find Your Account" onPress={() => navigation.navigate("account")}/>
      </View>
    </>
  );
}

function AccountScreen({ navigation }: any) {
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Your Workout Log</Text>
      <Button title="Sign up" onPress={() => navigation.navigate("signup")} />
      <Button title="Log in" onPress={() => navigation.navigate("login")} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

export function SignupScreen({ navigation }: any) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [retypePassword, setretypePassword] = useState('');
  const [db, setDb] = useState<any>(null);

   useEffect(() => {
    async function initDB() {
      const database = await SQLite.openDatabaseAsync("userdata.db");
      setDb(database);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "username" TEXT UNIQUE,
          "password" TEXT
        );`
    );
    }

    initDB();
  }, []);

  const handleSubmit = async () => {
    if (!Username || !Password || !retypePassword) {
      alert("Please fill all fields");
      return;
    }

    if (Password !== retypePassword) {
      alert("Passwords don't match");
      return;
    }

    if (!db) {
      alert("Database not ready yet");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [Username, Password]
      );
      const rows = await db.getAllAsync("SELECT * FROM users;");
      console.log("Users in DB:", rows);
      alert("User signed up successfully");

      setUsername("");
      setPassword("");
      setretypePassword("");
    } catch (error: any) {
      if (error.message.includes("UNIQUE")) {
        alert("Username already exists");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  
  return (
    <View style={styles.containerCenter}>
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

      <Button title="Submit" onPress={handleSubmit}/>
    </View>
  );
}

function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.containerCenter}>
      <Button title="Log in" onPress={() => navigation.navigate("dashboard")} />
    </View>
  );
}

export function Dashboard() {
  return (
    <View style={styles.containerTopleft}>
      <Text style={styles.topLeft}>Your Dashboard</Text>
    </View>
      );
}

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="signup" component={SignupScreen}/>
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="dashboard" component={Dashboard}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  containerCenter: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 50,
  },
  containerTopleft: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "flex-start",     
    backgroundColor: "#fff",
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
  topLeft: {
    fontSize: 24,
    fontWeight: "bold", 
    margin: 20, 
    backgroundColor: "#fff",
  },
});

