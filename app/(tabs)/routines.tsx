import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

function RoutineScreen({ navigation}: any) {
    return (
        <View style={styles.containerTopleft}>
            <Text style={styles.topLeft}>Your Routines</Text>
        </View>
    );
}

export default function Routines(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="routines" component={RoutineScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
  containerCenter: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
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