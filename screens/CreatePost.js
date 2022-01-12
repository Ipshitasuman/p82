import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";
import * as Font from "expo-font";

let customFonts = {
  "AS": require("../assets/as.ttf"),
  "Cl": require("../assets/cl.ttf")
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
        let preview_images = {
            image_1: require("../assets/p1.jfif"),
            image_2: require("../assets/p2.jfif"),
            image_3: require("../assets/p3.jfif"),
            image_4: require("../assets/p4.jpeg"),
            image_5: require("../assets/p5.jpg")
          };
      return (
          <View style = {styles.container}>
            <SafeAreaView styles = {styles.dsa}/>
            <View style = {styles.appTitle}>
                <View style = {styles.appIcon}>
                    <Image source = {require("../assets/logo.png")}
                           style = {styles.iconImage}></Image>

                </View>
                <View style = {styles.appTitleTextContainer}>
                    <Text style = {styles.appTitileText}>New Post</Text>
                </View>
            </View>
            <View style = {styles.fieldsContainer}>
                <ScrollView>
                    <Image
                     source = {preview_images[this.state.previewImage]}
                     style = {styles.PreviewImage}></Image>

                <View style = {{height:RFValue(this.state.dropdownHeight)}}>
                    <DropDownPicker
                     items = {[
                        { label: "Image 1", value: "image_1" },
                        { label: "Image 2", value: "image_2" },
                        { label: "Image 3", value: "image_3" },
                        { label: "Image 4", value: "image_4" },
                        { label: "Image 5", value: "image_5" }
                     ]}
                     defaultValue = {this.state.previewImage}
                     containerStyle = {{
                         height : 40,
                         borderRadius : 20,
                         marginBottom : 10
                     }}
                     onOpen = {()=>{
                         this.setState({dropdownHeight : 170});
                     }}
                     onClose = {()=>{
                        this.setState({dropdownHeight : 40});
                    }}
                    style = {{backgroundColour : "transparent"}}
                    itemStyle = {{
                        justifyContent : "flex-start"
                    }}
                    dropdownStyle = {{backgroundColour : "#2a2a2a"}}
                    labelStyle = {{colour : "white"}}
                    arrowStyle = {{colour : "white"}}
                    onChangeItem = {item =>
                    thissetState({
                        previewImage : itemValue
                    })}/>
                </View>
                <TextInput style = {styles.inputFont}
                onChangeText = {caption => this.setState({caption})}
                placeholder = {"Caption"}
                placeholderTextColor = "white"/>
                </ScrollView>
            </View>
            <View style = {{flex : 0.08}} />
              </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    dsa: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Cl"
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "as"
    }
  });
  