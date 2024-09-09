import React from "react";
import { View, StatusBar } from "react-native";
import { styles } from "./Styles";
import FinanceHome from "../../components/Inputs/FinanceHome";

export default function Home() {
    return (
        <View style={styles.container}>
             <FinanceHome/>
        </View>
    )
}