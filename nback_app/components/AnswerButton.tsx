import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AnswerButtonProps {
  label: string;
  onPress: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        width: 100, // ボタンの幅
        height: 100, // ボタンの高さ
        margin: 8, // ボタン間の余白を調整
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue", // ボタンの背景色
        borderRadius: 8, // ボタンの角を丸くする
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
    },
});

export default AnswerButton;
