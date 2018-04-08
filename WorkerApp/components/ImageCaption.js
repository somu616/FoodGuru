/**
 * Created by sumeetbhalla on 5/17/17.
 */
import React,{Component} from 'react';
import {View, Platform,KeyboardAvoidingView,CameraRoll, Alert, Text,NetInfo, ScrollView, StyleSheet,Dimensions, TextInput,TouchableHighlight,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Store from '../util/store.js';
import Icon from 'react-native-vector-icons/FontAwesome';
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        //flexGrow: 1,
        flex:1,
        marginTop: 65,
        backgroundColor: "#188bce",
        overflow: "hidden",
        flexDirection:'column',
        overflow:'scroll'
        //width:w-10
    },
    captionField: {
        flex:0.4,
        height:150,
        fontSize: 20,
        marginTop:20,
        color:"black",
        marginLeft:20,
        marginRight:20,
        borderRadius:15,
        backgroundColor:'white',
    },
});

export default class extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
			currentImageNumber:this.props.index,
            isConnectedToInternet:true,
            captionText:""

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
	changeNavBarTitle(idle)
	{
		//Action.refresh({"title":})
	}
    getSelectedImages(list) {
        console.log("selected image list")
        this.state.selectedImage=list[0];
    }
    successCallback() {
         Alert.alert(
                        'Success !',
                        'Image uploaded successfully!',
                        [
                            {text: 'OK', onPress: () => Actions.pop(), style: 'cancel'},
                        ],
                        { cancelable: false }
                    )
    }
    failureCallback() {
        if(this.state.isConnectedToInternet) {
            Alert.alert(
                'Error !',
                'Unable to upload image. Please try again in some time!',
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
    }
    submitPhotoWithCaption() {
        Store.uploadImage(this.props.imagePath,this.state.captionText,this.successCallback.bind(this),this.failureCallback.bind(this))
    }
    showDetails (index) {
        Actions.details({"data":this.props.data[index]});
    }
    render() {
        var that = this;
        var data = this.props.data;
        return(
            <ScrollView style={styles.container}>
                {
                    this.props.data.map(function (item, index) {
                        var urlPath = item.imageUrl;
                        console.log(index);
                        return (
                            <TouchableHighlight   underlayColor="transparent"
                                                 onPress={() => that.showDetails(index)}>
                            <View style={{flexDirection:'row',borderWidth:2,borderRadius:10,borderColor:'white',margin:3}}>
                                <View style={{flex:0.5,flexDirection:'column',backgroundColor:'transparent'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Name : </Text>
                                        <Text style={{alignSelf:"center", alignItems:"center", justifyContent:"center",color:'white',margin:10}}>{item.name}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Cuisine : </Text>
                                        <Text style={{alignSelf:"center", alignItems:"center", justifyContent:"center",color:'white',margin:10}}>{item.cuisine}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{alignSelf:"center", alignItems:"center", justifyContent:"center",fontSize:20,color:'white',margin:5}}>Relevance : </Text>
                                        <Text style={{alignSelf:"center", alignItems:"center", justifyContent:"center",color:'white',margin:10}}>{item.relevance}%</Text>
                                    </View>
                                </View>
                                <Image
                                    style={{flex:0.3,backgroundColor:'transparent',alignSelf:"center", alignItems:"center", justifyContent:"center",height:100,width:100,margin:10,borderRadius:10}}
                                    source={{uri:urlPath}}
                                />
                                <View style={{flex:0.1,alignSelf:"center", alignItems:"center", justifyContent:"center",backgroundColor:'transparent'}}>
                                    <Icon name='chevron-right' size={50} color="white" />
                                </View>
                            </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        );
    }
}
