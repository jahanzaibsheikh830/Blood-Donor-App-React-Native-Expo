import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function GetLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  function getLoc(){

      useEffect(() => {
          (async () => {
              let { status } = await Location.requestPermissionsAsync();
              if (status !== 'granted') {
                  setErrorMsg('Permission to access location was denied');
                  return;
                }
                
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            })();
  }, []);
}
  
  let text = 'Waiting..';
  if (errorMsg) {
      text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

  return (
    <View>
      <Text >{text}</Text>
    </View>
  );
}
