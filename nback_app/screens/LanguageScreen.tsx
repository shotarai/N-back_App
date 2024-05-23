import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { StackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useLanguage } from '../contexts/LanguageContext';

const LanguageScreen: React.FC = () => {
  type homeScreenProp = StackNavigationProp<StackParamList>;
  const navigation = useNavigation<homeScreenProp>();
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>言語を選択してください</Text>
      <Text style={styles.questionText}>Select a Language</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.languageButton, language === 'ja' && styles.selectedButton]}
          onPress={() => setLanguage('ja')}
        >
          <Text style={styles.buttonText}>日本語</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.languageButton, language === 'en' && styles.selectedButton]}
          onPress={() => setLanguage('en')}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('Check')}
      >
        <Text style={styles.confirmButtonText}>{language === 'ja' ? '決定' : 'Decide'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  languageButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: 'blue',
    borderColor: 'darkblue',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default LanguageScreen;
