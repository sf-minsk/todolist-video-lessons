import React, {useState, ChangeEvent} from "react";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditTableSpan(props: EditTableSpanPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => {
        debugger
        setEditMode(true)
        // setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return (
        editMode
            ?
            <input value={title}
                   autoFocus
                   onBlur={offEditMode}
                   onChange={onChangeTitle}/>
            :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

