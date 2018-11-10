/* @flow */
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import { API_HOST, METHOD } from './constants';

export const getTimesByLocation = (latitude: number, longitude: number): object => {
  let today = new moment().format('DD-MM-YYYY');
  let queryLocation = {
    latitude,
    longitude,
    method: METHOD,
  };
  let url = `${API_HOST}timings/${today}?${qs.stringify(queryLocation)}`;
  console.log(url);
  return axios(url);
};
