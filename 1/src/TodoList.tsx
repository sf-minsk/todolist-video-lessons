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

export const TodoList = React.memo(({
                                        todoListsID,
                                        title,
                                        tasks,
                                        filter,
                                        addTask,
                                        removeTask,
                                        changeFilter,
                                        changeTaskStatus,
                                        changeTaskTitle,
                                        removeTodoList,
                                        changeTodoListTitle
                                    }: TodoListPropsType) => {


    console.log(`TodoList (${todoListsID}) was rendered`)


    const getTasksForTodoList = () => {
        switch (filter) {
            case "active":
                return tasks.filter((t) => !t.isDone)
            case "completed":
                return tasks.filter((t) => t.isDone)
            default:
                return tasks
        }
    }

    let newTasks = getTasksForTodoList()


    const task = newTasks.map(t => {
        return <Task
            key={t.id}
            task={t}
            todoListsID={todoListsID}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
        />
    })
    const onClickAllFilter = useCallback(() => {
        changeFilter('all', todoListsID)
    }, [changeFilter, todoListsID])
    const onClickActiveFilter = useCallback(() => {
        changeFilter('active', todoListsID)
    }, [changeFilter, todoListsID])
    const onClickCompletedFilter = useCallback(() => {
        changeFilter('completed', todoListsID)
    }, [changeFilter, todoListsID])


    const onClickDeleteTodoListHandler = useCallback(() => {
        removeTodoList(todoListsID)
    }, [removeTodoList, todoListsID])
    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todoListsID)
    }, [addTask, todoListsID])
    const changeTodoListTitleHandler = (title: string) => changeTodoListTitle(title, todoListsID)

    return (
        <div>
            <h3>
                <EditTableSpan title={title} changeTitle={changeTodoListTitleHandler}/>
                <IconButton
                    onClick={onClickDeleteTodoListHandler}
                    color={'secondary'}

                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
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

