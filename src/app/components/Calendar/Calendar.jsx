import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MaterialIcons } from '@expo/vector-icons';
import { ptBR } from "../../utils/localeCalendarConfig";
import { theme } from "../../theme/Index";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Calendar_time({ onDateChange, selectedDate }) {
    const [markedDates, setMarkedDates] = useState({});
    
    useEffect(() => {
        markDates();
    }, [selectedDate]);

    const handleDayPress = (day) => {
        onDateChange(day.dateString);
    };

    const markDates = () => {
        const dates = {};
        const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split('/').reverse().join('-');

        // Dias passados
        for (let i = 1; i <= 365; i++) {
            const date = new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0];
            dates[date] = {
                customStyles: {
                    text: {
                        color: theme.Colors.gray_400,
                    },
                },
            };
        }
        // Dias futuros
        for (let i = 0; i <= 365; i++) {
            const date = new Date(new Date().setDate(new Date().getDate() + i)).toISOString().split('T')[0];
            dates[date] = {
                customStyles: {
                    text: {
                        color: theme.Colors.white,
                    },
                },
            };
        }
        // Dia atual (hoje)
        dates[today] = {
            customStyles: {
                text: {
                    color: theme.Colors.green_600,
                },
            },
        };
        // Selecionar dia
        if (selectedDate) {
            dates[selectedDate] = {
                selected: true,
                selectedColor: theme.Colors.green_400,
                selectedTextColor: theme.Colors.black_neutral,
                customStyles: {
                    text: {
                        color: theme.Colors.black_neutral,
                    },
                },
            };
        }

        setMarkedDates(dates);
    };

    return (
        <View>
            <Calendar
                onDayPress={handleDayPress}
                headerStyle={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: theme.Colors.gray_400,
                    paddingBottom: 10,
                    marginBottom: 10,
                }}
                theme={{
                    textMonthFontSize: theme.Fonts.size.heading.sm,
                    calendarBackground: 'transparent',
                    arrowColor: theme.Colors.green_600,
                    monthTextColor: theme.Colors.green_600,
                    todayTextColor: theme.Colors.green_600,
                    textDayStyle: { color: theme.Colors.white },
                    arrowStyle: { margin: 0, padding: 0 },
                }}
                hideExtraDays={true}
                markedDates={markedDates}
                markingType={'custom'}
                renderArrow={(direction) => (
                    <MaterialIcons size={24} color={theme.Colors.green_600} name={`keyboard-arrow-${direction}`} />
                )}
            />
        </View>
    );
}
