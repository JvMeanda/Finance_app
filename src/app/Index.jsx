import React from "react";
import Routes from "./routes/Index";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./database/initializeDatabase";
import { StatusBar } from "react-native";
import { theme } from "./theme/Index";

export default function Index() {
    return (
        <SQLiteProvider databaseName="finance.db" onInit={initializeDatabase}>
            <StatusBar backgroundColor={theme.Colors.black}/>
            <Routes/>
        </SQLiteProvider>
    )
}