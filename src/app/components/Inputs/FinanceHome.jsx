import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import Current_month from "../Month/Current_month";
import Button from "../Button/Button";
import Input from "./Input";
import { styles } from "./Styles";
import { useFinanceDatabase } from "../../database/useFinanceDatabase";

export default function FinanceHome() {
  const [sales, setSales] = useState('');
  const [expenses, setExpenses] = useState('');
  const [description, setDescription] = useState('');
  const [profit, setProfit] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-'));

  const financeDatabase = useFinanceDatabase();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function create() {
    try {
      const salesValue = parseFloat(sales);
      const expensesValue = parseFloat(expenses);
      const calculatedProfit = salesValue - expensesValue;

      const data = {
        day: selectedDate,
        sales: salesValue,
        expenses: expensesValue,
        profit: calculatedProfit,
        description,
      };

      const response = await financeDatabase.create(data);

      console.log(`Sales: ${salesValue}, Expenses: ${expensesValue}, Description: ${description}, Day: ${selectedDate}, Profit: ${calculatedProfit}`);
      Alert.alert("Venda registrada", `ID da transação: ${response}`);
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

    const calculatedProfit = salesValue - expensesValue;
    setProfit(calculatedProfit);
    create();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_month}>
        <Current_month onDateChange={handleDateChange} />
      </View>
      <Text style={styles.label}>Vendas:</Text>
      <Input
        style={styles.input}
        placeholder="Insira o valor das vendas"
        value={sales}
        onChangeText={(value) => setSales(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Despesas:</Text>
      <Input
        style={styles.input}
        placeholder="Insira o valor das despesas"
        value={expenses}
        onChangeText={(value) => setExpenses(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição:</Text>
      <Input
        style={styles.input}
        placeholder="Insira uma descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Calcular" onPress={handleCalculate} />
      {/* <Calculator sales={sales} expenses={expenses} profit={profit} /> */}
    </View>
  );
}
