import { StyleSheet } from "react-native";
import { theme } from "../../theme/Index";

export const styles = StyleSheet.create({
    button: {
        borderRadius: theme.BorderRadius.md,
        backgroundColor: theme.Colors.green_400,
        shadowColor:  theme.Colors.black,
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 10,
        elevation: 8,

    },
    text: {
        fontSize: theme.Fonts.size.heading.lg,
        padding: 8,
        textAlign: 'center',
    },
});
