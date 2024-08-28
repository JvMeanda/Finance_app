import React from "react";
import { View,  } from "react-native";
import { styles } from "./Styles";
import FinanceDashboard from "../../components/Dashboard/Dashboard";

export default function Dashboard() {
    return (
        <View style={styles.container}>
           <FinanceDashboard/>
        </View>
    )
}