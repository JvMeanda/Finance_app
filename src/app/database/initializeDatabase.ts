import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(
        `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day TEXT NOT NULL,
        sales REAL NOT NULL,
        expenses REAL NOT NULL,
        profit REAL NOT NULL,
        description TEXT
        );`
    );
} 