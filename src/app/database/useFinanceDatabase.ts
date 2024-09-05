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
      console.error("Erro ao criar transação", error.message);
      throw new Error("Não foi possível criar a transação. Tente novamente.");
    } finally {
      if (statement) {
        try {
          await statement.finalizeAsync();
        } catch (error) {
          console.error("Falha ao finalizar statement:", error.message);
        }
      }
    }

  }

  async function deleteTransaction(id) {
    let statement;
    try {
      if (!id) {
        throw new Error("ID da transação não definido");
      }
      statement = await database.prepareAsync(
        "DELETE FROM transactions WHERE id = $id"
      );

      await statement.executeAsync({ $id: id });
    } catch (error) {
      console.error("Erro ao deletar a transação", error.message);
      throw new Error("Não foi possível deletar a transação. Tente novamente.");
    } finally {
      if (statement) {
        try {
          await statement.finalizeAsync();
        } catch (error) {
          console.error("Falha ao finalizar statement:", error.message);
        }
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
    } catch (error) {
      console.error("Falha ao atualizar a transação:", error.message);
      throw new Error("Não foi possível atualizar a transação. Tente novamente.");
    } finally {
      if (statement) {
        try {
          await statement.finalizeAsync();
        } catch (error) {
          console.error("Falha ao finalizar statement:", error.message);
        }
      }
    }

  }

  async function getAllTransactions() {
    let statement;
    try {
      statement = await database.prepareAsync("SELECT * FROM transactions");
      const result = await statement.executeAsync();
      const transactions = await result.getAllAsync();
      return transactions;
    } catch (error) {
      console.error("Falha ao recuperar transações:", error.message);
      throw new Error("Não foi possível recuperar as transações. Tente novamente.");
    } finally {
      if (statement) {
        try {
          await statement.finalizeAsync();
        } catch (error) {
          console.error("Falha ao finalizar statement:", error.message);
        }
      }
    }

  }

  return { createTransaction, updateTransaction, deleteTransaction, getAllTransactions };
}
