import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Styles";
import { theme } from "../../theme/Index";

export default function Calculator({ sales, expenses, profit }) {
  if (!profit) {
    return null;
  }

  const salesAmount = parseFloat(sales) || 0;
  const expensesAmount = parseFloat(expenses) || 0;
  const result = salesAmount - expensesAmount;
  const green = theme.Colors.green_600;
  const red = theme.Colors.red_700;

  return (
    <View>
      <View style={styles.resultContainer}>
        <Text style={styles.label_amount}>Venda:</Text>
        <Text style={[styles.value, { color: green }]}>
          {`R$${salesAmount.toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.label_amount}>Despesa:</Text>
        <Text style={[styles.value, { color: red }]}>
          {`R$${expensesAmount.toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.label_amount}>Total:</Text>
        <Text style={[styles.result, { color: result >= 0 ? green : red }]}>
          {`R$${result.toFixed(2)}`}
        </Text>
      </View>
    </View>
  );
}