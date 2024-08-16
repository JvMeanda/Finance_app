import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./Styles";

export default function TransactionTable({ transactions }) {
  const renderTransactionItem = ({ item, index }) => {
    console.log("Rendering item with ID:", item.id);
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.day}</Text>
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
        keyExtractor={(item) => item.id?.toString() || item.day + item.sales.toString()} // Gera uma chave única alternativa se id for indefinido
      />
    </View>
  );
}
