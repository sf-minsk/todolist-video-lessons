import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
export type RemoveTodoListAT = {
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


export const todoListID_1 = v1()
export const todoListID_2 = v1()

let initialState = [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'}
] as Array<TodoListType>

export type InitialStateType = typeof initialState

export const todolistsReducer = (todoLists = initialState, action: ActionUnionType): InitialStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST' :
            const newTodoList: TodoListType = {id: action.id, title: action.title, filter: "all"}
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
    return {type: 'ADD-TODOLIST', title: title, id: v1()}
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
