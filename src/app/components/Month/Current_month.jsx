import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import Calendar_time from "../Calendar/Calendar";
import { styles } from "./Styles";

export default function Current_month() {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-'));
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const handleOpenCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
