/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';
import { getTimesByLocation } from './api';
import { BG_SUBUH, BG_DZUHUR, BG_ASHAR, BG_MAGHRIB, BG_ISYA } from './constants';

const { width, height } = Dimensions.get('window');

type Props = {};
type State = {
  degree: number,
};
export default class App extends Component<Props, State> {
  state = {
    degree: 0,
    date: new Date(),
    shalat: null,
  };

  componentDidMount = async () => {
    const shalat = await getTimesByLocation(-6.21462, 106.84513);
    this.setState({ shalat });
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 60000);
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

  clockToDate = (clock: string) => {
    let date = new Date();
    let time = clock.split(new RegExp(':'));
    date.setHours(time[0], time[1], 0);
    return date;
  };

  getSalahStatus = () => {
    const { date, shalat } = this.state;
    const { timings } = shalat.data.data;
    console.log(date, this.clockToDate(timings.Fajr));
    if (date < this.clockToDate(timings.Fajr)) {
      return 'subuh';
    } else if (date > this.clockToDate(timings.Fajr) && date < this.clockToDate(timings.Dhuhr)) {
      return 'dzuhur';
    } else if (date > this.clockToDate(timings.Dhuhr) && date < this.clockToDate(timings.Asr)) {
      return 'ashar';
    } else if (date > this.clockToDate(timings.Asr) && date < this.clockToDate(timings.Maghrib)) {
      return 'maghrib';
    } else if (date > this.clockToDate(timings.Maghrib) && date < this.clockToDate(timings.Isha)) {
      return 'isya';
    }
  };

  render() {
    const { degree, shalat } = this.state;
    const timeInfo = `Menuju waktu ${shalat && this.getSalahStatus()}`;
    return (
      <React.Fragment>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
          showHideTransition={'fade'}
        />
        {shalat && (
          <Image
            source={
              this.getSalahStatus() === 'subuh'
                ? BG_SUBUH
                : this.getSalahStatus() === 'dzuhur'
                  ? BG_DZUHUR
                  : this.getSalahStatus() === 'ashar'
                    ? BG_ASHAR
                    : this.getSalahStatus() === 'maghrib'
                      ? BG_MAGHRIB
                      : BG_ISYA
            }
            style={styles.backgroundImage}
          />
        )}
        <View style={styles.container}>
          <Image
            source={require('../assets/images/qibla.png')}
            style={{
              height: width - 200,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain',
              transform: [{ rotate: 270 - degree + 'deg' }],
            }}
          />
          <Text style={styles.welcome}>{timeInfo}</Text>
          <Text style={styles.welcome}>{this.getDirection(degree)}</Text>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
    resizeMode: 'stretch', // or 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 28,
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
