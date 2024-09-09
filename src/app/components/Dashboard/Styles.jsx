import { StyleSheet } from "react-native";
import { theme } from "../../theme/Index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: "100%",
  },
  tableWrapper: {
    flex: 1,
  },
  textYear: {
    fontSize: theme.Fonts.size.heading.md,
    fontFamily: theme.Fonts.family.bold,
    textAlign: 'center',
  },
  textMonth: {
    fontSize: theme.Fonts.size.heading.xs,
    fontFamily: theme.Fonts.family.bold,
  },
  noTransactionsMessage: {
    fontSize: theme.Fonts.size.heading.xs,
    fontFamily: theme.Fonts.family.bold,
    textAlign: 'center',
    margin: 20,
  },
  flatList: {
    flexGrow: 1,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: theme.Colors.green_400,
    borderBottomWidth: 1,
    borderBottomColor: theme.Colors.gray_300,
  },
  tableHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: theme.Colors.gray_300,
    fontFamily: theme.Fonts.family.bold,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.Colors.gray_300,
  },
  tableCell: {
    flex: 1,
    paddingVertical: 8, 
    paddingHorizontal: 4,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: theme.Colors.gray_300,
  },
  resultMonth: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.Fonts.size.heading.sm,
  },
  monthValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e5e7eb',
    
  },
  containerValues: {
    alignItems: 'center',
  },
  value: {
    fontSize: theme.Fonts.size.body.md,
    fontFamily: theme.Fonts.family.bold,
  },
  result: {
    fontSize: theme.Fonts.size.body.sm,
    fontFamily: theme.Fonts.family.bold,
  },
  label_amount: {
    fontSize: theme.Fonts.size.body.sm,
    fontFamily: theme.Fonts.family.bold,
    marginRight: 5,
  },
  value: {
    fontSize: theme.Fonts.size.body.sm,
    fontFamily: theme.Fonts.family.bold,
  },
  
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: theme.Fonts.size.heading.sm,
    fontFamily: theme.Fonts.family.bold,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: theme.Fonts.size.heading.xs,
    marginBottom: 20,
  },
});
