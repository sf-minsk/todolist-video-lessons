import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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

export const TodoList = React.memo((props: TodoListPropsType) => {

    console.log(`TodoList (${props.todoListsID}) was rendered`)

    const {filter} = props


    const getTasksForTodoList = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter((t) => !t.isDone)
            case "completed":
                return props.tasks.filter((t) => t.isDone)
            default:
                return props.tasks
        }
    }

    let newTasks = getTasksForTodoList()


    const task = newTasks.map(t => {
        return <Task
            key={t.id}
            task={t}
            todoListsID={props.todoListsID}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
        />
    })
    const onClickAllFilter = useCallback(() => {
        props.changeFilter('all', props.todoListsID)
    }, [props.changeFilter, props.todoListsID])
    const onClickActiveFilter = useCallback(() => {
        props.changeFilter('active', props.todoListsID)
    }, [props.changeFilter, props.todoListsID])
    const onClickCompletedFilter = useCallback(() => {
        props.changeFilter('completed', props.todoListsID)
    }, [props.changeFilter, props.todoListsID])


    const onClickDeleteTodoList = useCallback(() => {
        props.removeTodoList(props.todoListsID)
    }, [props.removeTodoList, props.todoListsID])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListsID)
    }, [props.addTask, props.todoListsID])
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListsID)

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
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
})

