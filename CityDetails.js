import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    ScrollView,
    ListView,
    StatusBar,
    ToolbarAndroid,    
    Alert,
    ActivityIndicator,
	Image,
} from 'react-native';
import { StackNavigation, withNavigation } from 'react-navigation';
import { RkTheme, RkText, RkButton, RkCard } from 'react-native-ui-kitten';

var API_KEY = '081509462cacfd0d7964f9996c0b2156';
var API_URL = 'http://api.openweathermap.org/data/2.5/';
var PARAMS = 'weather?units=metric&appid=' + API_KEY;
var REQUEST_PARAM = API_URL + PARAMS;
var API_ICONS_RES_URL = 'http://openweathermap.org/img/w/'; // ex: http://openweathermap.org/img/w/10d.png

class CityDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            success: true,
            city: props.navigation.state.params.city,
        };

        this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        headerRight: <RkButton 
            style={{backgroundColor: 'transparent', width: 50}} 
            onPress={this.fetchDataFromAPI}>
            <Image source={require('./res/img/reload.png')} style={{width: 20, height: 20}} />
        </RkButton>
    })

    componentDidMount() {
        this.fetchDataFromAPI();
    }
	
	fetchDataFromAPI() {
		// request from API
        REQUEST_URL = REQUEST_PARAM + '&q=' + this.state.city.name + ',' + this.state.city.country;
        return fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    success: true,
                    dataSource: responseJson,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    success: false,
                    dataSource: error,
                });
            });
	}
    
    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        if (!this.state.success) {
            return(
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>Failed to Get Data.</Text>
                    <Text>{this.state.dataSource}</Text>
                </View>
            );
        } else {
            var { coord, weather, base, main, visibility, wind, clouds, dt, sys, id, name, cod } = this.state.dataSource;
            
            var tanggal_sistem = new Date(dt * 1000);
            var tanggal_terbit = new Date(sys.sunrise * 1000);
            var tanggal_tenggelam = new Date(sys.sunset * 1000);

            return(
                <ScrollView style={styles.container}>
					<View style={styles.item}>
						<Image 
							source={require('./res/img/gps-icon.png')}
							style={{width: 50, height: 50}} />
						<View style={{flex: 1, flexDirection: 'column', paddingLeft: 10,}}>	
							<RkText rkType='header large primary'>{this.state.city.name}, {this.state.city.province}</RkText>
							<RkText rkType='subtitle small'>Lon: {coord.lon}, Lat: {coord.lat}</RkText>
						</View>
					</View>

                    <WeatherItem data={weather}/>
                    
                    <CommonItem 
                        title='Detil' 
                        data={[
                            {key: 'Temperatur', value: main.temp + ' Celcius'},
                            {key: 'Temperatur Min.', value: main.temp_min + ' Celcius'},
                            {key: 'Temperatur Max.', value: main.temp_max + ' Celcius'},
                            {key: 'Tekanan', value: main.pressure + ' hPa'},
                            {key: 'Permukaan Laut', value: main.sea_level + ' hPa'},
                            {key: 'Permukaan Tanah', value: main.grnd_level + ' hPa'},
                            {key: 'Kelembaban', value: main.humidity + '%'},
                        ]}
                    />

                    <CommonItem 
                        title='Angin' 
                        data={[
                            {key: 'Kecepatan Angin', value: wind.speed + ' meter/detik'},
                            {key: 'Arah Angin', value: wind.deg + ' Derajat'},
                        ]}
                    />

                    <CommonItem 
                        title='Awan' 
                        data={[
                            {key: 'Mendung', value: clouds.all + '%'},
                        ]}
                    />

                    <CommonItem 
                        title='Sistem' 
                        data={[
                            {key: 'Tanggal', value: this.formatTanggal(tanggal_sistem)},
                            {key: 'Terbit', value: this.formatTanggal(tanggal_terbit)},
                            {key: 'Tenggelam', value: this.formatTanggal(tanggal_tenggelam)},
                        ]}
                    />
                </ScrollView>
            );
        }
    }

    formatTanggal(tanggal) {
        var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return tanggal.getDate() + ' ' + bulan[tanggal.getMonth()] + ' ' + tanggal.getFullYear() + ' ' + tanggal.getHours() + ':' + tanggal.getMinutes();
    }
    
}

class WeatherItem extends Component {
    render() {
		return(
            <View style={styles.item}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <RkText rkType='header large primary' style={styles.headerItem}>Cuaca</RkText>
                    <ScrollView 
                        horizontal={true}
                        contentContainerStyle={{paddingHorizontal: 20}}
                    >
                        {this.props.data.map((item) => 
                            <View key={item} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Image 
                                    source={{uri: API_ICONS_RES_URL + item.icon + '.png'}} 
                                    style={{width: 50, height: 50}}
                                    />
                                <RkText rkType='primary small'>{item.main}</RkText>
                                <RkText rkType='small'>{item.description}</RkText>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
		);
	}
}

class CommonItem extends Component {
    render() {
        return(
            <View style={styles.item}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <RkText rkType='header large primary' style={styles.headerItem}>{this.props.title}</RkText>
                    {this.props.data.map((item) => 
                        <View key={item.key} style={{flex: 1, flexDirection: 'row'}}>
                            <RkText rkType='info' style={{flex: 0.35, textAlign: 'right'}}>{item.key} </RkText>
                            <RkText style={{flex: 0.65}}>: {item.value}</RkText>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
    },
    item: {
		flex: 1,
		flexDirection: 'row',
        margin: 5,
        padding: 5,
		backgroundColor: '#FFF',
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#CCC',
		borderRadius: 3,
    },
    headerItem: {
        paddingBottom: 5, 
        marginBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth, 
        borderColor: '#CCC',
    }
});

export default CityDetails;