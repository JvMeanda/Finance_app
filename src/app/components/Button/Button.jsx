import React from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./Styles"

export default function Button({title, onPress, icon}) {
    return(
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} icon={icon} style={styles.button}>
           <View>
            {title &&<Text style={styles.text}>{title}</Text>}
            {icon && <View style={styles.text}>{icon}</View>}
           </View>
            
        </TouchableOpacity>
    )
}