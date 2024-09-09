import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import Current_month from "../Month/Current_month";
import Button from "../Button/Button";
import Input from "./Input";
import Calculator from "./Calculator";
import { styles } from "./Styles";
import { useFinanceDatabase } from "../../database/useFinanceDatabase";
import TransactionTable from "../Tables/TransactionTable";

export default function FinanceHome() {
  const [sales, setSales] = useState('');
  const [expenses, setExpenses] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-'));
  const [accumulatedSales, setAccumulatedSales] = useState(0);
  const [accumulatedExpenses, setAccumulatedExpenses] = useState(0);
  const [accumulatedProfit, setAccumulatedProfit] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  const financeDatabase = useFinanceDatabase();

  useEffect(() => {
    async function loadTransactions() {
      try {
        const transactions = await financeDatabase.getAllTransactions(); 
        setAllTransactions(transactions);
        if (transactions.length > 0) {
          const totalSales = transactions.reduce((sum, item) => sum + item.sales, 0);
          const totalExpenses = transactions.reduce((sum, item) => sum + item.expenses, 0);
          const totalProfit = totalSales - totalExpenses;

          setAccumulatedSales(totalSales);
          setAccumulatedExpenses(totalExpenses);
          setAccumulatedProfit(totalProfit);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os valores acumulados.");
      }
    }

    loadTransactions();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function createTransaction() {
    try {
      const salesValue = parseFloat(sales);
      const expensesValue = parseFloat(expenses);
  
      const newAccumulatedSales = accumulatedSales + salesValue;
      const newAccumulatedExpenses = accumulatedExpenses + expensesValue;
      const newAccumulatedProfit = newAccumulatedSales - newAccumulatedExpenses;
  
      const data = {
        day: selectedDate,
        sales: salesValue,
        expenses: expensesValue,
        profit: newAccumulatedProfit,
        description,
      };
  
      const { insertedRowId } = await financeDatabase.createTransaction(data);
  
      const newValueID = { ...data, id: insertedRowId };
  
      setAccumulatedSales(newAccumulatedSales);
      setAccumulatedExpenses(newAccumulatedExpenses);
      setAccumulatedProfit(newAccumulatedProfit);
  
      setAllTransactions([...allTransactions, newValueID]);
  
      setSales('');
      setExpenses('');
      setDescription('');
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  }
  

  const handleCalculate = () => {
    const salesValue = parseFloat(sales);
    const expensesValue = parseFloat(expenses);

    if (isNaN(salesValue) || isNaN(expensesValue) || sales.trim() === '' || expenses.trim() === '') {
      Alert.alert("Erro", "Por favor, insira números válidos para vendas e despesas.");
      return;
    }

    createTransaction();
  };

  const updateAccumulatedValues = (sales, expenses, profit) => {
    setAccumulatedSales(sales);
    setAccumulatedExpenses(expenses);
    setAccumulatedProfit(profit);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_month}>
        <Current_month onDateChange={handleDateChange} />
      </View>
      <Text style={styles.label}>Vendas:</Text>
      <Input
        placeholder="Insira o valor das vendas"
        value={sales}
        onChangeText={(value) => setSales(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Despesas:</Text>
      <Input
        placeholder="Insira o valor das despesas"
        value={expenses}
        onChangeText={(value) => setExpenses(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição:</Text>
      <Input
        placeholder="Insira uma descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Calcular" onPress={handleCalculate} />

      {allTransactions.length === 0 ? (
        <Text style={styles.noTransactions}>Sem Transações!</Text>
      ) : (
        <>
          <Calculator
            sales={accumulatedSales}
            expenses={accumulatedExpenses}
            profit={accumulatedProfit}
          />
          <TransactionTable
            transactions={allTransactions}
            setAllTransactions={setAllTransactions}
            updateAccumulatedValues={updateAccumulatedValues}
          />
        </>
      )}
    </View>
  );
}