
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';


export default class ForecastBox extends Component {

	render() {


        var date_parts = this.props.detail.dt_txt.split(" ");
        var day_parts = date_parts[0].split("-");
        var hour_parts = date_parts[1].split(":");

        let time = hour_parts[0] + ':' + hour_parts[1];
        let day = day_parts[2] + '.' + day_parts[1];

		return (
			<View style={styles.insidebox}>
				<Image style={{width:ScreenWidth/5, height:ScreenWidth/5}} source={{uri:"https://openweathermap.org/img/w/" + this.props.detail.weather[0].icon + ".png"}} />
				<Text style={styles.notes}>{Math.round( (this.props.detail.main.temp - 273.15)* 10) / 10 }&#8451;</Text>
				<Text style={styles.notes}>{time}</Text>
                <Text style={styles.notes}> {day} </Text>
			</View>
		);
	}
}

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	notes: {
	    textAlign: 'center',
		fontSize: 12,
		color:'#fff',
		fontWeight: 'bold'
	},
	insidebox:{
	flexDirection: 'column',
	justifyContent:'space-evenly',
	alignItems:'center',
	width:ScreenWidth/4,
	}
});