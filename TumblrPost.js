import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from "react-native";

export default class TumblrPost extends Component {
  render() {
    console.log(this.props);
    const img = { uri: this.props.photos[0].original_size.url };
    return (
      <TouchableHighlight onPress={this.props.loadProfile}>
        <View style={styles.container}>
          <Text>{this.props.caption}</Text>
          <Image source={img} style={{ width: 200, height: 300 }} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
