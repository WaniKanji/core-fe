import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignaturePad from 'react-signature-canvas';


const DrawingPad = () => {
  const canvasRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState('Nothing Yet');

  const saveImage = () => {
    const canvasData = canvasRef.current.toDataURL();
    // Refactor this post
    var xhr = new XMLHttpRequest();
    const sendData = JSON.stringify({ imageData: canvasData });
    const url = 'https://wanikanji-core-api.herokuapp.com/api/lesson/recognize/';
    xhr.onreadystatechange = function(err) {
      if (xhr.readyState == 4 && xhr.status == 200){
        setRecognizedText(xhr.responseText.replace(/['"]+/g, ''));
      } else {
        console.log(err);
      }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(sendData);
  }

  return (
    <>
      <View style={styles.canvasContainer}>
        <SignaturePad
          ref={canvasRef}
          canvasProps={{ width: 256, height: 256 }}
        />
      </View>
      <TouchableOpacity onPress={saveImage}>
        <View style={styles.buttonContainer}>
          <Text>Recognize</Text>
        </View>
      </TouchableOpacity>
      <Text>{`Recognized text: ${recognizedText}`}</Text>
    </>
  );
}

export default DrawingPad;

const styles = StyleSheet.create({
  canvasContainer: {
    borderWidth: 4,
  },
  buttonContainer: {
    minWidth: 80,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'gray',
    marginTop: 12,
  },
});
