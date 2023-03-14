import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: center;
  margin: 0px 20px; /* y축 x축 */
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const App = () => {
    const width = Dimensions.get('window').width;

    const [ newTask, setNewTask ] = useState('');
    const [tasks, setTasks] = useState({
        '1': { id: '1', text: 'React Native', completed: true },
        '2': { id: '2', text: '나라 세개 여행', completed: false },
        '3': { id: '3', text: '도서 1권 읽기', completed: false },
    });
   
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
           [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
    };

    const _deleteTask = id => {
        const currentTasks = Object.assign({},tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };
    const _toggleTask = id => {
        const currentTasks = Object.assign({},tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = {...tasks };
        currentTasks[item.id] = item;
        setTasks(currentTasks);
      };
    

    const _handleTextChange = text => {
        setNewTask(text);
        console.log(`변경된문자열:${newTask}`);
    };

    const _onBlur = () => {
        setNewTask('');
      };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                    />
                <Title>버킷 리스트</Title>
                <Input
                    placeholder="+항목추가" 
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                    onBlur={_onBlur}
                />
                <List width={width}>
                    {Object.values(tasks)
                    .reverse()
                    .map(item => (
                        <Task
                            key={item.id}    
                            item={item}
                            deleteTask={_deleteTask}
                            toggleTask={_toggleTask}
                            updateTask={_updateTask}
                        />
                    ))}            
                </List>
            </Container>
        </ThemeProvider>
    );
};

export default App;