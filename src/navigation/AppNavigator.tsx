import React from 'react';
import { View, Text, Image } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import WelcomeScreen from '../screens/WelcomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ToolsScreen from '../screens/ToolsScreen';
import CallsScreen from '../screens/CallsScreen';
import SettingsScreen from '../screens/SettingsScreen'; 
import { Colors } from '../constants/Colors';

// Define types for screen parameters
export type RootStackParamList = {
  Welcome: undefined;
  EditProfile: undefined;
  Main: undefined;
  ChatRoom: { chatName: string };
};

export type MainTabParamList = {
  Updates: undefined;
  Calls: undefined;
  Tools: undefined;
  Chats: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();


const UpdatesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Updates</Text> {/* Wrapped text in <Text> */}
  </View>
);


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<MainTabParamList, keyof MainTabParamList> }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === 'Updates') {
            iconSource = require('../../assets/images/whatsapp-status.png'); // Use provided image for Updates
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? Colors.primary : Colors.gray, 
                }}
              />
            );
          } else if (route.name === 'Tools') {
            iconSource = require('../../assets/images/tools.png'); 
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? Colors.primary : Colors.gray, 
                }}
              />
            );
          } else if (route.name === 'Settings') {
            iconSource = require('../../assets/images/settings.png'); 
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? Colors.primary : Colors.gray, 
                }}
              />
            );
          } else if (route.name === 'Calls') {
            return <Ionicons name="call-outline" size={size} color={color} />; 
          } else if (route.name === 'Chats') {
            return <Ionicons name="chatbubble-outline" size={size} color={color} />; 
          }
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Updates" component={UpdatesScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
  <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}