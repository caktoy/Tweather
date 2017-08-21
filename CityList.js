import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    ListView,
    ScrollView,
    TextInput,
    Alert,
    TouchableHighlight,
    StatusBar,
    ToolbarAndroid,
    Image,
    Button,
} from 'react-native';
import { StackNavigator, withNavigation } from 'react-navigation';
import {
    RkTheme,
    RkText,
    RkButton,
} from 'react-native-ui-kitten';

var CITY_DATA_SOURCE = require('./city.json');

class CityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: CITY_DATA_SOURCE,
            refreshing: false,
        };
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#43b9e8"
                    barStyle="dark-content"
                />
                <TextInput 
                    style={{backgroundColor: '#FEFEFE', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#CCC'}}
                    value={this.state.filter}
                    onChange={this.setFilter.bind(this)}
                    placeholder="Cari..." />
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => 
                        <ListItem
                            id={item.id}
                            title={item.name}
                            subtitle={item.province}
                            city={item}
                            onPress={() => navigate('Details', { city: item })}
                        />
                    }
                    extraData={this.state}
                    keyExtractor={item => item.key}
                    style={styles.list}
                />
            </View>
        );
    }

    setFilter(event) {
        let filterText = event.nativeEvent.text;
        this.setState({filter: filterText});
    }
}

class ListItem extends React.PureComponent {
    render() {
        return(
            <TouchableHighlight
                underlayColor='#eee'
                onPress={this.props.onPress}
                id={this.props.id}
            >
                <View style={styles.item}>
                    <Image source={require('./res/img/gps-icon.png')} style={{width: 50, height: 50}} />
                    <View style={{flex: 1, flexDirection: 'column', paddingLeft: 5}}>
                        <RkText rkType='header large primary'>{this.props.title}</RkText>
                        <RkText rkType='subtitle small'>{this.props.subtitle}</RkText>
                    </View>
                </View>
            </TouchableHighlight>
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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
        paddingLeft: 2,
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
    },
    name: {
        fontSize: 18,
    },
    country: {
        fontSize: 12,
    },
});

export default CityList;