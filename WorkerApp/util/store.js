/**
 * Created by sumeetbhalla on 5/10/17.
 */
import React from 'react';
import 'react-native-polyfill';
//delete GLOBAL.XMLHttpRequest;
import {AppRegistry, NetInfo,Navigator, StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {Actions} from "react-native-router-flux";
//const fetch = require(fetch-base64);
//import ff from "fetch-base64"
var loginCredential={};
var selectedDevice;
var selectedImage;
//var selectedImagePath;
var deviceListJson=[];
var associatedDeviceList=[];
var eventsJson=[];
var labelsJson=[];
var FileUpload = require('NativeModules').FileUpload;

var pieURL = "http://10.2.19.170:3000";
class Store {
    getPieURL() {
        return pieURL;
    }
    setPieURL(url) {
        pieURL = url;
    }

    validateLogin(userName,password,serverURL,successcallback,failurecallback) {
        //make the server call and then if success call successcallback
        //successcallback(dummyDeviceJson);
        //for actual data
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
        var loginDetails={}
        loginDetails["userName"]=userName;
        loginDetails["passwd"]=password;
        //loginCredential=loginDetails
		this.setPieURL(serverURL);
        var obj = {method: 'POST',headers:myHeaders, body: JSON.stringify(loginDetails)}
        fetch(serverURL + "/login_user_validate", obj)
            .then((response) => response.json())
            .then((responseData) => {
                successcallback(responseData)
            })
            .catch((error) => {
                failurecallback(error);
            }).done();
    }

    getSimilarDishes(arr,successcallback,failurecallback) {
        var fullUrl="?dishes=";
        for(var x=0;x<arr.length-1;x++){
            fullUrl=fullUrl+arr[x].name+",";
        }
        fullUrl=fullUrl+arr[x].name;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
        var obj = {method: 'GET',headers:myHeaders}
        fetch(pieURL + "/getsimilar"+fullUrl, obj)
            .then((response) => response.text())
            .then((responseData) => {
                successcallback(responseData)
            })
            .catch((error) => {
                failurecallback();
            }).done();
    }
}
export default new Store();