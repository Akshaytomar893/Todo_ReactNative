import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CheckBox = props => {
  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress}>
        {props.isChecked ? (
          <Image
            source={require('../../assets/images/checked.png')}
            style={styles.checkBox}
          />
        ) : (
          <Image
            source={require('../../assets/images/unchecked.png')}
            style={styles.checkBox}
          />
        )}
      </Pressable>
      <Text style={[styles.title, props.isChecked && styles.strinkeThrough]}>
        {props.title}
      </Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    color: '#000',
    marginLeft: 6,
    fontWeight: '700',
  },
  checkBox: {
    width: 25,
    height: 25,
  },
  strinkeThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
});
