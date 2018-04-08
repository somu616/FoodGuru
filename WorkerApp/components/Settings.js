/**
 * Created by sumeetbhalla on 5/17/17.
 */
import React,{Component} from 'react';
import {View, Platform,CameraRoll,Linking, Text,NetInfo, ScrollView, StyleSheet,Dimensions,KeyboardAvoidingView, TextInput,TouchableHighlight,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import CheckBox from 'react-native-checkbox';
import Store from '../util/store.js';
//import CameraRollPicker from 'react-native-camera-roll-picker';
//import Icon from 'react-native-vector-icons/FontAwesome';
var Subscribable = require('Subscribable');
var w = Dimensions.get('window').width;
var reactMixin = require('react-mixin');
//import Autocomplete from 'react-native-autocomplete-input';
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: 65,
        backgroundColor: "#188bce",
        overflow: "hidden",
        //width:w-10
    },
    loginButton: {
        //flex:0.1,
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
    autocompleteContainer: {
        flex: 0.5,
        left: 30,
        position: 'absolute',
        right: 10,
        top: 40,
        marginBottom:40,
        zIndex: 1
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
});

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
			currentImageNumber:this.props.index,
            isConnectedToInternet:true,
            selectedImage:null,
        };
        this.currentDishInfo=null;
        console.disableYellowBox = true;
    }
    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnectedToInternet:isConnected,
        });
        //alert("connected state - "+isConnected);
    };

    componentDidMount() {
        this.addListenerOn(this.props.events,'imageSelected', this.sendImageToCaptionPage.bind(this,this));
        const dispatchConnected = isConnected => this.props.dispatch(setIsConnected(isConnected));

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change',this._handleConnectivityChange );
        });
    }
	changeNavBarTitle(idle)
	{
		//Action.refresh({"title":})
	}
    getSelectedImages(list) {
        console.log("selected image list")
        if(list.length>0)
            this.state.selectedImage=list[0];
        else
            this.state.selectedImage=null;
        //save this data somewhere so that we can save it in store and retrieve it in image             file.
    }
    sendImageToCaptionPage() {
        Actions.imageCaption({"imagePath":this.state.selectedImage.uri});
    }
    succsessfullCallback(data){
        this.currentDishInfo=data;
    }
    failureCallback(){

    }
    succsessfullCallback2(data){
        Actions.imageCaption({"data":data});
    }
    openInYelp(){
        //dishName = "Dosa";
        var dish = this.props.data.name.replace(' ','+');
        var url = "https://www.yelp.com/search?find_desc="+dish+"&find_loc=Tempe%2C+AZ&ns=1";
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        var that = this;
        var data = this.props.data;

        return(
            <ScrollView style={{flex:1,marginTop:65,backgroundColor:"#188bce"}}>
            <KeyboardAvoidingView>
                <Text style={{fontSize:20,color:'white',textAlign:'center'}}>Please mention any Dietry Restrictions</Text>
                    <CheckBox
                        label='Peanut Allergy'
                        checked={that.state.isChecked}
                        underlayColor="transparent"
                        labelStyle={{color:'white',paddingLeft:20}}
                        checkboxStyle={{marginLeft:40,height:15,width:15}}
                        containerStyle={{fontColor:'white',color:'white',marginTop:20}}
                        //onChange={that.handleSaveCredentials.bind(that)}
                    />
                <CheckBox
                    label='Gluten Allergy'
                    checked={that.state.isChecked}
                    underlayColor="transparent"
                    labelStyle={{color:'white',paddingLeft:20}}
                    checkboxStyle={{marginLeft:40,height:15,width:15}}
                    containerStyle={{fontColor:'white',color:'white',marginTop:20}}
                    //onChange={that.handleSaveCredentials.bind(that)}
                />
                <CheckBox
                    label='Vegan'
                    checked={that.state.isChecked}
                    underlayColor="transparent"
                    labelStyle={{color:'white',paddingLeft:20}}
                    checkboxStyle={{marginLeft:40,height:15,width:15}}
                    containerStyle={{fontColor:'white',color:'white',marginTop:20}}
                    //onChange={that.handleSaveCredentials.bind(that)}
                />
                <CheckBox
                    label='Vegetarian'
                    checked={that.state.isChecked}
                    underlayColor="transparent"
                    labelStyle={{color:'white',paddingLeft:20}}
                    checkboxStyle={{marginLeft:40,height:15,width:15}}
                    containerStyle={{fontColor:'white',color:'white',marginTop:20}}
                    //onChange={that.handleSaveCredentials.bind(that)}
                />
            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

reactMixin(Settings.prototype,Subscribable.Mixin);
module.exports = Settings;