import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../App";
import { useLanguage } from '../contexts/LanguageContext';
import { useRadioContext } from '../contexts/RadioContext';

interface QuestionScreenProps {
  currentTime: string;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ currentTime }) => {
  type homeScreenProp = StackNavigationProp<StackParamList>;
  const navigation = useNavigation<homeScreenProp>();
  const { language } = useLanguage();
  const { setSleepAnswer } = useRadioContext();

  //選択肢
  const answers = language === 'ja'
    ? ["大幅に良くなっている", "やや良くなっている", "変わらない", "やや悪くなっている", "大幅に悪くなっている"]
    : ["much better", "better", "no change", "worse", "much worse"];

  // ラジオボタンの選択状態を管理するstate
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {language === 'ja' ? (
        <Text style={styles.questionText}>
          昨日と比べて、今日の睡眠の質はどうでしたか？
        </Text>
      ) : (
        <Text style={styles.questionText}>
          Compared to yesterday, how was the quality of your sleep today
        </Text>
      )}
      {/* ラジオボタン */}
      <View style={styles.buttonContainer}>
        {answers.map((answer) => (
          <TouchableOpacity
            key={answer}
            style={[
              styles.button,
              selectedAnswer === answer && styles.buttonSelected,
            ]}
            onPress={() => setSelectedAnswer(answer)}
          >
            {selectedAnswer === answer && <View style={styles.innerCircle} />}
            <Text style={styles.buttonText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          { marginTop: 20 },
          !selectedAnswer && styles.confirmButtonDisabled,
        ]}
        onPress={() => {
          if (selectedAnswer) {
            setSleepAnswer(selectedAnswer)
            navigation.navigate("Start");
          }
        }}
        disabled={!selectedAnswer}
      >
        {language === 'ja' ? (
          <Text style={styles.confirmButtonText}>決定</Text>
        ) : (
          <Text style={styles.confirmButtonText}>Decide</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  buttonSelected: {
    backgroundColor: "#EEEEEE",
  },
  innerCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#000",
    position: "absolute",
    left: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  confirmButtonDisabled: {
    backgroundColor: "#ccc",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QuestionScreen;
