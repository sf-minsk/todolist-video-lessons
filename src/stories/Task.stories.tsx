import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Task, TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/Task',
    component: Task,

} as Meta;

const changeTaskStatusCallback = action('Change Status Clicked')
const changeTaskTitleCallback = action('Change Title Clicked')
const removeTaskCallback = action('Remove Task Clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'IsDoneTaskTitle', isDone: true},
    todoListsID: 'todoListsID',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'IsNotDoneTaskTitle', isDone: false},
    todoListsID: 'todoListsID1',
};
