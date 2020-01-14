import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DrawingPad from 'components/DrawingPad';

export default function App() {
  return (
    <View style={styles.container}>
      <DrawingPad />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});