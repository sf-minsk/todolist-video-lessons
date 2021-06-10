import React, {ChangeEvent, useCallback, useState} from "react";
import {Input} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditTableSpan = React.memo(({title, changeTitle}: EditTableSpanPropsType) => {
    console.log('span')
    const [spanTitle, setSpanTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = useCallback(() => {
        setEditMode(true)
    }, [])
    const offEditMode = useCallback(() => {
        setEditMode(false)
        changeTitle(spanTitle)
    }, [changeTitle, spanTitle])

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setSpanTitle(e.currentTarget.value)


    return (
        editMode
            ?
            <Input
                color={'primary'}
                value={spanTitle}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeTitle}
            />
            :
            <span onDoubleClick={onEditMode}>{title}</span>
    )
})

