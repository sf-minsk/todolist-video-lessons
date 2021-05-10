import React, {ChangeEvent} from "react";
import {TaskType, FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";

type TodoListPropsType = {
    todoListsID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListsID: string) => void
    removeTask: (taskID: string, todoListsID: string) => void
    changeFilter: (value: FilterValuesType, todoListsID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListsID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListsID: string) => void
    deleteTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<boolean>(false)

    const task = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListsID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListsID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListsID)
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatus}
                />
                <EditTableSpan changeTitle={changeTaskTitle} title={t.title}/>
                <button onClick={removeTask}>Del</button>
            </li>
        )
    })
    const onClickAllFilter = () => { props.changeFilter('all', props.todoListsID) }
    const onClickActiveFilter = () => { props.changeFilter('active', props.todoListsID) }
    const onClickCompletedFilter = () => { props.changeFilter('completed', props.todoListsID) }
    const onClickDeleteTodoList = () => { props.deleteTodoList(props.todoListsID) }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListsID)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListsID)

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<EditTableSpan changeTitle={changeTaskTitle} title={props.title}/>*/}
                <button onClick={onClickDeleteTodoList}>x</button></h3>
            <AddItemForm addItem={addTask}/>
            {task}
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilter}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;