import React, {ChangeEvent, useCallback, useState} from "react";
import {Input} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditTableSpan = React.memo((props: EditTableSpanPropsType) => {
    console.log('span')
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = useCallback(() => {
        setEditMode(true)
    }, [])
    const offEditMode = useCallback(() => {
        setEditMode(false)
        props.changeTitle(title)
    }, [props.changeTitle, title])

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return (
        editMode
            ?
            <Input
                color={'primary'}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeTitle}
            />
            :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

