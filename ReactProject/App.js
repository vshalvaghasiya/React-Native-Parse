/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { AsyncStorage } from 'react-native';
import Parse from 'parse/react-native';

export default class App extends Component {

  componentDidMount() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("WAKZzbKAkOgVdO86ttzuoi549JlJXC87ZOhhEtmH", "3g17iy7ZNwkpxsmQVauPDrKjby5RoIzam2FH3H3u"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'
  }

  insertData() {
    const SoccerPlayers = Parse.Object.extend("SoccerPlayers");
    const soccerPlayers = new SoccerPlayers();

    soccerPlayers.set("playerName", "A. Wed");
    soccerPlayers.set("yearOfBirth", 1997);
    soccerPlayers.set("emailContact", "a.wed@email.io");
    soccerPlayers.set("attributes", ["fast", "good conditioning"])

    soccerPlayers.save()
      .then((player) => {
        // Success
        alert('New object created with objectId: ' + player.id);
      }, (error) => {
        // Save fails
        alert('Failed to create new object, with error code: ' + error.message);
      });
  }

  GetData() {
    const SoccerPlayers = Parse.Object.extend('SoccerPlayers');
    const query = new Parse.Query(SoccerPlayers);
    query.find().then((results) => {
      results.forEach((result) => {
        const myCustomKey1Name = result.get('playerName');
        const myCustomKey2Name = result.get('yearOfBirth');
        console.log(myCustomKey1Name, myCustomKey2Name);
      })
    }, (error) => {
      console.error(error);
    });
  }

  UpdateData() {
    const SoccerPlayers = Parse.Object.extend('SoccerPlayers');
    const query = new Parse.Query(SoccerPlayers);
    // here you put the objectId that you want to update
    query.get('WuSHOzNzBz').then((object) => {
      object.set('yearOfBirth', 1998);
      object.save().then((response) => {
        console.log(response);
      })
    }, (error) => {
      console.error(error);
    });
  }

  DeleteData() {
    const SoccerPlayers = Parse.Object.extend('SoccerPlayers');
    const query = new Parse.Query(SoccerPlayers);
    // here you put the objectId that you want to delete
    query.get('WuSHOzNzBz').then((object) => {
      object.destroy().then((response) => {
        console.log(response);
      })
    }, (error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.insertData.bind(this)}>Insert Data</Text>
        <Text style={styles.welcome} onPress={this.GetData.bind(this)}>Get Data</Text>
        <Text style={styles.welcome} onPress={this.UpdateData.bind(this)}>Update Data</Text>
        <Text style={styles.welcome} onPress={this.DeleteData.bind(this)}>Delete Data</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
