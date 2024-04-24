import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

interface CheckScreenProps {
  currentTime: string;
}

const CheckScreen: React.FC<CheckScreenProps> = ({ currentTime }) => {
  const [endBool, setEndbool] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const saveAnswer = async () => {
    const newData = {
      checkbox: {
        ルールを遵守: isChecked ? "ルールを厳守している" : "ルールを破ってしまった",
      },
    };
    const currentUserEmail = auth.currentUser?.email ? auth.currentUser.email : "";
    const dataRef = doc(db, "2024", currentUserEmail);
    await setDoc(
      dataRef,
      {
        [currentTime]: newData,
      },
      { merge: true }
    );
    setEndbool(false);
  };

  return (
    <View style={styles.container}>
      {endBool ? (
        <View style={styles.container}>
          <Text style={styles.questionText}>
            あなたは今日Ouraアプリで睡眠データを確認しないというルールを遵守しましたか？
          </Text>
          <TouchableOpacity
            style={[styles.checkBox, isChecked && styles.checkBoxChecked]}
            onPress={() => setIsChecked(!isChecked)}
          >
            {isChecked && <Text style={styles.checkBoxText}>✓</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => {
              saveAnswer();
            }}
          >
            <Text style={styles.buttonText}>決定</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.questionText}>データ送信が完了しました</Text>
          <Text style={styles.questionText}>アプリを終了してください</Text>
        </View>
      )}
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
  checkBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkBoxChecked: {
    backgroundColor: "blue",
  },
  checkBoxText: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default CheckScreen;
