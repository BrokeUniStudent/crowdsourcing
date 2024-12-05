import { Stack, Input, InputAdornment, InputLabel, IconButton, Chip } from "@mui/material"
import Add from "@mui/icons-material/Add"
import { useState } from "react"

export default function SelectionComponent(props: { handleDelete: any, handleAdd: any, choices: string[] }) {
    const [textValue, setTextValue] = useState<string>();
    return (<>
        <Stack direction={'row'} spacing={0.5}>
            <div>
                <InputLabel>Selections</InputLabel>
                <Input
                    size='small'
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton onClick={() => props.handleAdd(textValue)}>
                                <Add fontSize='small' />
                            </IconButton>
                        </InputAdornment>
                    }
                    value={textValue}
                    onChange={({ target }) => setTextValue(target.value)}
                />

            </div>


            {(props.choices ?? []).map((value: string, index: number) =>

                <Chip label={value} onDelete={() => props.handleDelete(index)} key={value} />

            )}
        </Stack>


    </>)
}