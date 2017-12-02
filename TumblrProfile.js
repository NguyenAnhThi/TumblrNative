import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import HTMLView from "react-native-htmlview";

export default class TumblrProfile extends Component {
  render() {
    const props = this.props.navigation.state.params;

    const img = { uri: props.photos[0].original_size.url };

    return (
      <View>
        <Image source={img} style={{ width: 200, height: 300 }} />

        <View>
          <HTMLView value={props.caption} />
        </View>
      </View>
    );
  }
}
