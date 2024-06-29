import React, { useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { DashboardScreenNavigationProp } from "../navigation/types";
import { TaskContext } from "../context/TaskContext";

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return null;
  }

  const { tasks } = taskContext;

  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.dueDate}</Text>
            <Text>{item.status}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate("Task", { task: item })}
            />
          </View>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("Task", { task: undefined })}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  task: {
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
  },
});
