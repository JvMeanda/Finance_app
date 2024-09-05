import { StyleSheet } from "react-native";
import { theme } from "../../theme/Index";

export const styles = StyleSheet.create({
  month: {
    fontSize: theme.Fonts.size.heading.xl,
    backgroundColor: theme.Colors.green_400,
    borderRadius: theme.BorderRadius.md,
    padding: 6,
    textAlign: 'center',
    // Estilos de sombra para iOS
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 10 }, // Deslocamento da sombra
    shadowOpacity: 0.16, // Opacidade da sombra
    shadowRadius: 36, // Raio de difusão da sombra
    // Estilos de elevação para Android
    elevation: 10, // Elevação do botão, pode precisar ajustar
  },

  modalContainer: {
    flex: 1,
    backgroundColor: theme.Colors.black_neutral
  },

  calendar: {
    backgroundColor: 'transparent'
  }
});
