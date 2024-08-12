import React from "react";
import { TextInput } from "react-native";

export default function Input({ placeholder, value, onChangeText, keyboardType, style }) {
  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
}
