import React from 'react';
// Change: Imported SafeAreaView for better layout on all devices
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Remove LinearGradient as it's not needed
// import { LinearGradient } from 'expo-linear-gradient'; 
import { Colors } from '../constants/Colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleAgree = () => {
    navigation.navigate('EditProfile');
  };

  return (
    // Change: Using SafeAreaView as the root component
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Change: This container will hold the top part (logo and title) and center it */}
        <View style={styles.mainContent}>
          {/* Change: Replaced LinearGradient with a simple View for a solid color */}
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/whatsapp-logo.png')}
              style={styles.logo}
            />
          </View>
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

// Change: Complete overhaul of the styles for a better match
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20, // Add some horizontal padding
    paddingBottom: 20, // Add padding at the bottom
  },
  mainContent: {
    flex: 1, // This will take up all available space, pushing the footer down
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 28, // A slightly higher radius for the "squircle" look
    backgroundColor: Colors.primary, // Using a solid color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  title: {
    fontSize: 32, // Increased font size for impact
    fontWeight: '600',
    color: Colors.black,
    marginTop: 40, // Spacing between logo and title
  },
  footer: {
    width: '100%', // Make footer take the full width
    alignItems: 'center',
  },
  policyText: {
    color: '#8696a0', // A softer color for the policy text, common in WhatsApp
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  linkText: {
    color: Colors.link, // Keep the link color
    // Removed textDecorationLine to match Figma
  },
  button: {
    width: '90%', // Use percentage for better responsiveness
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 25, // Half of height to make it a perfect pill
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16, // Slightly smaller font size
    fontWeight: '500', // Medium weight is common for buttons
  },
});

export default WelcomeScreen;