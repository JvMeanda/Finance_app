import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import Button from '../Button/Button';
import { Feather } from '@expo/vector-icons';
import { styles } from './Styles';

export default function DashboardMonth({ transactions }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(-2)}`;
  };

  const handleItemPress = (description) => {
    setSelectedDescription(description);
    setModalVisible(true);
  };

  const calculateProfit = (sales, expenses) => {
    return (sales - expenses).toFixed(2);
  };

  const renderTransactionItem = ({ item }) => {
    const profit = calculateProfit(item.sales, item.expenses);

    return (
      <TouchableOpacity onPress={() => handleItemPress(item.description)}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{formatDate(item.day)}</Text>
          <Text style={styles.tableCell}>{`R$${item.sales.toFixed(2)}`}</Text>
          <Text style={styles.tableCell}>{`R$${item.expenses.toFixed(2)}`}</Text>
          <Text style={styles.tableCell}>{`R$${profit}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyDescription = () => {
    return (
      <Text>{selectedDescription === '' ? 'Nenhuma descrição' : selectedDescription}</Text>
    );
  };

  return (
    <View>
      {transactions.length > 0 ? (
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Dia</Text>
            <Text style={styles.tableHeaderCell}>Venda</Text>
            <Text style={styles.tableHeaderCell}>Despesa</Text>
            <Text style={styles.tableHeaderCell}>Lucro</Text>
          </View>
          
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id?.toString() || item.day + item.sales.toString()}
            style={styles.flatList}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Descrição da Transação</Text>
                <Text style={styles.modalDescription}>
                  {emptyDescription()}
                </Text>
                <Button
                  onPress={() => setModalVisible(false)}
                  icon={<Feather name="x" size={24} color="black" />}
                />
                
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <Text style={styles.noTransactionsMessage}>Nenhuma transação para este mês.</Text>
      )}
    </View>
  );
}
