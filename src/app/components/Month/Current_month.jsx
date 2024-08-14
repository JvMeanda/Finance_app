import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import Calendar_time from "../Calendar/Calendar";
import { styles } from "./Styles";

export default function Current_month({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-')
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  useEffect(() => {
    // Se selectedDate ainda for a data inicial e não for alterada, define como a data de hoje
    const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-');
    if (selectedDate === today) {
      onDateChange(today);  // Atualiza o pai com a data de hoje
    }
  }, [selectedDate, onDateChange]);

  const handleOpenCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);  // Passa a data selecionada para o componente pai
    setIsCalendarVisible(false);
  };

  const currentDay = new Date(selectedDate).getDate();
  const currentMonthIndex = new Date(selectedDate).getMonth();
  const currentMonthName = months[currentMonthIndex];

  return (
    <View>
      <TouchableOpacity onPress={handleOpenCalendar} activeOpacity={0.8}>
        <Text style={styles.month}>{`${currentDay} de ${currentMonthName}`}</Text>
      </TouchableOpacity>
      <Modal visible={isCalendarVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <Calendar_time onDateChange={handleDateChange} selectedDate={selectedDate} />
        </View>
      </Modal>
    </View>
  );
}
