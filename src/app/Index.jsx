import React from "react";
import Routes from "./routes/Index";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./database/initializeDatabase";

export default function Index() {
    return (
        <SQLiteProvider databaseName="finance.db" onInit={initializeDatabase}>
            <Routes/>
        </SQLiteProvider>
    )
}