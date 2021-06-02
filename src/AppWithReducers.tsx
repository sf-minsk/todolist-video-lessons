import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
//import {render} from "react-dom";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bear", isDone: true},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Bread", isDone: false}]
    })

// tasks
    function removeTask(taskID: string, todoListID: string) {
        dispatchTasks(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchTasks(changeTaskStatusAC(taskId, newIsDoneValue, todoListID))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        dispatchTasks(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

// todolists
    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodolistAC(todoListID)
        dispatchTodoLists(RemoveTodolistAC(todoListID))
        dispatchTasks(RemoveTodolistAC(todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchTodoLists(ChangeTodolistTitleAC(title, todoListID))
    }

    function changeFilter(value: FilterValuesType, todoListsID: string) {
        dispatchTodoLists(ChangeTodolistFilterAC(value, todoListsID))
    }

// UI
    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper
                    elevation={10}
                    style={{padding: '15px', width: '310px', height: 'auto'}}
                >
                    <TodoList
                        key={tl.id}
                        todoListsID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position={'fixed'}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={"xl"} fixed>
                <Grid container style={{padding: '20px 0', paddingTop: '80px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}

                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
