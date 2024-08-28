import { StyleSheet } from 'react-native';
import { theme } from '../theme/Index';

export const styles = StyleSheet.create({
    labelStyle: {
        fontWeight: 'bold',
        fontSize: theme.Fonts.size.body.xs,
        marginBottom: 5,
    },
    barStyle: {
        paddingVertical: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        marginTop: 0,
    }
});
