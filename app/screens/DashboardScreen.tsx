import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
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

  const [statusFilter, setStatusFilter] = useState<
    "pending" | "completed" | "all"
  >("all");
  const [dueDateFilter, setDueDateFilter] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dueDateFilter;
    setShowDatePicker(false);
    setDueDateFilter(currentDate);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesDueDate = dueDateFilter
      ? new Date(task.dueDate).toDateString() === dueDateFilter.toDateString()
      : true;
    return matchesStatus && matchesDueDate;
  });

  return (
    <View style={styles.container}>
 
      {/* Status Filter */}
      <View style={styles.filterContainer}>
        <Text>Status:</Text>
        <TouchableOpacity onPress={() => setStatusFilter("all")}>
          <Text
            style={[
              styles.filterOption,
              statusFilter === "all" && styles.selectedFilter,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStatusFilter("pending")}>
          <Text
            style={[
              styles.filterOption,
              statusFilter === "pending" && styles.selectedFilter,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStatusFilter("completed")}>
          <Text
            style={[
              styles.filterOption,
              statusFilter === "completed" && styles.selectedFilter,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Due Date Filter */}
      <View style={styles.filterContainer}>
        <Text>Due Date:</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text>
            {dueDateFilter ? dueDateFilter.toDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>
        {dueDateFilter && (
          <TouchableOpacity
            onPress={() => setDueDateFilter(null)}
            style={styles.clearButton}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dueDateFilter || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <FlatList
        data={filteredTasks}
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
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterOption: {
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedFilter: {
    backgroundColor: "#3184b6",
    color: "white",
  },
  dateButton: {
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  clearButton: {
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f44336",
    color: "white",
  },
  task: {
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
  },
});
