import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'abc967f4-abc5-47ce-a245-10e7f69e7e3a'
    }
})

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

type CommonResponseType<T = {}> = {
    resultCode: number,
    fieldsErrors: string[],
    messages: string[],
    data: T,
}

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodolistType>>('/todo-lists')
    },
    CreateTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    DeleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },
}
