
import React, {Component} from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet, Image, ActivityIndicator, Animated, Easing } from 'react-native';
import ForecastBox from './ForecastBox.js';

export default class Weather extends React.Component {

	constructor(props){
		super(props);

        this.spinValue = new Animated.Value(0);

		this.state = {
			latitude: 52,
			longitude: 19,
			forecast: [],
			city: 'your location',
			temp: '273.15',
			wind: '0',
			pressure: '0',
			weater: 'none',
			back_picture: '04d',
			isLoading:true,
			error:'',
		};
	}

    runAnimation() {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
        }).start(() => this.runAnimation());
    }

	componentDidMount(){
		this.getLocation();

		this.runAnimation();
	}

	getLocation(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(
					(prevState) => ({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
					}), () => { this.getWeather(); }
				);
			},
			(error) => this.setState({ forecast: error.message }),
			{ enableHighAccuracy: true, timeout: 200000, maximumAge: 3600000 },
		);
	}

	getWeather(){
	    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=45a68b168d3c0b9e9dad3d525803a7fa'
		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
				forecast: data,
			}));
		})
		let url_current = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=45a68b168d3c0b9e9dad3d525803a7fa'
        fetch(url_current)
        .then(response => response.json())
        .then(data_current => {
            this.setState((prevState, props) => ({
                city: data_current.name,
                wind: data_current.wind.speed,
                temp: data_current.main.temp,
                pressure: data_current.main.pressure,
                weather: data_current.weather[0].description,
                back_picture: data_current.weather[0].icon,
                isLoading: false,
            }));
        })
	}

	getPictureUrl(param){
	  switch(param) {
        case '01d':
                  return require('./../Assets/Weather_Pictures/01d.png');
        case '01n':
                  return require('./../Assets/Weather_Pictures/01n.png');
        case '02d':
                  return require('./../Assets/Weather_Pictures/02d.png');
        case '02n':
                  return require('./../Assets/Weather_Pictures/02n.png');
        case '03d':
                  return require('./../Assets/Weather_Pictures/03d.png');
        case '03n':
                  return require('./../Assets/Weather_Pictures/03n.png');
        case '04d':
                  return require('./../Assets/Weather_Pictures/04d.png');
        case '04n':
                  return require('./../Assets/Weather_Pictures/04n.png');
        case '09d':
                  return require('./../Assets/Weather_Pictures/09d.png');
        case '09n':
                  return require('./../Assets/Weather_Pictures/09n.png');
        case '10d':
                  return require('./../Assets/Weather_Pictures/10d.png');
        case '10n':
                  return require('./../Assets/Weather_Pictures/10n.png');
        case '11d':
                  return require('./../Assets/Weather_Pictures/11d.png');
        case '11n':
                  return require('./../Assets/Weather_Pictures/11n.png');
        case '13d':
                  return require('./../Assets/Weather_Pictures/13d.png');
        case '13n':
                  return require('./../Assets/Weather_Pictures/13n.png');
        case '50d':
                  return require('./../Assets/Weather_Pictures/50d.png');
        case '50n':
                  return require('./../Assets/Weather_Pictures/50n.png');
        default:
          return require('./../Assets/Weather_Pictures/04d.png');
	  }
	}



	render() {
		const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        });
	    if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="blue"/>
              <Text style={{color: 'gray'}}> If takes to much time, check your GPS signal and Internet connection.</Text>
            </View>
          )
        }

	    const picture = this.getPictureUrl(this.state.back_picture);
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
                source={ picture }
              >
              </Image>
                            <View style={styles.CurrentWeatherBox}>
                            <View style={{alignItems:'center'}}>
                                <Text style={[styles.textbox, { fontSize: 35}]}> Current weather </Text>
                                <Text style={[styles.textbox, { fontSize: 18}]}> in </Text>
                                <Text style={[styles.textbox, { fontSize: 30}]}> {this.state.city}</Text>
                            </View>

                            <View style={{alignItems:'center'}}>
                                <Text style={[styles.textbox, { fontSize: 40}]}> {Math.round( (this.state.temp - 273.15)* 10) / 10 }&#8451; </Text>
                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <View style={{justifyContent:'center', alignItems:'center'}}>
                                        <Animated.Image source={require("./../Assets/pressure_icon.png")} style={{
                                            transform: [{rotate: spin}],
                                            height: 25,
                                            width: 25,
                                        }}/>
                                        <Text style={styles.textbox}> {this.state.pressure} hPa   </Text>
                                    </View>
                                    <View style={{justifyContent:'center', alignItems:'center'}}>
                                        <Animated.Image source={require("./../Assets/wind_icon.png")} style={{
                                            transform: [{rotate: spin}],
                                            height: 25,
                                            width: 25,
                                        }}/>
                                        <Text style={styles.textbox}>   {this.state.wind} m/s </Text>
                                    </View>
                                </View>
                            </View>
                                <Text style={[styles.textbox, { fontSize: 25, fontStyle: 'italic', fontWeight: 'normal'}]}> {this.state.weather} </Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'flex-end', }}>
                                <Text style={[styles.textbox, { fontSize: 15, fontStyle: 'italic'}]}> FORECAST: </Text>
                            </View>

                   			<FlatList
                                 data={this.state.forecast.list}
                                 style={{marginTop:20}}
                                 horizontal={true}
                                 keyExtractor={item => item.dt_txt}
                                 renderItem={({item}) =>

                                          <ForecastBox detail={item} location={this.state.forecast.city.name} />
                                          }
                   			 />


         </View>
		);
	}
}

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	mainBox:{
	    flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
	},
    CurrentWeatherBox:{
        height: ScreenHeight * 19 / 30,
        justifyContent:'space-evenly',
        alignItems:'center',
    },
	textbox: {
	    fontFamily: 'serif',
	    color: 'white',
        fontWeight:'bold',
        fontSize: 20,
	},

});