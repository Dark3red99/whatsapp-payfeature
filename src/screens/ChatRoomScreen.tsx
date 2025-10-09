// ChatRoomScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
  Keyboard,
  LayoutAnimation,
  UIManager,
  Alert,
  Dimensions,
  Animated,
  PanResponder,
  Easing,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../constants/Colors';

const stickerIcon = require('../../assets/images/stickericon.png');
const whatsappPayIcon = require('../../assets/images/roundedwhatsapppayicon.png');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ChatRoomRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: string;
}

interface PaymentData {
  walletNumber: string;
  amount: string;
  note?: string;
}

const attachmentOptions = [
  { id: 'document', label: 'Document', image: require('../../assets/images/roundeddocumenticon.png') },
  { id: 'camera', label: 'Camera', image: require('../../assets/images/roundedcameraicon.png') },
  { id: 'photos', label: 'Photos', image: require('../../assets/images/roundedphotosicon.png') },
  { id: 'location', label: 'Location', image: require('../../assets/images/roundedlocationicon.png') },
  { id: 'contact', label: 'Contact', image: require('../../assets/images/roundedcontacticon.png') },
  { id: 'order', label: 'Order', image: require('../../assets/images/roundedordericon.png') },
  { id: 'catalog', label: 'Catalog', image: require('../../assets/images/roundedcatalogicon.png') },
  { id: 'quick_replies', label: 'Quick replies', image: require('../../assets/images/roundedquickrepliesicon.png') },
  { id: 'poll', label: 'Poll', image: require('../../assets/images/roundedpollicon.png') },
  { id: 'event', label: 'Event', image: require('../../assets/images/roundedeventicon.png') },
  { id: 'whatsapp_pay', label: 'WhatsApp pay', image: whatsappPayIcon },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ChatRoomScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();
  const { chatName } = route.params;

  // Chat state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isAttachmentMenuVisible, setAttachmentMenuVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  // Payment
  const [payment, setPayment] = useState<PaymentData>({ walletNumber: '', amount: '', note: '' });

  // Sheet config
  const SHEET_HEIGHT = Math.round(SCREEN_HEIGHT * 0.6);
  const CLOSED_Y = SHEET_HEIGHT;
  const OPEN_Y = 0;

  // Animated values
  const translateY = useRef(new Animated.Value(CLOSED_Y)).current;
  const overlayOpacity = translateY.interpolate({
    inputRange: [0, CLOSED_Y],
    outputRange: [0.6, 0],
    extrapolate: 'clamp',
  });

  // track state
  const lastTranslateY = useRef<number>(CLOSED_Y);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
      if (isAttachmentMenuVisible) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAttachmentMenuVisible(false);
      }
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [isAttachmentMenuVisible]);

  // Pan responder for swipe-down-to-close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        const newY = Math.min(CLOSED_Y, Math.max(OPEN_Y, lastTranslateY.current + gesture.dy));
        translateY.setValue(newY);
      },
      onPanResponderRelease: (_, gesture) => {
        const currentY = lastTranslateY.current + gesture.dy;
        const shouldClose = currentY > SHEET_HEIGHT * 0.25 || gesture.vy > 1.2;
        if (shouldClose) {
          Animated.timing(translateY, {
            toValue: CLOSED_Y,
            duration: 180,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
          }).start(() => {
            lastTranslateY.current = CLOSED_Y;
            setIsSheetOpen(false);
          });
        } else {
          Animated.spring(translateY, {
            toValue: OPEN_Y,
            bounciness: 8,
            useNativeDriver: false,
          }).start(() => {
            lastTranslateY.current = OPEN_Y;
            setIsSheetOpen(true);
          });
        }
      },
    })
  ).current;

  // Open and close helpers
  const openSheet = () => {
    Keyboard.dismiss();
    setIsSheetOpen(true);
    Animated.spring(translateY, {
      toValue: OPEN_Y,
      bounciness: 8,
      useNativeDriver: false,
    }).start(() => {
      lastTranslateY.current = OPEN_Y;
    });
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: CLOSED_Y,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      lastTranslateY.current = CLOSED_Y;
      setIsSheetOpen(false);
    });
  };

  // messages
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [newMessage, ...prev]);
      setMessage('');
    }
  };

  const toggleAttachmentMenu = () => {
    Keyboard.dismiss();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAttachmentMenuVisible((prev) => !prev);
  };

  const handleAttachmentPress = (id: string) => {
    if (id === 'whatsapp_pay') {
      setAttachmentMenuVisible(false);
      openSheet();
    } else {
      console.log('attachment pressed', id);
    }
  };

  const handleSendPayment = async () => {
    const wallet = payment.walletNumber?.trim();
    const amount = payment.amount?.trim();

    if (!wallet || !amount) {
      Alert.alert('Missing details', 'Please enter an amount and wallet number.');
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 900));

      const newMessage: Message = {
        id: Date.now().toString(),
        text: `₵${amount} payment sent via WhatsApp Pay\nWallet: ${wallet}`,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [newMessage, ...prev]);
      setPayment({ walletNumber: '', amount: '', note: '' });
      closeSheet();
      Alert.alert('Payment Sent', `₵${amount} sent to ${wallet}`);
    } catch {
      Alert.alert('Payment failed', 'Please try again.');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sent ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.sent && (
          <Ionicons name="checkmark" size={16} color={Colors.gray} style={styles.messageTick} />
        )}
      </View>
    </View>
  );

  const AttachmentMenu = () => (
    <View style={[styles.attachmentMenu, { paddingBottom: insets.bottom || 20 }]}>
      <FlatList
        data={attachmentOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.attachmentOption}
            onPress={() => handleAttachmentPress(item.id)}
          >
            <Image source={item.image} style={styles.attachmentIcon} />
            <Text style={styles.attachmentLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.attachmentList}
      />
    </View>
  );

  const sheetAnimatedStyle = { transform: [{ translateY }] };

  return (
    <View style={styles.container}>
      {/* ✅ FIXED KeyboardAvoidingView configuration */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            {/* header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={Colors.black} />
              </TouchableOpacity>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color={Colors.white} />
              </View>
              <Text style={styles.headerTitle}>{chatName}</Text>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="videocam-outline" size={26} color={Colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="call-outline" size={23} color={Colors.black} />
              </TouchableOpacity>
            </View>

            {/* chat + input */}
            <View style={{ flex: 1 }}>
              <ImageBackground
                source={require('../../assets/images/whatsapp-bg.png')}
                style={styles.chatBackground}
              >
                <FlatList
                  data={messages}
                  renderItem={renderMessage}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    paddingBottom: (footerHeight || 0) + (insets.bottom || 8) + 8,
                  }}
                  inverted
                />
              </ImageBackground>

              {/* ✅ FIXED Footer padding behavior */}
              <View
                onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
                style={[
                  styles.footer,
                  {
                    paddingBottom:
                      Platform.OS === 'ios'
                        ? isKeyboardVisible
                          ? 0
                          : insets.bottom || 8
                        : 0,
                  },
                ]}
              >
                <TouchableOpacity style={styles.plusIcon} onPress={toggleAttachmentMenu}>
                  <Ionicons name="add" size={30} color={Colors.black} />
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Message"
                    placeholderTextColor="#8E8E93"
                    value={message}
                    onChangeText={setMessage}
                    onFocus={() => {
                      if (isAttachmentMenuVisible) {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setAttachmentMenuVisible(false);
                      }
                    }}
                    multiline
                  />
                  <TouchableOpacity>
                    <Image source={stickerIcon} style={styles.stickerIcon} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.cameraButton}>
                  <Ionicons name="camera-outline" size={26} color={Colors.black} />
                </TouchableOpacity>

                {message ? (
                  <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Ionicons
                      name="send"
                      size={16}
                      color={Colors.white}
                      style={{ marginLeft: 2 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.micButton}>
                    <Ionicons name="mic-outline" size={26} color={Colors.black} />
                  </TouchableOpacity>
                )}
              </View>

              {isAttachmentMenuVisible && <AttachmentMenu />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* ✅ Optional Android stabilizer */}
      {Platform.OS === 'android' && <View style={{ height: insets.bottom }} />}

      {/* overlay + sheet */}
      <Animated.View pointerEvents={isSheetOpen ? 'auto' : 'none'} style={[styles.overlayContainer]}>
        <TouchableWithoutFeedback onPress={closeSheet}>
          <Animated.View style={[styles.dimOverlay, { opacity: overlayOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.sheetContainer, sheetAnimatedStyle]}
          {...panResponder.panHandlers}
        >
          <View style={styles.grabberContainer}>
            <View style={styles.grabber} />
          </View>

          <Text style={styles.overlayTitle}>WhatsApp Pay 💳</Text>

          <TextInput
            style={styles.overlayInputAmount}
            placeholder="Amount (₵)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={payment.amount}
            onChangeText={(t) => setPayment((p) => ({ ...p, amount: t }))}
            returnKeyType="done"
          />

          <TextInput
            style={styles.overlayInput}
            placeholder="Wallet number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={payment.walletNumber}
            onChangeText={(t) => setPayment((p) => ({ ...p, walletNumber: t }))}
          />

          <TextInput
            style={[styles.overlayInput, { height: 80 }]}
            placeholder="Note (optional)"
            placeholderTextColor="#999"
            multiline
            value={payment.note}
            onChangeText={(t) => setPayment((p) => ({ ...p, note: t }))}
          />

          <TouchableOpacity style={styles.proceedButton} onPress={handleSendPayment}>
            <Text style={styles.proceedButtonText}>Send Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={closeSheet}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
    backgroundColor: '#F4F4F4',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D1D1D6',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
    color: Colors.black,
  },
  headerIcon: { padding: 5, marginLeft: 15 },
  chatBackground: { flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
    backgroundColor: '#F4F4F4',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D1D1D6',
  },
  plusIcon: { marginRight: 10 },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    minHeight: 36,
    maxHeight: 100,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D1D6',
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    color: Colors.black,
    paddingVertical: 7,
    marginRight: 8,
  },
  stickerIcon: { width: 24, height: 24 },
  cameraButton: { marginLeft: 12 },
  micButton: { marginLeft: 12 },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginVertical: 4,
  },
  sentMessage: { alignSelf: 'flex-end', backgroundColor: '#D9FDD3' },
  receivedMessage: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF' },
  messageText: { fontSize: 16, color: Colors.black },
  messageFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 2, alignSelf: 'flex-end' },
  timestamp: { fontSize: 12, color: '#888', marginRight: 4 },
  messageTick: { marginTop: 1 },
  attachmentMenu: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D1D1D6',
  },
  attachmentList: { paddingVertical: 16, paddingHorizontal: 10 },
  attachmentOption: { alignItems: 'center', width: '25%', marginBottom: 18 },
  attachmentIcon: { width: 60, height: 60, marginBottom: 6 },
  attachmentLabel: { fontSize: 13, color: '#333' },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheetContainer: {
    height: Math.round(SCREEN_HEIGHT * 0.6),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  grabberContainer: { alignItems: 'center', marginBottom: 6 },
  grabber: { width: 40, height: 4, backgroundColor: '#CCC', borderRadius: 2 },
  overlayTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  overlayInput: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  overlayInputAmount: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  proceedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  proceedButtonText: { color: '#FFF', fontSize: 17, fontWeight: '600' },
  cancelButton: { alignItems: 'center', marginTop: 14 },
  cancelText: { color: '#777', fontSize: 16 },
});

export default ChatRoomScreen;
