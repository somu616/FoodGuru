/**
 * Created by sumeetbhalla on 5/10/17.
 */
import React from 'react';
import {View,NetInfo,Alert,ScrollView,AsyncStorage, Platform, Text,ActivityIndicator,Dimensions,KeyboardAvoidingView, StyleSheet,TextInput,TouchableHighlight,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Store from '../util/store.js';
import Icon from 'react-native-vector-icons/FontAwesome';
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-checkbox';
var DeviceInfo = require('react-native-device-info');
const styles = StyleSheet.create({
    container: {
        flexGrow: 2,
        flexDirection:"column",
        overflow:'scroll',
        //height:h,
        //width:w,
        backgroundColor: "#188bce",
    },
    topImage: {
        flexGrow:0.9,
        flexDirection:"column",
        //flexGrow:0.7,
        padding:30,
        //backgroundColor:'orange',
        //borderRadius:20
        //marginBottom:100,

    },
    appLogo: {
        width: 220,
        height: 200,
        alignSelf:"center",
        marginTop:15,
        borderRadius:20,

    },
    loginFieldView: {
        flexGrow:0.6,
        //flexGrow:0.6,
        //marginTop:60,
        //backgroundColor:'green',
    },
    loginFields: {
        flexGrow:0.3,
        //fontFamily: 'Lato-Regular',
        fontSize: 20,
        height:50,
        color:"#ffffff",
        flexDirection:"column",
        marginLeft:20,
        marginRight:20,
        //top:200
        //backgroundColor:'green',
    },
    loginText: {
        fontFamily: 'Lato-Regular',
        fontSize:20,
        color:"#0B4F6C",
        textAlign:"center",
        //top:200
    },
    textInputView: {
        //fontFamily: 'Lato-Regular',
        height:40,
        borderBottomColor:"#ffffff",
        borderBottomWidth:1,
        marginLeft:15,
        marginRight:15,
        marginTop:20,
        flexDirection:'row',
        //top:h-350,
        //marginTop:160,
        //paddingBottom:20,
        //backgroundColor:'red',
    },
    loginButton: {
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        paddingLeft:50,
        paddingRight:50,
        paddingTop:12,
        paddingBottom:12,
        borderRadius:40,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        flexDirection:"column",
        //backgroundColor:'green',
        marginTop:20
    },
    loginText: {
        //fontFamily: 'Lato-Regular',
        fontSize:20,
        color:"#0B4F6C",
        textAlign:"center",
    },
    dummyView1: {
        //flexGrow:6,
        height:0,
        //backgroundColor:'yellow'
    },
});


export default class extends React.Component {

    constructor(props)
    { super(props);
        this.state =
            {
                username:"",
                password:"",
                isLoading:false,
                isChecked:false,
                isConnectedToInternet:true,
                hidePassword:true,
                //serverURL:"http://server.thousandpetalsbiometrics.com:6662"
                serverURL:"http://18.222.57.253"
            };
        console.disableYellowBox = true;
    }
    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnectedToInternet:isConnected,
        });
        //alert("connected state - "+isConnected);
    };

    componentDidMount() {
        const dispatchConnected = isConnected => this.props.dispatch(setIsConnected(isConnected));

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change',this._handleConnectivityChange );
        });
    }
    componentWillMount() {
        AsyncStorage.getItem("polyUsername", (err, result) => {
            if(result){
                //console.log("Username stored is:",result);
                this.setState(this.setState({username:result}));
            }
        });
        AsyncStorage.getItem("polyPassword", (err, result) => {
            if(result){
                //also check the remember me check box if values are saved
                this.state.isChecked = true;
                //console.log("Username stored is:",result);
                this.setState(this.setState({password:result}));

            }
        });
        AsyncStorage.getItem("polyServerUrl", (err, result) => {
            if(result){
                //console.log("Username stored is:",result);
                this.setState(this.setState({serverURL:result}));
            }
        });
    }
    successCallback(data) {
        this.setState({isLoading:false});
        Actions.homepage({"data":data});
    }
    failureCallback(that) {
        if(this.state.isConnectedToInternet) {
            Alert.alert(
                'Credentials Error !',
                'Wrong credentials. Please check and try again.!',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
            )
        }
        else {
            Alert.alert(
                'Connectivity Issue !',
                'No Internet Connectivity. Please Connect and Try Again.!',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
            )
        }

        this.setState({isLoading:false});
    }
    handleOfflineCase(isConnected) {
        //if(isConnected) {

        if ((this.state.username != "") && (this.state.password != "")) {
            this.setState({isLoading: true});
            //Store.validateLogin(this.state.username.toLowerCase(),this.state.password,this.state.serverURL,this.successCallback.bind(this), this.failureCallback.bind(this))
            //for demo... comment when on working
            this.successCallback("")
        }
        else {
            Alert.alert(
                'Credentials Error !',
                'Username or Password missing. Please enter proper credentials.',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
        //}
        /*else {
            Alert.alert(
                'No Internet',
                'No Internet Connectivity. Please try again later.',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }*/

    }
    loginUser() {

        //make the server login call here
        // add success and failura callback functions
        //inside success callback check if returned device are 1 then direct show the device info page else show the homepage

        /*NetInfo.isConnected.fetch().done(
            (isConnected) => { this.handleOfflineCase(isConnected); }
        );
*/
        this.handleOfflineCase(this.state.isConnected)
    }
    handleSaveCredentials(check) {
        this.setState({isChecked:!this.state.isChecked})
    }
    render() {
        var that = this;
        //if(this.state.isConnectedToInternet == false) {
        //    alert("No Internet Connectivity. Please Connect and Try Again.!")
        //}
        return(
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView  behavior='position'>
                    <Spinner visible={this.state.isLoading} textContent={"Logging In..."} textStyle={{color: '#FFF'}} />
                    <View style={styles.topImage}>
                        <Image source={require('../images/food_guru.png')} resizeMode='stretch' style={styles.appLogo}/>
                    </View>
                    <View style={styles.dummyView1}/>
                    <View style={styles.loginFieldView}>
                        <View style={styles.textInputView}>
                            <TextInput
                                keyboardType="email-address"
                                placeholder="Username"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                ref="username"
                                tintColor={"white"}
                                style={styles.loginFields}
                                underlineColorAndroid="transparent"
                                defaultValue={this.state.username}
                                returnKeyType="next"
                                selectionColor="white"
                                //onSubmitEditing={() =>  this.focusNextField('password')}
                                onChangeText={(username) => {this.state.username=username}}/>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={this.state.hidePassword}
                                ref="password"
                                tintColor={"white"}
                                style={styles.loginFields}
                                defaultValue={this.state.password}
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                underlineColorAndroid="transparent"
                                returnKeyType="go"
                                selectionColor="white"
                                //onSubmitEditing={() =>  this.saveCredentials()}
                                onChangeText={(password) => {this.state.password=password}}/>
                            <TouchableHighlight  style={{width:40}} underlayColor="transparent"
                                                 onPress={() => this.setState({hidePassword:!this.state.hidePassword})}>
                                <Icon name={this.state.hidePassword?"eye":'eye-slash'} size={20} color="black" />
                            </TouchableHighlight>
                        </View>
                    </View>

                    <CheckBox
                        label='Remember Me'
                        checked={that.state.isChecked}
                        underlayColor="transparent"
                        labelStyle={{color:'white',paddingLeft:20}}
                        checkboxStyle={{marginLeft:40,height:15,width:15}}
                        containerStyle={{fontColor:'white',color:'white',marginTop:20}}
                        onChange={that.handleSaveCredentials.bind(that)}
                    />

                    <TouchableHighlight style={styles.loginButton} underlayColor="#ffffff"
                                        onPress={() => this.loginUser()}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableHighlight>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}