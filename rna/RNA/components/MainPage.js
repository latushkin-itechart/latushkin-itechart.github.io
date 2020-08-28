import React from 'react';

import {ScrollView, View, Text} from 'react-native'
import WebApp from "./WebApp";

module.exports = () => {

    return (
        <ScrollView>
            <View>
                <WebApp />
            </View>
        </ScrollView>
    )

}