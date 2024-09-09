import { StyleSheet } from 'react-native';
import { theme } from '../theme/Index';

export const styles = StyleSheet.create({
    labelStyle: {
        fontFamily: theme.Fonts.family.bold,
        fontSize: theme.Fonts.size.body.xxs,
        marginBottom: 1,
    },
    barStyle: {
        paddingVertical: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        marginTop: 0,
    }
});
