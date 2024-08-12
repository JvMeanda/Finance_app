import React from "react";
import { View, StatusBar } from "react-native";
import { styles } from "./Styles";
import FinanceHome from "../../components/Inputs/FinanceHome";
import { theme } from "../../theme/Index";

export default function Home() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.Colors.black}/>
             <FinanceHome/>
        </View>
    )
}