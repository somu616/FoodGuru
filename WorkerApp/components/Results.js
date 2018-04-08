/**
 * Created by sumeetbhalla on 5/17/17.
 */
import React,{Component} from 'react';
import {View, Platform,CameraRoll,Linking, Text,NetInfo, ScrollView, StyleSheet,Dimensions,KeyboardAvoidingView, TextInput,TouchableHighlight,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Store from '../util/store.js';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
var Subscribable = require('Subscribable');
var w = Dimensions.get('window').width;
var reactMixin = require('react-mixin');
import Autocomplete from 'react-native-autocomplete-input';
// var dummyDishJson=[
//     {
//         "name":"Rajma Chawal",
//         "cuisine":"indian",
//         "imageUrl":"http://i349.photobucket.com/albums/q371/d-k-photos/rajma-chawal-recipe15.jpg"
//     },
//     {
//         "name":"Butter Chicken",
//         "cuisine":"indian",
//         "imageUrl":"http://www.ndtv.com/cooks/images/chicken.butter.masala%20%281%29.jpg"
//     },
//     {
//         "name":"Rajma Chawal",
//         "cuisine":"indian",
//         "imageUrl":"http://i349.photobucket.com/albums/q371/d-k-photos/rajma-chawal-recipe15.jpg"
//     }
// ]
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

class CameraGalleryImages extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
			currentImageNumber:this.props.index,
            isConnectedToInternet:true,
            selectedImage:null,
            //selectedDishes:dummyDishJson,
            query:'',
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
                <Text style={{fontSize:20,color:'white',textAlign:'center'}}>{data.name}</Text>
                <Image
                    source={{uri:data.imageUrl}}
                    style={{alignSelf:"center", alignItems:"center", justifyContent:"center",height:200,width:200,margin:10,borderRadius:10}}
                />
                <View style={{borderWidth:2,borderColor:'white',borderRadius:10,margin:5,padding:10}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Cuisine : </Text>
                        <Text style={{flex:0.5,backgroundColor:'transparent',textAlign:'center',alignSelf:"center", alignItems:"center", justifyContent:"center",color:'white',margin:10}}>{data.cuisine}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Relevance : </Text>
                        <Text style={{flex:0.5,alignSelf:"center", textAlign:'center',alignItems:"center", justifyContent:"center",color:'white',margin:10}}>{data.relevance}%</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,backgroundColor:'transparent',alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Spice Level : <Icon name='fire' size={15} color='red'/> <Icon name='fire' size={15} color='orange'/> <Icon name='fire' size={15} color='green'/></Text>
                        <Text style={{flex:0.5,alignSelf:"center", textAlign:'center',alignItems:"center", justifyContent:"center",color:'white',margin:10}}>
                            <Icon name='fire' size={20} color={data.spiceLevel.toUpperCase() == "LOW"?'green':data.spiceLevel.toUpperCase() == "MEDIUM"?'orange':'red'}/> {data.spiceLevel} </Text>

                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,backgroundColor:'transparent',alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Ingredients : </Text>
                        <View style={{flex:0.5,flexDirection:'column',backgroundColor:'transparent',borderWidth:3,borderColor:'white',borderRadius:25}}>
                        {
                            data.ingredients.map(function (item, index) {
                                return (
                                    <View style={{flexDirection:'row',backgroundColor:'transparent',alignSelf:"center", alignItems:"center", justifyContent:"center"}}>
                                        <View style={{}}>
                                         <Icon name={'circle'} size={6} color="white" />
                                        </View>
                                        <Text style={{alignSelf:"center", textAlign:'center',alignItems:"center", justifyContent:"center",color:'white',margin:5}}>{item}</Text>
                                    </View>
                                )})
                        }
                        </View>
                    </View>
                    <TouchableHighlight style={styles.loginButton} underlayColor="#ffffff"
                                        onPress={() => this.openInYelp()}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:20,color:'black'}}>Show in   </Text>
                            <Icon name={'yelp'} size={20} color="black" />
                        </View>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

reactMixin(CameraGalleryImages.prototype,Subscribable.Mixin);
module.exports = CameraGalleryImages;