import React from "react";
import Routes from "./src/app/routes/Index";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/app/database/initializeDatabase";
import { StatusBar } from "react-native";
import { theme } from "./src/app/theme/Index";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins"

export default function Index() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    })

    if(!fontsLoaded){
        return null
    }

    return (
        <SQLiteProvider databaseName="finance.db" onInit={initializeDatabase}>
            <StatusBar backgroundColor={theme.Colors.black}/>
            <Routes/>
        </SQLiteProvider>
    )
}