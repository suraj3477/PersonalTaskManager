import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TaskContext, Task } from "../context/TaskContext";
import {
  TaskScreenRouteProp,
  TaskScreenNavigationProp,
} from "../navigation/types";
import uuid from "uuid-random";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  route: TaskScreenRouteProp;
  navigation: TaskScreenNavigationProp;
};

const TaskScreen: React.FC<Props> = ({ route, navigation }) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return null;
  }

  const { addTask, updateTask } = taskContext;
  const task: Task | undefined = route.params?.task;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task ? new Date(task.dueDate) : new Date()
  );
  const [status, setStatus] = useState<"pending" | "completed">(
    task?.status || "pending"
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === "ios");  
    setDueDate(currentDate);
  };

  const handleSave = () => {
    const formattedDueDate = dueDate.toISOString();
    if (task) {
      updateTask({
        ...task,
        title,
        description,
        dueDate: formattedDueDate,
        status,
      });
    } else {
      addTask({
        id: uuid(),
        title,
        description,
        dueDate: formattedDueDate,
        status,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Task Screen</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text>{dueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus as any}
        style={styles.input}
      />
      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  dateButton: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default TaskScreen;
