import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Easing, Dimensions, Image, TouchableOpacity } from "react-native";
import {accelerometer, magnetometer, gyroscope, barometer} from "react-native-sensors";
import { createStackNavigator, createAppContainer,StackActions, NavigationActions,createBottomTabNavigator,createDrawerNavigator } from "react-navigation";

import Weather from './components/Weather.js';
import Sensors from './components/Sensors.js';



class SensorsScreen extends React.Component {
    static navigationOptions = {
        title: 'Sensors',
        tabBarIcon: () => (
            <Image source={require("./Assets/sensors_icon.png")} style={{
                height: 25,
                width: 25,
            }}/>
        )
    };
    render() {
      return (
       <Sensors />
      );
    }
  }

class WeatherScreen extends React.Component {
  static navigationOptions = {
        title: 'Weather',
        tabBarIcon: () => (
            <Image source={require("./Assets/weather_icon.png")} style={{
                height: 25,
                width: 25,
            }}/>
        )
  };
  render() {
    return (
        <Weather />
    );
  }
}



const BottomTabNavigator = createBottomTabNavigator({
    Weather: WeatherScreen,
    Sensors: SensorsScreen,
});

const styles = StyleSheet.create({
    widok: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#1369c9',
    },
      textBox: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
      },

});

export default createAppContainer(BottomTabNavigator);