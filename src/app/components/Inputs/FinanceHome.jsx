import React, { useState } from "react";
import { View, Text } from "react-native";
import Current_month from "../Month/Current_month";
import Button from "../Button/Button";
import Calculator from "./Calculator";
import Input from "./Input";
import { styles } from "./Styles";

export default function FinanceHome() {
  const [sales, setSales] = useState('');
  const [expenses, setExpenses] = useState('');
  const [description, setDescription] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    setShowResult(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_month}>
        <Current_month />
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
        onChangeText={(value) => setDescription(value)}
      />

      <Button title="Calcular" onPress={handleCalculate} />
      <Calculator sales={sales} expenses={expenses} showResult={showResult} />
    </View>
  );
}
