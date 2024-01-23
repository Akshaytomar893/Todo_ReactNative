import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

type AddTodoModalPropType = {
  addTodoFunction: (title: string, desc: string) => void;
  handleClose: () => void;
};

const AddTodoModal = ({addTodoFunction, handleClose}: AddTodoModalPropType) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (task.length < 1 || description.length < 1) {
      return;
    }
    addTodoFunction(task, description);

    setTask('');
    setDescription('');
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Task</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Task"
            value={task}
            onChangeText={text => setTask(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <Button title="ADD" onPress={handleAddTask} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 330,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddTodoModal;
