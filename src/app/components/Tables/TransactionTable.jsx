import React, { useState } from "react";
import { View, Text, FlatList, Modal, Button } from "react-native";
import { styles } from "./Styles";
import { useFinanceDatabase } from "../../database/useFinanceDatabase";
import Input from "../Inputs/Input";
import { Alert } from "react-native";

export default function TransactionTable({ transactions, setAllTransactions, updateAccumulatedValues }) {
  const { deleteTransaction, updateTransaction } = useFinanceDatabase();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [editSales, setEditSales] = useState('');
  const [editExpenses, setEditExpenses] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(-2)}`;
  };

  const handleUpdate = async () => {
    if (!selectedTransaction) return;
  
    const updatedData = {
      id: selectedTransaction.id,
      day: selectedTransaction.day,
      sales: parseFloat(editSales),
      expenses: parseFloat(editExpenses),
      profit: parseFloat(editSales) - parseFloat(editExpenses),
      description: editDescription,
    };
  
    try {
      await updateTransaction(updatedData);
      setAllTransactions((prevTransactions) => {
        const updatedTransactions = prevTransactions.map((transaction) =>
          transaction.id === selectedTransaction.id ? updatedData : transaction
        );

        const totalSales = updatedTransactions.reduce((sum, item) => sum + item.sales, 0);
        const totalExpenses = updatedTransactions.reduce((sum, item) => sum + item.expenses, 0);
        const totalProfit = totalSales - totalExpenses;

        updateAccumulatedValues(totalSales, totalExpenses, totalProfit);

        return updatedTransactions;
      });
      setModalVisible(false);
      Alert.alert("Sucesso", "Transação atualizada com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar a transação.");
    }
  };
  

  const handleDelete = async () => {
    try {
      if (selectedTransaction && selectedTransaction.id) {
        await deleteTransaction(selectedTransaction.id);
        setAllTransactions((prevTransactions) => {
          const updatedTransactions = prevTransactions.filter(
            (transaction) => transaction.id !== selectedTransaction.id
          );

          const totalSales = updatedTransactions.reduce((sum, item) => sum + item.sales, 0);
          const totalExpenses = updatedTransactions.reduce((sum, item) => sum + item.expenses, 0);
          const totalProfit = totalSales - totalExpenses;

          updateAccumulatedValues(totalSales, totalExpenses, totalProfit);

          return updatedTransactions;
        });
        setModalVisible(false);
        Alert.alert("Sucesso", "Transação excluída com sucesso.");
      } else {
        console.error("Failed to delete: ID is undefined.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao excluir a transação.");
    }
  };
  

  const renderTransactionItem = ({ item }) => {
    console.log("Rendered item:", item);
    return (
      <View
        style={styles.tableRow}
        onTouchEnd={() => {
          console.log("Selected Item ID:", item.id);
          setSelectedTransaction(item);
          setEditSales(item.sales.toString());
          setEditExpenses(item.expenses.toString());
          setEditDescription(item.description);
          setModalVisible(true);
        }}
      >
        <Text style={styles.tableCell}>{formatDate(item.day)}</Text>
        <Text style={styles.tableCell}>{`R$${item.sales.toFixed(2)}`}</Text>
        <Text style={styles.tableCell}>{`R$${item.expenses.toFixed(2)}`}</Text>
      </View>
    );
  };
  

  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Dia</Text>
        <Text style={styles.tableHeaderCell}>Venda</Text>
        <Text style={styles.tableHeaderCell}>Despesa</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id?.toString() || item.day + item.sales.toString()}
      />

      {selectedTransaction && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
            <Text style={styles.label}>Vendas:</Text>
              <Input
                style={styles.input}
                placeholder="Venda"
                value={editSales}
                onChangeText={setEditSales}
                keyboardType="numeric"
              />
             <Text style={styles.label}>Despesas:</Text>
              <Input
                style={styles.input}
                placeholder="Despesas"
                value={editExpenses}
                onChangeText={setEditExpenses}
                keyboardType="numeric"
              />
             <Text style={styles.label}>Descrição:</Text>
              <Input
                style={styles.input}
                placeholder="Descrição"
                value={editDescription}
                onChangeText={setEditDescription}
              />
              <View style={styles.modalButtonContainer}>
                <Button title="Editar" onPress={handleUpdate} />
                <Button title="Deletar" onPress={handleDelete} />
                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
