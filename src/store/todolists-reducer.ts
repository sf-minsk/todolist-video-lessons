import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListsID: string
}

export type ActionUnionType = AddTodoListAT | RemoveTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionUnionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST' :
            const newTodolistId = v1()
            const newTodoList: TodoListType = {id: newTodolistId, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case 'REMOVE-TODOLIST' :
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListsID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}



export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title}
}


export const RemoveTodolistAC = (todoListID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}

export const ChangeTodolistTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID}
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todoListsID: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todoListsID}
}
