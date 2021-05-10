import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
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

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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

    function addTask(title: string, todoListID: string) {
        debugger
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    function changeFilter(value: FilterValuesType, todoListsID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter: value} : tl))
    }
    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        })
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title: title} : t)
        )
    }
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
    function deleteTodoList(todoListID: string) {
        debugger
        setTodoLists(todoLists.filter(tl => tl.id != todoListID))
        delete tasks[todoListID]
    }
    function addTodoList(title: string) {
        const newTodolistId = v1()
        const newTodoList: TodoListType = {id: newTodolistId, title, filter:"all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodolistId]: []})
    }


    const todoListComponents = todoLists.map(tl => {
        return (
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
                deleteTodoList={deleteTodoList}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })


    return (
        <div className="App">
            {todoListComponents}
            <AddItemForm addItem={addTodoList}/>
        </div>
    );
}

export default App;