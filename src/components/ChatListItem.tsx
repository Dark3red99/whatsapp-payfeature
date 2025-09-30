import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../constants/Colors';
import { Chat } from '../data/mockData';

interface ChatListItemProps {
  chat: Chat;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  return (
    <View style={styles.container}>
      <Image source={chat.avatar} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name}>{chat.name}</Text>
          <Text style={styles.time}>{chat.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.message} numberOfLines={1}>{chat.lastMessage}</Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center' },
  avatar: { width: 57, height: 57, borderRadius: 28.5, marginRight: 15, backgroundColor: 'rgba(187.65, 251.81, 211.62, 0.73)' }, //
  content: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontSize: 18, fontWeight: '500', color: '#505050' }, //
  time: { fontSize: 16, color: '#7EBB9E' }, //
  message: { fontSize: 17, color: Colors.textGray }, //
  unreadBadge: { backgroundColor: '#1BAB5F', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }, //
  unreadText: { color: 'white', fontSize: 9, fontWeight: '500' }, //
});

export default ChatListItem;