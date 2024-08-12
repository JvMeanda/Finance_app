import { theme } from "../../theme/Index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: theme.Fonts.size.heading.lg,
        backgroundColor: theme.Colors.green_400,
        borderRadius: theme.BorderRadius.md,
        padding: 6,
        marginVertical:4,
        textAlign: 'center',
    }
})