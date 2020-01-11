import React, { Component } from 'react';
import { View } from 'react-native';
import Signature from 'react-native-signature-canvas';


export default class DrawingPad extends Component {
  render = () => {
    return (
      <View style={{ borderWidth: 4 }}>
        <Signature
          canvasProps={{ width: 256, height: 256 }}
        />
      </View>
    );
  };
}
