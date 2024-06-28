import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { TaskContext, Task } from '../context/TaskContext';
import uuid from 'uuid-random'; // Import uuid-random for generating task IDs

type Props = {
    route: RouteProp<{ params: { task?: Task } }, 'params'>;
    navigation: NavigationProp<any>;
};

const TaskScreen: React.FC<Props> = ({ route, navigation }) => {
    const { addTask, updateTask }: any = useContext(TaskContext);
    const task: Task | undefined = route.params?.task;
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [dueDate, setDueDate] = useState(task?.dueDate || '');
    const [status, setStatus] = useState<'pending' | 'completed'>(task?.status || 'pending');

    const handleSave = () => {
        if (task) {
            updateTask({ ...task, title, description, dueDate, status });
        } else {
            addTask({ id: uuid(), title, description, dueDate, status }); // Generate UUID using uuid()
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
            />
            <TextInput
                placeholder="Due Date"
                value={dueDate}
                onChangeText={setDueDate}
                style={styles.input}
            />
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
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
});

export default TaskScreen;
