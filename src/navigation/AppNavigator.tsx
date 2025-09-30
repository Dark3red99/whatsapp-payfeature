import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ToolsScreen from '../screens/ToolsScreen';
import { Colors } from '../constants/Colors';

// Define types for screen parameters
export type RootStackParamList = {
  Welcome: undefined;
  EditProfile: undefined;
  Main: undefined;
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

// Placeholder screens for the tab navigator
const UpdatesScreen = () => null;
const CallsScreen = () => null;
const SettingsScreen = () => null;

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<MainTabParamList, keyof MainTabParamList> }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help'; // Provide a default icon
          if (route.name === 'Updates') {
            iconName = focused ? 'cellular' : 'cellular-outline';
          } else if (route.name === 'Calls') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === 'Tools') {
            iconName = focused ? 'hammer' : 'hammer-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
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
    </Stack.Navigator>
  );
}