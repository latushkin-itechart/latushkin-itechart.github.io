import React, {Component} from 'react';
import {Share, Dimensions} from 'react-native'
import {WebView} from 'react-native-webview';

export default class WebApp extends Component {

    style = {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }

    render() {

        const onEvent = (event) => {
            console.log(event);
        }

        let webRef = null;


        const source = {
            uri: 'https://99946a71eedd.ngrok.io/'
            // uri: 'http://192.168.8.207:800'
        };

        return <WebView
            ref={(ref) => webRef = ref}
            source={source}
            style={this.style}
            scrollEnabled={true}
            overScrollMode={"always"}
            onMessage={onEvent}
            javaScriptEnabled={true}
        />
    }
}
