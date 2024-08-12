import React from "react";
import { Text, TouchableOpacity } from "react-native"
import { styles } from "./Styles"

export default function Button({title, onPress}) {
    return(
        <TouchableOpacity activeOpacity={0.8} styles={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}