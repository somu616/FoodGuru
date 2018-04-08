/**
 * Created by sumeetbhalla on 5/17/17.
 */
import React,{Component} from 'react';
import {View, Platform,CameraRoll, Text,NetInfo, ScrollView, StyleSheet,Dimensions,KeyboardAvoidingView, TextInput,TouchableHighlight,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Store from '../util/store.js';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
var Subscribable = require('Subscribable');
var w = Dimensions.get('window').width;
var reactMixin = require('react-mixin');
import Autosuggest from 'react-autosuggest';
//import Autocomplete from 'react-native-autocomplete-input';
import AutoComplete from "react-native-autocomplete";

var dummyDishJson=[
    {
        "name":"Biriyani",
        "cuisine":"Indian",
        "imageUrl":"https://www.patnadaily.com/images/stories/recipes/cropped-hyderabadi_biryani.jpg",
        "ingredients":["Rice","Chicken","Spices","Vegetables","Egg","Yoghurt","Dried Fruits"],
        "spiceLevel":"High",
        "relevance":"100"
    },
    {
        "name":"Mexican Pulao",
        "cuisine":"Mexican",
        "imageUrl":"https://s-media-cache-ak0.pinimg.com/originals/43/3b/01/433b01b0b2dd00d5137844940bb39d12.jpg",
        "ingredients":["Rice","Beans","Onions","Salt","Cumin","Chicken Stock","Tomato","Gravy"],
        "spiceLevel":"Medium",
        "relevance":"90"
    },
    {
        "name":"Fried Rice",
        "cuisine":"Chinese",
        "imageUrl":"https://www.seriouseats.com/recipes/images/2016/01/20160206-fried-rice-food-lab-68-1500x1125.jpg",
        "ingredients":["Rice","Tomato","onion","peas","carrots","soy sauce","eggs"],
        "spiceLevel":"Medium",
        "relevance":"80"
    },
    {
        "name":"Rice Bowl",
        "cuisine":"Mexican",
        "imageUrl":"https://nothymetowastedotorg.files.wordpress.com/2016/04/rice_bowl.jpg?w=1400",
        "ingredients":["Chicken","Butter","Tomato","Asparagus","Egg","Beans","Cilantro"],
        "spiceLevel":"Low",
        "relevance":"60"
    },

];
var dummyDishJson2=[
    {
        "name":"Fish Curry",
        "cuisine":"Indian",
        "imageUrl":"http://ksmartstatic.sify.com/cmf-1.0.0/appflow/bawarchi.com/Image/oesuvGbgdfaah_bigger.jpg",
        "ingredients":["Fish","Beans","Tomato","Oil","Onion","Garlic","Clove"],
        "spiceLevel":"Medium",
        "relevance":"100"
    },
    {
        "name":"Sushi",
        "cuisine":"Japanese",
        "imageUrl":"https://img.grouponcdn.com/deal/hfefAup1zQWBE2K8sWURgS27xax/hf-846x508/v1/c700x420.jpg",
        "ingredients":["Fish","Nori","Soy Sauce","Vinegar","Ginger","Salmon","Tuna"],
        "spiceLevel":"Low",
        "relevance":"60"
    },
    {
        "name":"Fried Fish",
        "cuisine":"American",
        "imageUrl":"http://assets.kraftfoods.com/recipe_images/opendeploy/Crispy-Oven-Fried-Fish-58450B_640x428.jpg",
        "ingredients":["Fish","Eggs","Bread Crumbs","Lemon","Pepper","Oil"],
        "spiceLevel":"Medium",
        "relevance":"50"
    },
    {
        "name":"Fish and Chips",
        "cuisine":"American",
        "imageUrl":"https://www.wikihow.com/images/8/82/Make-Fish-and-Chips-Step-14.jpg",
        "ingredients":["Fish","Potato","Canola Oil","Mayonnaise"],
        "spiceLevel":"Low",
        "relevance":"40"
    },
];
var dummyDishJson3=[
    {
        "name":"Chutney",
        "cuisine":"Indian",
        "imageUrl":"http://www.ndtv.com/cooks/images/tomato%20chutney-620.jpg",
        "ingredients":["Tomato","Salt","Coriander","Tamarind","Ginger","Chili"],
        "spiceLevel":"Medium",
        "relevance":"100"
    },
    {
        "name":"Hummus",
        "cuisine":"Indian",
        "imageUrl":"https://assets.epicurious.com/photos/56fd46c2b62bcdaf17f428dd/master/pass/EP_03292016_NRR_Hummus_inset3.jpg",
        "ingredients":["Chickpea","Tahini","Salt","Oil","Cumin"],
        "spiceLevel":"High",
        "relevance":"80"
    },
    {
        "name":"Guacamole",
        "cuisine":"Indian",
        "imageUrl":"http://mexicanfoodjournal.com/wp-content/uploads/2016/10/Creamy-Avocado-Salsa.jpg",
        "ingredients":["Avocado","Salt","Lime","Onion","Pepper"],
        "spiceLevel":"Medium",
        "relevance":"70"
    },
    {
        "name":"Salsa",
        "cuisine":"Mexican",
        "imageUrl":"https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/59/63/5/S3ImJ4QS46kXJfNRnKF9-Chlili-s-Salsa---59635-1.JPG",
        "ingredients":["Onion","Lemon","Tomato","Salt","Chili"],
        "spiceLevel":"Low",
        "relevance":"60"
    }
];
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: 65,
        backgroundColor: "#188bce",
        overflow: "hidden",
        //width:w-10
    },
    autocomplete: {
        alignSelf: "stretch",
        height: 50,
        margin: 10,
        marginTop: 50,
        backgroundColor: "#FFF",
        borderColor: "lightblue",
        borderWidth: 1
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: "lightblue",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    cellText: {
        flex: 1,
        marginLeft: 10
    },
    image: {
        width: 20,
        height: 20,
        marginLeft: 10
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
            selectedDishes:[],
            query:'',
            foodName:''
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
        Actions.results({"data":dummyDishJson});
    }
    handleDishEntry(name) {
        //To Test Demo ... comment later
        this.setState({foodName:name});
        for(var x=0;x<dummyDishJson.length;x++){
            if(name.toUpperCase() == dummyDishJson[x].name.toUpperCase()){
                this.currentDishInfo = dummyDishJson[x];
                this.setState({foodName:""});
                break;
            }
        }
        for(var x=0;x<dummyDishJson2.length;x++){
                if(name.toUpperCase() == dummyDishJson2[x].name.toUpperCase()){
                    this.currentDishInfo = dummyDishJson2[x];
                    this.setState({foodName:""});
                    break;
                }
        }
        for(var x=0;x<dummyDishJson3.length;x++){
                if(name.toUpperCase() == dummyDishJson3[x].name.toUpperCase()){
                    this.currentDishInfo = dummyDishJson3[x];
                    this.setState({foodName:""});
                    break;
                }
        }


        //Store.getDishDetials(name,this.succsessfullCallback.bind(this),this.failureCallback.bind(this));
        var arr = this.state.selectedDishes;
        if(this.currentDishInfo != null) {
            arr.push(this.currentDishInfo);
            this.setState({selectedDishes: arr});
        }
        this.currentDishInfo=null;
    }
    submitData() {
        //Store.getSimilarDishes(this.state.selectedDishes,this.succsessfullCallback2.bind(this),this.failureCallback.bind(this))
        if(this.state.selectedDishes[0].name.toUpperCase() == "BIRIYANI")
            Actions.results({"data":dummyDishJson});
        else if(this.state.selectedDishes[0].name.toUpperCase() == "FISH CURRY")
            Actions.results({"data":dummyDishJson2});
        else
            Actions.results({"data":dummyDishJson3});
    }
    deleteDish(index) {
        console.log(index);
        // var name = obj.name;
        // for(var i=0;i<this.state.selectedDishes.length;i++) {
        //     if(this.state.selectedDishes[i] == name){
                this.state.selectedDishes.splice(index,1)
                this.setState({selectedDishes:this.state.selectedDishes});
        //        break;
        //     }
        // }
    }
    openSettings() {
        Actions.settings();
    }
    getSuggestionValue() {

    }
    render() {
        var that = this;
        var dishesArr=[];
        if(this.state.selectedDishes == null){
            dishesArr=null;
        }
        else {
            dishesArr=this.state.selectedDishes.map(function (item, index) {
                var urlPath = item.imageUrl;
                var name = item.name;
                return (
                    <View style={{backgroundColor:'transparent',height:250}}>
                        <Image
                            source={{uri:urlPath}}
                            style={{height:200,width:200,margin:10,borderRadius:10}}
                        />
                        <Text style={{fontSize:20,color:'white',textAlign:'center'}}>{item.name}</Text>
                        <TouchableHighlight style={{position:'absolute',left:180,top:15}} onPress={()=>that.deleteDish(index)}>
                            <Icon name="times-circle" size={25} color="black" />
                        </TouchableHighlight>

                    </View>
                )
            });
        }
        return(
            <View style={{flex:1,marginTop:65,backgroundColor:"#188bce"}}>
            <KeyboardAvoidingView>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:0.9,fontSize:20,fontWeight:'bold',margin:10}}>Select dishes that you like</Text>
                    <TouchableHighlight style={{flex:0.1,marginRight:20,backgroundColor:'white',borderRadius:10,alignSelf:"center", alignItems:"center", justifyContent:"center",padding:5}} underlayColor="#ffffff" onPress={() => this.openSettings()}>
                        <Icon name={'cogs'} size={25} color="black" />
                    </TouchableHighlight>
                </View>
                <TextInput
                    style={{backgroundColor:"white",margin:10,borderRadius:10}}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Dish Name"
                    value = {this.state.foodName}
                    onChangeText={(dishName) => {that.handleDishEntry(dishName)}}
                />
                <View style={{backgroundColor:'white',height:40,zIndex:10,position:'absolute',top:60,left:100}}>
                </View>

                <ScrollView horizontal="true" style={{marginTop:10,backgroundColor:'transparent'}}>
                {
                    dishesArr
                }
                </ScrollView>
                <TouchableHighlight style={styles.loginButton} underlayColor="#ffffff"
                                    onPress={() => this.submitData()}>
                    <Text style={styles.loginText}>SUBMIT</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            </View>
        );
    }
}

reactMixin(CameraGalleryImages.prototype,Subscribable.Mixin);
module.exports = CameraGalleryImages;