import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'
import Colors from '../../Colors'
const Textinput = (props: TextInputProps) => {
    return (
        <TextInput
            // placeholder={placeholder}
            enterKeyHint='done'
            cursorColor={Colors.primary.DEFAULT}
            {...props}
            className={`border-2 border-primary-700 rounded-md px-2 py-2 mb-4 text-lg ${props.className}`} />
    )
}

export default Textinput