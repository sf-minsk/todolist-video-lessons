import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

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
        if(e.key === 'Enter'){
            addItem()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   onKeyPress={onKeyPressAddItem}
                   value={title}
                   onChange={onChangeTitle}
                   placeholder={error ? 'Title is required' : ''}
            />
            <button onClick={addItem}>+</button>
            {/*{errorMessage}*/}
        </div>
    )
}