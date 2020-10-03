import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Registro from "./components/Registro";
import Gerenciamento from "./components/Gerenciamento";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { Image, SafeAreaView, Button, ScrollView, ToastAndroid, ActivityIndicator, TouchableHighlight, TextInput, Alert, TouchableOpacity, ImageBackground, Switch } from 'react-native';

import * as firebase from 'firebase';

// Initialize Firebase
// dados removidos
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
let dataAtual = new Date();
let diaAtual = dataAtual.getDate();
var mesAtual = (dataAtual.getMonth() + 1).toString();

if (mesAtual.length === 1) {
  mesAtual = '0' + mesAtual;
}

if (diaAtual < 10) {
  diaAtual = '0' + diaAtual;
}

const titulo = 'Registro ' + diaAtual + '/' + mesAtual;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: titulo }}
        />
        <Stack.Screen
          name="Gerenciamento"
          component={Gerenciamento}
          options={{ title: 'Gerenciamento de Ponto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>



  );
}