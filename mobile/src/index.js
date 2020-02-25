import 'react-native-gesture-handler';
import React from 'react';
import {YellowBox} from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'Unhandled Promise',
  'Failed prop type',
]);

export default function App() {
  return <Routes />;
}
