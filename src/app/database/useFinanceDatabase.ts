import { useSQLiteContext } from "expo-sqlite"

export type financeDatabase = {
    id: number,
    day: string,
    sales: number,
    expenses: number,
    profit: number,
    description: string,
}

export function useFinanceDatabase() {

    const database = useSQLiteContext()

    async function create(data: Omit<financeDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO transactions (day, sales, expenses, profit, description) VALUES ($day, $sales, $expenses, $profit, $description)")
        try {
            const result = await statement.executeAsync({
                $day: data.day,
                $sales: data.sales,
                $expenses: data.expenses,
                $profit: data.profit,
                $description: data.description,
            })

            const insertedRoId = result.lastInsertRowId.toLocaleString()

            return {insertedRoId}
        }
        catch (error) {
            throw error
        }
    }
    return { create }
}