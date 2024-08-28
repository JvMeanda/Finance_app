import { StyleSheet } from "react-native";
import { theme } from "../../theme/Index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
  },
  container_month: {
    paddingBottom: 20,
  },
  label: {
    fontSize: theme.Fonts.size.body.md,
    color: theme.Colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.Colors.gray_200,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: theme.Fonts.size.body.md,
  },
  result: {
    fontSize: theme.Fonts.size.heading.md,
    fontWeight: 'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
  value: {
    fontSize: theme.Fonts.size.body.md,
  },
  label_amount: {
    fontSize: theme.Fonts.size.body.md,
    color: theme.Colors.black,
  },
  noTransactions: {
    fontSize: theme.Fonts.size.body.md,
    textAlign: 'center',
    padding: 60
  }
});
