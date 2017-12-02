import React, { Component } from "react";
import { FlatList, Text, ActivityIndicator, View } from "react-native";
import TumblrPost from "./TumblrPost";

export default class TumblrList extends Component {
  render() {
    const props = this.props.screenProps;

    const { navigate } = this.props.navigation;

    return (
      <FlatList
        data={props.posts}
        keyExtractor={post => post.id}
        refreshing={props.loading}
        onEndReachedThreshold={0.05}
        onEndReached={props.loadMore}
        ListFooterComponent={() => (
          <View>
            <ActivityIndicator size="large" />
          </View>
        )}
        renderItem={postItem => {
          return (
            <TumblrPost
              {...postItem.item}
              loadProfile={() =>
                navigate("TumblrProfile", postItem.item)
              }
            />
          );
        }}
      />
    );
  }
}
