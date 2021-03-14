import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import {accelerometer, magnetometer, gyroscope, barometer, setUpdateIntervalForType, SensorTypes} from "react-native-sensors";


export default class Sensors extends Component {

    constructor(props) {
      super(props);


      setUpdateIntervalForType(SensorTypes.magnetometer, 100);
      setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
      setUpdateIntervalForType(SensorTypes.gyroscope, 1000);
      setUpdateIntervalForType(SensorTypes.barometer, 1000);



      this.state = {
          magnes: 0,
          acc:{x: 0, y: 0, z: 0},
          gyro:{x: 0, y: 0, z: 0},
          baro:{x: 0, y: 0, z: 0},
          error: ''
      }
    }

     static getDerivedStateFromError(error) {
        return {gyro:{x: 0, y: 0, z: 0}, baro:{x: 0, y: 0, z: 0}};
      }

    componentDidMount() {
        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }


      _toggle = () => {
            if (this._subscription) {
              this._unsubscribe();
            } else {
              this._subscribe();
            }
      };

      _subscribe = async () => {
            try{
                this._subscription_magnes = magnetometer.subscribe(({x, y, z}) => {
                  this.setState({magnes: this._angle(x, y, z)});
                });
            } catch(error){
                this.setState({magnes: this._angle(0, 0, 0)});
            }

            try{
                this._subscription_acc = accelerometer.subscribe(({x, y, z}) => {
                  this.setState({acc:{x: x, y: y, z: z}});
                });
            } catch(error){
                this.setState({acc:{x: 0, y: 0, z: 0}});
            }

            try{
              // this._subscription_gyro = gyroscope.subscribe(({x, y, z}) => {
                //  this.setState({gyro:{x: x, y: y, z: z}});
                //});
            } catch(error){
                this.setState({gyro:{x: 0, y: 0, z: 0}});
            }

            try{
              // this._subscription_baro = barometer.subscribe(({x, y, z}) => {
              //    this.setState({baro:{x: x, y: y, z: z}});
             //   });
            } catch(error){
                this.setState({baro:{x: 0, y: 0, z: 0}});
            }
      };

    _unsubscribe = () => {
      this._subscription_magnes && this._subscription_magnes.remove();
      this._subscription_magnes = null;
      this._subscription_acc && this._subscription_acc.remove();
      this._subscription_acc = null;
      this._subscription_gyro && this._subscription_gyro.remove();
      this._subscription_gyro = null;
      this._subscription_baro && this._subscription_baro.remove();
      this._subscription_baro = null;
    };

    _angle = (x, y, z) => {
        if (Math.atan2(y, x) >= 0) {
          angle = Math.atan2(y, x) * (180 / Math.PI);
        }
        else {
          angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
        }

      return Math.round(angle);
    };

    _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

    _degree = (magnetometer) => {
      return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    render() {

      return (

              <View style={styles.mainBox}>
              		<Image
                              style={{
                                backgroundColor: '#000',
                                flex: 1,
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                              }}
                              source={ require('./../Assets/sensors_bg.png') }
                            >
                    </Image>

                        <Text style={styles.title}> SENSORS </Text>
                      <View>
                            <Text style={[styles.textBox, { fontSize: 15}]}>
                                Direction:  {this._direction(this._degree(this.state.magnes))}
                            </Text>
                            <Text style={[styles.textBox, { fontSize: 15}]}>
                                Angle: {360 - this._degree(this.state.magnes)}&#176;
                            </Text>
                      </View>

                      <View style={styles.compassBox}>
                          <Image source={require("./../Assets/compass_disc_gold.png")} style={{
                            height: ScreenWidth - 15,
                            width: ScreenWidth - 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            resizeMode: 'contain',
                            position: 'absolute'
                          }}/>

                            <Image source={require("./../Assets/compass_arrow_gold.png")} style={{
                              height: ScreenWidth - 25,
                              width: ScreenWidth - 25,
                              justifyContent: 'center',
                              alignItems: 'center',
                              resizeMode: 'contain',
                              transform: [{rotate: 360 - this.state.magnes + 'deg'}]
                            }}/>
                      </View>

                <View style={styles.sensorsBox}>
                    <View style={styles.singleSensorBox}>
                    <Text style={[styles.textBox, { fontSize: 15}]}> Accelerometer </Text>
                    <Text style={styles.textBox}> X: {Math.round( (this.state.acc.x)* 10) / 10 }</Text>
                    <Text style={styles.textBox}> Y: {Math.round( (this.state.acc.y)* 10) / 10 } </Text>
                    <Text style={styles.textBox}> Z: {Math.round( (this.state.acc.z)* 10) / 10 } </Text>
                    </View>
                    <View style={styles.singleSensorBox}>
                    <Text style={[styles.textBox, { fontSize: 15}]}> Gyroscope </Text>
                    <Text style={styles.textBox}> X: {Math.round( (this.state.gyro.x)* 10) / 10 } </Text>
                    <Text style={styles.textBox}> Y: {Math.round( (this.state.gyro.y)* 10) / 10 } </Text>
                    <Text style={styles.textBox}> Z: {Math.round( (this.state.gyro.z)* 10) / 10 } </Text>
                    </View>
                    <View style={styles.singleSensorBox}>
                    <Text style={[styles.textBox, { fontSize: 15}]}> Barometer </Text>
                    <Text style={styles.textBox}> X: {Math.round( (this.state.baro.x)* 10) / 10 } </Text>
                    <Text style={styles.textBox}> Y: {Math.round( (this.state.baro.y)* 10) / 10 } </Text>
                    <Text style={styles.textBox}> Z: {Math.round( (this.state.baro.z)* 10) / 10 } </Text>
                    </View>

                </View>


              </View>

      );
    }
  }

const ScreenWidth  =  Dimensions.get('window').width
const ScreenHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
	mainBox:{
	    flex: 1,
        flexDirection: 'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'black'
	},

	compassBox:{
	    justifyContent:'center',
	    alignItems:'center',
	},
	sensorsBox:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },

	singleSensorBox:{
        justifyContent:'center',
        alignItems:'center',
	},
	textBox: {
	    fontFamily: 'serif',
	    color: 'white',
        fontWeight:'bold',
        fontSize: 12,
	},
    title: {
        fontFamily: 'serif',
        color: 'white',
        fontWeight:'bold',
        fontStyle:'italic',
        fontSize: 30,
    },

});