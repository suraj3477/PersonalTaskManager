# Personal Task Manager

## Setup Instructions

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/PersonalTaskManager.git
    cd PersonalTaskManager
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the app:
    ```sh
    expo start
    ```

## Design Decisions

- Used React Navigation for app navigation to provide a smooth navigation experience.
- Managed authentication and tasks using context API to keep the state management simple and efficient.
- Implemented task CRUD operations with AsyncStorage to ensure data persistence.
- Added animations using `react-native-reanimated` to enhance user experience.

## Project Structure

- `context/`: Contains context providers for authentication and tasks.
- `screens/`: Contains screen components for different parts of the app.
- `navigation/`: Contains navigation setup for the app.

## Building APK

1. Install Expo CLI if not already installed:
    ```sh
    npm install -g expo-cli
    ```

2. Build APK:
    ```sh
    expo build:android
    ```

## Testing

- Run tests:
    ```sh
    npm test
    ```

## License

This project is licensed under the MIT License.
