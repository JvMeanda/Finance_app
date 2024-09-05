import React from "react";
import Routes from "./src/app/routes/Index";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/app/database/initializeDatabase";
import { StatusBar } from "react-native";
import { theme } from "./src/app/theme/Index";

export default function Index() {
    return (
        <SQLiteProvider databaseName="finance.db" onInit={initializeDatabase}>
            <StatusBar backgroundColor={theme.Colors.black}/>
            <Routes/>
        </SQLiteProvider>
    )
}