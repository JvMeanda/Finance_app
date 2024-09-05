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
    borderRightWidth: 1,
    borderRightColor: theme.Colors.gray_300,
  },
  lastColumn: {
    borderRightWidth: 0,
  },
 
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    padding: 35,
    backgroundColor: theme.Colors.white,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.Colors.gray_200,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: theme.Fonts.size.body.md,
  },
  label: {
    fontSize: theme.Fonts.size.body.md,
    color: theme.Colors.black,
    fontWeight: 'bold',
  },
});