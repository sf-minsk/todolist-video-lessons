import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListType} from "./AppWithRedux";

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
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    // const todo = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id === props.todoListsID)[0])
    // const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListsID])
    //
    // const disoatch = useDispatch()

    const {filter} = props

    const task = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListsID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListsID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListsID)
        return (
            <li key={t.id}
            >
                <span className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                    color={'primary'}
                />
                <EditTableSpan changeTitle={changeTaskTitle} title={t.title}/></span>
                <IconButton
                    onClick={removeTask}
                    color={'secondary'}
                    style={{opacity: '0.5'}}
                >
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    const onClickAllFilter = () => {
        props.changeFilter('all', props.todoListsID)
    }
    const onClickActiveFilter = () => {
        props.changeFilter('active', props.todoListsID)
    }
    const onClickCompletedFilter = () => {
        props.changeFilter('completed', props.todoListsID)
    }
    const onClickDeleteTodoList = () => {
        props.removeTodoList(props.todoListsID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListsID)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListsID)

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<EditTableSpan changeTitle={changeTaskTitle} title={props.title}/>*/}
                <IconButton
                    onClick={onClickDeleteTodoList}
                    color={'secondary'}

                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {task}
            </ul>
            <div>
                <Button
                    style={{margin: '2px'}}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickAllFilter}>
                    All
                </Button>
                <Button
                    style={{margin: '2px'}}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickActiveFilter}>
                    Active
                </Button>
                <Button
                    style={{margin: '2px'}}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickCompletedFilter}>
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;