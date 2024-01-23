import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import CheckBox from '../checkbox/Checkbox';

type TodoCardProp = {
  id: number;
  title: string;
  description: string;
  isChecked: boolean;
  handleTodoChange: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
};

const Todo = ({
  isChecked,
  title,
  description,
  id,
  handleTodoChange,
  handleDeleteTodo,
}: TodoCardProp) => {
  return (
    <View style={styles.todoWrapper}>
      <View style={styles.todoCard}>
        <CheckBox
          isChecked={isChecked}
          onPress={() => handleTodoChange(id)}
          title={title}
        />
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>Description: </Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      {isChecked && (
        <Pressable onPress={() => handleDeleteTodo(id)}>

          <Image
            source={require('../../assets/images/delete.png')}
            style={styles.deleteImg}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F1E4C3',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#C6A969',
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 15,
  },
  todoCard: {
    flex: 1 
    // width: '90%',
  },
  deleteImg: {
    width: 40,
    height: 40,
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descriptionTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 6,
  },
  descriptionText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default Todo;
