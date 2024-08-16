import { useSQLiteContext } from "expo-sqlite";

export type financeDatabase = {
  id: number;
  day: string;
  sales: number;
  expenses: number;
  profit: number;
  description: string;
};

export function useFinanceDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<financeDatabase, "id">): Promise<{ insertedRowId: string }> {
    let statement;
    try {
      statement = await database.prepareAsync(
        "INSERT INTO transactions (day, sales, expenses, profit, description) VALUES ($day, $sales, $expenses, $profit, $description)"
      );

      const result = await statement.executeAsync({
        $day: data.day,
        $sales: data.sales,
        $expenses: data.expenses,
        $profit: data.profit,
        $description: data.description,
      });

      return { insertedRowId: result.lastInsertRowId.toString() };
    } catch (error) {
      console.error("Failed to create transaction:", error);
      throw new Error("Failed to create transaction");
    } finally {
      if (statement) {
        statement.finalizeAsync();
      }
    }
  }

  async function getAllTransactions() {
    let statement;
    try {
      statement = await database.prepareAsync("SELECT * FROM transactions");
      const result = await statement.executeAsync();
      
      const transactions = await result.getAllAsync();
      console.log("Transactions loaded:", transactions); 
      
      return transactions;
    } catch (error) {
      console.error("Failed to retrieve transactions:", error);
      throw new Error("Failed to retrieve transactions");
    } finally {
      if (statement) {
        statement.finalizeAsync();
      }
    }
  }

  return { create, getAllTransactions };
}
