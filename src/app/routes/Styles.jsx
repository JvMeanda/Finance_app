import { StyleSheet } from 'react-native';
import { theme } from '../theme/Index';

export const styles = StyleSheet.create({
    labelStyle: {
        fontWeight: 'bold',
        fontSize: theme.Fonts.size.body.xs,
        marginBottom: 5,
    },
    barStyle: {
        paddingVertical: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        marginTop: 0,
    }
});
