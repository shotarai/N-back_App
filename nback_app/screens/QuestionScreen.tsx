import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList} from "../App";

interface QuestionScreenProps {
  currentTime: string;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ currentTime }) => {
  type homeScreenProp = StackNavigationProp<StackParamList>;
  const navigation = useNavigation<homeScreenProp>();

  // ラジオボタンの選択状態を管理するstate
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // 回答を保存する関数
  const saveAnswer = async () => {
    const newData = {
      question: {
        解答: selectedAnswer,
      },
    };
    const currentUserEmail = auth.currentUser?.email
      ? auth.currentUser.email
      : "";
    const dataRef = doc(db, "2024", currentUserEmail);
    await setDoc(
      dataRef,
      {
        [currentTime]: newData,
      },
      { merge: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        今日の睡眠は昨日の睡眠と比べてよく眠れたと思いますか？
      </Text>
      {/* ラジオボタン */}
      <View style={styles.buttonContainer}>
        {["かなりよく眠れた", "よく眠れた", "変わらない", "よく眠れなかった", "かなり眠れなかった"].map((answer) => (
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
        style={[styles.comfirmButton, { marginTop: 20 }]}
        onPress={() => {
          saveAnswer();
          navigation.navigate("Start");
        }}
      >
        <Text style={styles.comfirmButtonText}>決定</Text>
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
    paddingHorizontal: 20,
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
  comfirmButton: {
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  comfirmButtonText: {
    color: "white",
    fontSize: 24,
  },
});

export default QuestionScreen;
