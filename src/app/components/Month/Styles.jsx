import { StyleSheet } from "react-native";
import { theme } from "../../theme/Index";

export const styles = StyleSheet.create({
  month: {
    fontSize: theme.Fonts.size.heading.xl,
    backgroundColor: theme.Colors.green_400,
    borderRadius: theme.BorderRadius.md,
    padding: 6,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 36,
    elevation: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: theme.Colors.black_neutral
  },

  calendar: {
    backgroundColor: 'transparent'
  }
});
