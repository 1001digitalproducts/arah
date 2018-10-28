/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';

const { width } = Dimensions.get('window');
const qibla = 295;

type Props = {};
type State = {
  degree: number,
};
export default class App extends Component<Props, State> {
  state = {
    degree: 0,
  };

  componentDidMount = () => {
    RNSimpleCompass.start(1, degree => {
      this.setState({ degree });
    });
  };

  getDirection = degree => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    } else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    } else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    } else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    } else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    } else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    } else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    } else {
      return 'N';
    }
  };

  render() {
    const { degree } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Qibla is {295}º</Text>
        <Text style={styles.welcome}>{this.getDirection(degree)}</Text>
        <Image
          source={require('../assets/images/compass_bg.png')}
          style={{
            height: width - 80,
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'contain',
            transform: [{ rotate: 270 - degree + 'deg' }],
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
