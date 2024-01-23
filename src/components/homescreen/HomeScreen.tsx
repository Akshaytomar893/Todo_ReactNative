import React, {useEffect, useState} from 'react';
import {myTodoList} from '../../mockdata/mockdata';
import Todo from '../todoCard/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AddTodoModal from '../addTodo/AddTodoModal';

const HomeScreen = () => {
  const [myTodos, setmyTodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false);

  useEffect(() => {
    const loadMyTodos = async () => {
      try {
        const storedMyTodos = await AsyncStorage.getItem('myTodos');
        if (storedMyTodos) {
          setmyTodos(JSON.parse(storedMyTodos));
        }
      } catch (error) {
        console.error('Error loading myTodos from AsyncStorage:', error);
      }
    };

    loadMyTodos();
  }, []);

  useEffect(() => {
    const saveMyTodos = async () => {
      try {
        await AsyncStorage.setItem('myTodos', JSON.stringify(myTodos));
      } catch (error) {
        console.error('Error saving myTodos to AsyncStorage:', error);
      }
    };

    saveMyTodos();
  }, [myTodos]);

  const handleTodoCheckClick = (id: number) => {
    const todoToUpdate = myTodos.find(todo => todo.id === id);
    if (todoToUpdate) {
      todoToUpdate.completed = !todoToUpdate.completed;
    }
    setmyTodos([...myTodos]);
  };
  const addTodoFunction = (title: string, desc: string) => {
    const newTodo = {
      id: myTodoList.reduce((max, item) => (item.id > max ? item.id : max), 0),
      title: title,
      description: desc,
      completed: false,
    };
    setmyTodos([...myTodos, newTodo]);
    setAddTodo(false);
  };
  const handleCloseModal = () => {
    setAddTodo(false);
  };
  const deleteTodoFunction = (id: number) => {
    const tempTodo = myTodos.filter(todo => todo.id !== id);
    setmyTodos([...tempTodo]);
  };
  return (
    <View style={styles.container}>
      {addTodo && (
        <AddTodoModal
          addTodoFunction={addTodoFunction}
          handleClose={handleCloseModal}
        />
      )}
      <View style={styles.upperContainer}>
        <Text style={styles.appHeading}>My To-Do Tasks</Text>
        <ScrollView style={styles.todoContainer}>
          {myTodos?.length ? (
            myTodos.map(todo => (
              <Todo
                isChecked={todo.completed}
                title={todo.title}
                description={todo.description}
                id={todo.id}
                handleTodoChange={handleTodoCheckClick}
                handleDeleteTodo={deleteTodoFunction}
              />
            ))
          ) : (
            <Text style={styles.noTaskMessage}>
              {' '}
              Hurray ... You are all done.
            </Text>
          )}
        </ScrollView>
      </View>
      <Pressable
        style={styles.addImageWrapper}
        onPress={() => setAddTodo(true)}>
        <Image
          source={require('../../assets/images/add.png')}
          style={styles.addImage}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeading: {
    fontSize: 28,
    textAlign: 'center',
    color: '#000',
    marginTop: 15,
    marginBottom: 15,
  },
  upperContainer: {
    flex: 1,
  },
  addImage: {
    height: 80,
    width: 80,
  },
  noTaskMessage: {
    fontSize: 20,
    textAlign: 'center',
  },
  todoContainer: {
    // height: 'auto',
    // maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#C6A999',
    borderRadius: 4,
    padding: 2,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 2,
    marginRight: 2,
    // overflow: 'scroll',
  },
  addImageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    gap: 30,
  },
});

export default HomeScreen;
