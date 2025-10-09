import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Use SafeAreaView from safe-area-context
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/Colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleAgree = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Image
            source={require('../../assets/images/whatsapp-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to WhatsApp</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.policyText}>
            Read our <Text style={styles.linkText}>Privacy Policy</Text>. Tap "Agree and continue" to accept the{' '}
            <Text style={styles.linkText}>Terms of Service</Text>.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleAgree}>
            <Text style={styles.buttonText}>Agree and continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 40,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  policyText: {
    color: '#8696a0',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  linkText: {
    color: Colors.link,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;