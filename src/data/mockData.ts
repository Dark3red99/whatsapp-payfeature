import { ImageSourcePropType } from "react-native";

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: ImageSourcePropType;
}

export const chatData: Chat[] = [
  {
    id: '1',
    name: 'Bismark Darfour', //
    lastMessage: 'Alright', //
    time: 'Tuesday', //
    unreadCount: 1, //
    avatar: require('../../assets/images/user-placeholder.png'),
  },
  {
    id: '2',
    name: 'Adwoa', //
    lastMessage: 'Hello J', //
    time: 'Tuesday', //
    unreadCount: 1, //
    avatar: require('../../assets/images/user-placeholder.png'),
  },
  {
    id: '3',
    name: 'Rana', //
    lastMessage: 'Ttyl', //
    time: 'Tuesday', //
    unreadCount: 1, //
    avatar: require('../../assets/images/user-placeholder.png'),
  },
  {
    id: '4',
    name: 'Carlin Anim', //
    lastMessage: 'I’ll see you later', //
    time: 'Tuesday', //
    unreadCount: 1, //
    avatar: require('../../assets/images/user-placeholder.png'),
  },
  {
    id: '5',
    name: 'Freda', //
    lastMessage: 'Hello Joel', //
    time: 'Tuesday', //
    unreadCount: 1, //
    avatar: require('../../assets/images/user-placeholder.png'),
  },
];