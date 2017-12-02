import React from "react";
import { StyleSheet, Text, View } from "react-native";

import TumblrList from "./TumblrList";
import TumblrProfile from "./TumblrProfile";

import { StackNavigator } from "react-navigation";

const apiUrl = "https://api.tumblr.com/v2/blog/natctvn.tumblr.com/posts/photo";
const apiKey = "w3Hs0GrfF9BYxAJquszoSsd597mHoyTzcFtNnlFTrBBIqRxQgG";

const Routes = StackNavigator({
  TumblrList: { screen: TumblrList },
  TumblrProfile: {
    screen: TumblrProfile,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.summary}`
    })
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      posts: [],
      loading: false,
      page: 0
    };
  }

  componentWillMount(props) {
    this.fetchWithPage(0);
  }

  fetchWithPage(page) {
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(`${apiUrl}?api_key=${apiKey}&limit=4&offset=${page * 4}`)
          .then(data => data.json())
          .then(json => {
            return new Promise(function(resolve, reject) {
              setTimeout(function() {
                resolve(json);
              }, 100);
            });
          })
          .then(json => {
            this.setState({
              posts: this.state.posts.concat(json.response.posts),
              loading: false
            });
          });
      }
    );
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState(
      {
        page: newPage
      },
      () => {
        this.fetchWithPage(newPage);
      }
    );
  }

  render() {
    return (
      <Routes
        screenProps={{
          posts: this.state.posts,
          loadMore: this.loadMore,
          loading: this.state.loading
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
