import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {EditTableSpan} from "./EditTableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    task: TaskType
    todoListsID: string
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListsID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListsID: string) => void
    removeTask: (taskID: string, todoListsID: string) => void
}

export const Task = React.memo(({task, todoListsID, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {


    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todoListsID)
    }, [task.id, todoListsID, changeTaskStatus])
    const changeTaskTitleHandler = useCallback((title: string) => changeTaskTitle(task.id, title, todoListsID), [task.id, todoListsID, changeTaskTitle])
    const removeTaskHandler = useCallback(() => removeTask(task.id, todoListsID), [task.id, todoListsID, removeTask])


    return (
        <li>
                <span className={task.isDone ? 'is-done' : ''}>
                <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                    color={'primary'}
                />
                <EditTableSpan changeTitle={changeTaskTitleHandler} title={task.title}/></span>
            <IconButton
                onClick={removeTaskHandler}
                color={'secondary'}
                style={{opacity: '0.5'}}
            >
                <Delete/>
            </IconButton>
        </li>
    )


})

