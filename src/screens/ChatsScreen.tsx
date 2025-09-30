import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, ListRenderItemInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import ChatListItem from '../components/ChatListItem';
import { chatData, Chat } from '../data/mockData';

const ChatsScreen: React.FC = () => {
  const renderFilterButton = (text: string, isSelected: boolean = false) => (
    <View style={[styles.filterButton, isSelected && styles.filterButtonSelected]}>
      <Text style={styles.filterText}>{text}</Text>
    </View>
  );

  const renderChatItem = ({ item }: ListRenderItemInfo<Chat>) => <ChatListItem chat={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="camera-outline" size={28} color={Colors.black} />
          <Ionicons name="add-circle-outline" size={28} color={Colors.black} style={{marginLeft: 15}}/>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Ask Meta Al or Search" //
        />
      </View>

      <View style={styles.filters}>
        {renderFilterButton('All', true)}
        {renderFilterButton('Unread 9')}
        {renderFilterButton('Favorites')}
        {renderFilterButton('Groups 4')}
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
  headerTitle: { fontSize: 34, fontWeight: '700' }, //
  headerIcons: { flexDirection: 'row' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F4F3', borderRadius: 10, marginHorizontal: 16, paddingHorizontal: 10, height: 43 }, //
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 17, color: Colors.textGray },
  filters: { flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 16 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 35, borderWidth: 0.5, borderColor: Colors.gray, marginRight: 8 }, //
  filterButtonSelected: { backgroundColor: 'rgba(162, 234, 189, 0.89)', borderColor: Colors.gray }, //
  filterText: { color: '#959595', fontWeight: '500' }, //
  separator: { height: 1, backgroundColor: Colors.separator, marginLeft: 90 }, //
});

export default ChatsScreen;