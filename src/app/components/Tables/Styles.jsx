import { StyleSheet } from "react-native";
import { theme } from "../../theme/Index";

export const styles = StyleSheet.create({
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.Colors.gray_300,
    borderRadius: 5,
    overflow: 'hidden',
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
    fontWeight: "bold",
    color: theme.Colors.gray_700,
    borderRightWidth: 1,
    borderRightColor: theme.Colors.gray_300,
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
    color: theme.Colors.gray_700,
    borderRightWidth: 1,
    borderRightColor: theme.Colors.gray_300,
  },
  lastColumn: {
    borderRightWidth: 0,
  },
});
