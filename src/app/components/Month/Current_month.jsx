import React, { useState, useEffect } from "react";
import { View, Modal } from "react-native";
import Button from "../Button/Button";
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
        const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-');
        if (selectedDate === today) {
            onDateChange(today);
        }
    }, [selectedDate, onDateChange]);

    const handleOpenCalendar = () => {
        setIsCalendarVisible(true);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date); 
        setIsCalendarVisible(false);
    };

    const currentDay = new Date(selectedDate).getUTCDate();
    const currentMonthIndex = new Date(selectedDate).getUTCMonth();
    const currentMonthName = months[currentMonthIndex];

    return (
        <View>
            <Button title={`${currentDay} de ${currentMonthName}`} onPress={handleOpenCalendar} />
            <Modal visible={isCalendarVisible} animationType="fade">
                <View style={styles.modalContainer}>
                    <Calendar_time onDateChange={handleDateChange} selectedDate={selectedDate} />
                </View>
            </Modal>
        </View>
    );
}
