import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation<EditProfileScreenNavigationProp>();
    const [name, setName] = useState<string>('');

    const handleDone = () => {
        navigation.navigate('Main');
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Edit profile</Text>
      <Text style={styles.subHeader}>Enter your name and add an optional profile picture</Text>
      
      <View style={styles.profilePicContainer}>
        <View style={styles.profilePic}>
            <Ionicons name="camera" size={32} color={Colors.gray} />
        </View>
        <Text style={styles.editButton}>Edit</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Your name" //
            value={name}
            onChangeText={setName}
            placeholderTextColor={Colors.gray}
        />
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center' },
  header: { fontSize: 22, fontWeight: '500', marginTop: 50, color: Colors.black }, //
  subHeader: { fontSize: 16, color: Colors.gray, textAlign: 'center', marginTop: 15, paddingHorizontal: 40 }, //
  profilePicContainer: { marginTop: 40, alignItems: 'center' },
  profilePic: { width: 69, height: 69, borderRadius: 34.5, backgroundColor: Colors.lightGreen, justifyContent: 'center', alignItems: 'center' }, //
  editButton: { fontSize: 14, color: Colors.primaryDark, marginTop: 8 }, //
  inputContainer: { width: '90%', height: 56, backgroundColor: 'rgba(217, 217, 217, 0.50)', borderRadius: 5, marginTop: 30, justifyContent: 'center' }, //
  input: { fontSize: 20, paddingLeft: 20, color: Colors.black }, //
  doneButton: { width: '90%', height: 45, backgroundColor: 'rgba(217, 217, 217, 0.50)', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 150 }, //
  doneButtonText: { fontSize: 20, color: Colors.black }, //
});

export default EditProfileScreen;