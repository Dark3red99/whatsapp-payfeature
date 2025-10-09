import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import ChatListItem from '../components/ChatListItem';
import { chatData, Chat } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Fix: Import from @react-navigation/stack
import { RootStackParamList } from '../navigation/AppNavigator'; // Fix: Import RootStackParamList

type ChatsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatRoom'>;

const ChatsScreen: React.FC = () => {
  const navigation = useNavigation<ChatsScreenNavigationProp>();

  const handleChatPress = (chat: Chat) => {
    navigation.navigate('ChatRoom', { chatName: chat.name });
  };

  const renderChatItem = ({ item }: ListRenderItemInfo<Chat>) => (
    <TouchableOpacity onPress={() => handleChatPress(item)}>
      <ChatListItem chat={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="camera-outline" size={28} color={Colors.black} />
          <Ionicons name="add-circle-outline" size={28} color={Colors.black} style={{ marginLeft: 15 }} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Ask Meta Al or Search" />
      </View>

      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  headerTitle: { fontSize: 34, fontWeight: '700' },
  headerIcons: { flexDirection: 'row' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F4F3', borderRadius: 10, marginHorizontal: 16, paddingHorizontal: 10, height: 43 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 17, color: Colors.textGray },
  separator: { height: 1, backgroundColor: Colors.separator, marginLeft: 90 },
});

export default ChatsScreen;