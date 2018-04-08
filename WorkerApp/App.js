/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    TouchableHighlight
} from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Actions} from 'react-native-router-flux';
import Login from './components/Login';
import CameraImageGallery from './components/CameraGalleryImages';
import ImageCaption from './components/ImageCaption';
import Details from './components/Results';
import Settings from './components/Settings';
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');
import Store from './util/store.js';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        return defaultReducer(state, action);
    }
};

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.eventEmitter = new EventEmitter();
    }
    sendImageToCaptionPage() {
        //Actions.imageCaption();
        this.eventEmitter.emit("imageSelected");
    }
    showSubmitButton() {
        return(
            <TouchableHighlight underlayColor="#ffffff" style={{paddingRight:10}} onPress={this.sendImageToCaptionPage.bind(this)}>
                <Text style={{fontColor:'gray'}}>SUBMIT</Text>
            </TouchableHighlight>
        )
    }
  render() {
        var that=this;
    return (
        <Router createReducer={reducerCreate}>
            <Scene key="loginModal" component={Login} hideNavBar={true} />
            <Scene key="homepage" /*initial={true} */ hideNavBar={false} title="Homepage" navigationBarStyle={{height:65}} titleStyle={{color:'black',textAlign:'left',marginLeft:70,fontWeight:'bold'}} events={that.eventEmitter} component={CameraImageGallery}/>
            <Scene key="results" /*initial={true}*/  hideNavBar={false} title="Results" navigationBarStyle={{height:65}} titleStyle={{color:'black',textAlign:'left',marginLeft:70,fontWeight:'bold'}} events={that.eventEmitter} component={ImageCaption}/>
            <Scene key="details" /*initial={true}*/  hideNavBar={false} title="Details" navigationBarStyle={{height:65}} titleStyle={{color:'black',textAlign:'left',marginLeft:70,fontWeight:'bold'}} events={that.eventEmitter} component={Details}/>
            <Scene key="settings" /*initial={true}*/  hideNavBar={false} title="Settings" navigationBarStyle={{height:65}} titleStyle={{color:'black',textAlign:'left',marginLeft:70,fontWeight:'bold'}} events={that.eventEmitter} component={Settings}/>
        </Router>
    );
  }
}

