import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskScreen from '../screens/TaskScreen';
import { TaskContext } from '../context/TaskContext';
import { NavigationContainer } from '@react-navigation/native';
import { TaskScreenRouteProp, TaskScreenNavigationProp } from '../navigation/types';

const mockAddTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();

const taskContextValue = {
  tasks: [],
  addTask: mockAddTask,
  updateTask: mockUpdateTask,
  deleteTask: mockDeleteTask,
};

const mockGoBack = jest.fn();

const mockRoute: TaskScreenRouteProp = {
  key: 'TaskScreen',
  name: 'Task',
  params: { task: undefined },
};

const mockNavigation: Partial<TaskScreenNavigationProp> = {
  goBack: mockGoBack,
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <TaskContext.Provider value={taskContextValue}>
      <NavigationContainer>{ui}</NavigationContainer>
    </TaskContext.Provider>
  );
};

describe('TaskScreen', () => {
  it('renders correctly and allows adding a task', async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = renderWithContext(
      <TaskScreen route={mockRoute} navigation={mockNavigation as TaskScreenNavigationProp} />
    );

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const statusInput = getByPlaceholderText('Status');

    fireEvent.changeText(titleInput, 'Test Task');
    fireEvent.changeText(descriptionInput, 'This is a test task');
    fireEvent.changeText(statusInput, 'pending');
    fireEvent.press(getByText('Save Task'));

    await waitFor(() => expect(mockAddTask).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: expect.any(String),
      status: 'pending',
    }));

    expect(queryByTestId('lottie-animation')).not.toBeNull();

    await waitFor(() => expect(mockGoBack).toHaveBeenCalled());
  });
});
