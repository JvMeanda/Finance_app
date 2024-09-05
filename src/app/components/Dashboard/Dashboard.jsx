import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, RefreshControl } from 'react-native';
import DashboardMonth from './DashboardMonth';
import { styles } from './Styles';
import { theme } from '../../theme/Index';
import { useFinanceDatabase } from '../../database/useFinanceDatabase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';

export default function FinanceDashboard({ selectedDate }) {
    const [transactions, setTransactions] = useState([]);
    const [years, setYears] = useState([2023, 2024]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const financeDatabase = useFinanceDatabase();
    const green = theme.Colors.green_600;
    const red = theme.Colors.red_700;

    const loadTransactions = useCallback(async () => {
        try {
            setRefreshing(true);
            const transactions = await financeDatabase.getAllTransactions();
            const sortedTransactions = transactions.slice().sort((a, b) => new Date(a.day) - new Date(b.day));
            setTransactions(sortedTransactions);

            const uniqueYears = [...new Set(transactions.map((transaction) => new Date(transaction.day).getFullYear()))];
            const sortedYears = uniqueYears.sort((a, b) => a - b);
            setYears((prevYears) => [...new Set([...prevYears, ...sortedYears])]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as transações.");
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    useEffect(() => {
        if (selectedDate) {
            const date = new Date(selectedDate);
            setSelectedMonth(date.getMonth() + 1);
        }
    }, [selectedDate]);

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];

    const toggleCollapsible = (monthIndex) => {
        setSelectedMonth(selectedMonth === monthIndex ? null : monthIndex);
    };

    const allTransactionsMonth = (monthIndex) => {
        const filteredTransactions = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.day);
            return (
                transactionDate.getFullYear() === selectedYear &&
                transactionDate.getMonth() + 1 === monthIndex
            );
        });

        const salesAmount = filteredTransactions.reduce((sum, item) => sum + item.sales, 0);
        const expensesAmount = filteredTransactions.reduce((sum, item) => sum + item.expenses, 0);
        const result = salesAmount - expensesAmount;

        return {
            filteredTransactions,
            salesAmount,
            expensesAmount,
            result,
        };
    };

    const renderArrow = (monthIndex) => (
        <MaterialIcons
            name={selectedMonth === monthIndex ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="black"
        />
    );

    const renderMonth = ({ item, index }) => {
        const { filteredTransactions, salesAmount, expensesAmount, result } = allTransactionsMonth(index + 1);
        return (
            <View>
                <TouchableOpacity
                    onPress={() => toggleCollapsible(index + 1)}
                    style={{
                        padding: 10,
                        backgroundColor: selectedMonth === index + 1 ? '#e5e7eb' : '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc'
                    }}
                >
                    <View style={styles.resultMonth}>
                        <Text style={styles.textMonth}>
                            {item}
                        </Text>
                        {renderArrow(index + 1)}
                    </View>
                </TouchableOpacity>

                <Collapsible collapsed={selectedMonth !== index + 1}>
                    <DashboardMonth
                        month={item}
                        transactions={filteredTransactions}
                    />
                    {filteredTransactions.length > 0 && (
                        <View style={styles.monthValues}>
                            <View style={styles.containerValues}>
                                <Text style={styles.label_amount}>Vendas: </Text>
                                <Text style={[styles.value, { color: green }]}>
                                    {`R$${salesAmount.toFixed(2)}`}
                                </Text>
                            </View>
                            <View style={styles.containerValues}>
                                <Text style={styles.label_amount}>Despesas: </Text>
                                <Text style={[styles.value, { color: red }]}>
                                    {`R$${expensesAmount.toFixed(2)}`}
                                </Text>
                            </View>
                            <View style={styles.containerValues}>
                                <Text style={styles.label_amount}>Total: </Text>
                                <Text style={[styles.result, { color: result >= 0 ? green : red }]}>
                                {`R$${result.toFixed(2)}`}
                                </Text>
                            </View>
                        </View>
                    )}
                </Collapsible>
            </View>
        );
    };

    const renderYear = ({ item: year }) => (
        <View>
            <TouchableOpacity
                onPress={() => setSelectedYear(selectedYear === year ? null : year)}
                style={{
                    padding: 10,
                    backgroundColor: selectedYear === year ? '#e5e7eb' : '#fff',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc'
                }}
            >
                <Text style={styles.textYear}>{year}</Text>
            </TouchableOpacity>

            {selectedYear === year && (
                <FlatList
                    data={months}
                    renderItem={renderMonth}
                    keyExtractor={(item, index) => item + index}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={years}
                renderItem={renderYear}
                keyExtractor={(item) => item.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={loadTransactions}
                    />
                }
            />
        </View>
    );
}
