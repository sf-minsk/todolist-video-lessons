import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                error={error}
                onKeyPress={onKeyPressAddItem}
                onBlur={()=>{setError(false)}}
                value={title}
                onChange={onChangeTitle}
                // placeholder={error ? 'Title is required' : ''}
                label={'Title'}
                helperText={error && 'Title is required'}
            />


            <IconButton
                onClick={addItem}
                color={'primary'}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})



