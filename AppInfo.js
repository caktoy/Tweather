import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, ScrollView, Image, Alert, Linking } from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';

var app = require('./app.json');

class AppInfo extends Component {
    render() {
        console.log(styles);
        return(
            <ScrollView style={styles.container}>
                <View style={styles.item}>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemContainer}>
                            <RkText rkType='header title primary'>{app.displayName}</RkText>
                            <RkText rkType='small subtitle' style={{paddingBottom: 10}}>Version {app.version}</RkText>
                            <RkText rkType='small subtitle' style={{paddingBottom: 20}}>"Made with <Image source={require('./res/img/love.png')} style={{width: 24, height: 24}} /> from Pasuruan."</RkText>
                            <RkText rkType='small subtitle'>by <Text style={{color: '#4286f4'}} onPress={() => Linking.openURL('http://caktoy.github.io/')}>@caktoy</Text></RkText>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <RkButton style={styles.socialButton} onPress={() => Linking.openURL('https://www.facebook.com/thony.caktoy')}>
                                    <Image source={require('./res/img/facebook.png')} style={{width: 32, height: 32}} />
                                </RkButton>
                                <RkButton style={styles.socialButton} onPress={() => Linking.openURL('https://twitter.com/caktoy')}>
                                    <Image source={require('./res/img/twitter.png')} style={{width: 32, height: 32}} />
                                </RkButton>
                                <RkButton style={styles.socialButton} onPress={() => Linking.openURL('https://www.instagram.com/caktoyy/')}>
                                    <Image source={require('./res/img/instagram.png')} style={{width: 32, height: 32}} />
                                </RkButton>
                                <RkButton style={styles.socialButton} onPress={() => Linking.openURL('https://github.com/caktoy')}>
                                    <Image source={require('./res/img/github.png')} style={{width: 32, height: 32}} />
                                </RkButton>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    itemContainer: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerItem: {
        paddingBottom: 5, 
        marginBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth, 
        borderColor: '#CCC',
    },
    socialButton: {
        backgroundColor: 'transparent', 
        width: 32, 
        margin: 5
    }
});

export default AppInfo;