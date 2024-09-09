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
        padding: 4
    },
    textTitle: {
        fontSize: theme.Fonts.size.heading.md,
        fontFamily: theme.Fonts.family.medium,
        textAlign: 'center',
        marginTop: 4,
    },
    textIcon: {
        fontSize: theme.Fonts.size.heading.md,
        fontFamily: theme.Fonts.family.medium,
        textAlign: 'center',
        padding: 2
    },
});
