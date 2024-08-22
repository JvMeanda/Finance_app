import { useSQLiteContext } from "expo-sqlite";

export function useFinanceDatabase() {
  const database = useSQLiteContext();

  async function createTransaction(data) {
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

  async function deleteTransaction(id) {
    let statement;
    try {
      if (!id) {
        throw new Error("Transaction ID is undefined.");
      }
      statement = await database.prepareAsync(
        "DELETE FROM transactions WHERE id = $id"
      );

      await statement.executeAsync({ $id: id });
    console.log(`Transaction with ID ${id} deleted`);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      throw new Error("Failed to delete transaction");
    } finally {
      if (statement) {
        statement.finalizeAsync();
      }
    }
  }

  async function updateTransaction(data) {
    let statement;
    try {
      statement = await database.prepareAsync(
        "UPDATE transactions SET day = $day, sales = $sales, expenses = $expenses, profit = $profit, description = $description WHERE id = $id"
      );
      await statement.executeAsync({
        $id: data.id,
        $day: data.day,
        $sales: data.sales,
        $expenses: data.expenses,
        $profit: data.profit,
        $description: data.description,
      });
      console.log(`Transaction with ID ${data.id} updated`);
    } catch (error) {
      console.error("Failed to update transaction:", error);
      throw new Error("Failed to update transaction");
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
      console.log("Transactions retrieved:", transactions);
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

  return { createTransaction, updateTransaction, deleteTransaction, getAllTransactions };
}
