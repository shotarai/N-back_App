import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { StackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useLanguage } from '../contexts/LanguageContext';
import { useCheckContext } from '../contexts/CheckContext';

interface CheckScreenProps {
  currentTime: string;
}

const CheckScreen: React.FC<CheckScreenProps> = ({ currentTime }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  type homeScreenProp = StackNavigationProp<StackParamList>;
  const navigation = useNavigation<homeScreenProp>();
  const { language } = useLanguage();
  const { setIsCheckedBool } = useCheckContext();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {language === 'ja' ? (
          <Text style={styles.questionText}>
            あなたは今日Ouraアプリで睡眠データを確認しないというルールを遵守しましたか？
          </Text>
        ) : (
          <Text style={styles.questionText}>
            Please make sure that you haven't checked todays Oura data yet?
          </Text>
        )}
        <TouchableOpacity
          style={[styles.checkBox, isChecked && styles.checkBoxChecked]}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <Text style={styles.checkBoxText}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            setIsCheckedBool(isChecked);
            navigation.navigate("Question");
          }}
        >
          {language === 'ja' ? (
            <Text style={styles.buttonText}>決定</Text>
          ) : (
            <Text style={styles.buttonText}>Decide</Text>
          )}
        </TouchableOpacity>
      </View>
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
