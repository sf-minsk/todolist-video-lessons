import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, todoListID_1, todoListID_2} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}

type AddTaskAT = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}

type ChangeStatusAT = {
    type: 'CHANGE_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTitleAT = {
    type: 'CHANGE_TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type ActionUnionType = RemoveTaskAT | AddTaskAT | ChangeStatusAT | ChangeTitleAT | AddTodoListAT | RemoveTodoListAT


let initialState = {
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
}

type InitialStateType = typeof initialState


export const tasksReducer = (state = initialState, action: ActionUnionType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE_TASK' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)
            }
        case 'ADD_TASK' :
            let task: TaskType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        case 'CHANGE_STATUS' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE_TITLE' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }

        case 'ADD-TODOLIST' :
            return {
                ...state,
                [action.id]: []
            }

        case 'REMOVE-TODOLIST' :
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD_TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusAT => {
    return {type: 'CHANGE_STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleAT => {
    return {type: 'CHANGE_TITLE', taskId, title, todolistId}
}







