import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <View style={styles.statCard}>
        <Ionicons name={icon} size={24} color={Colors.iconGray} />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
    </View>
);

interface ToolItemProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  hasSeparator?: boolean;
}

const ToolItem: React.FC<ToolItemProps> = ({ title, subtitle, icon, hasSeparator = true }) => (
    <>
    <View style={styles.toolItem}>
        <Ionicons name={icon} size={24} color={Colors.iconGray} style={styles.toolIcon} />
        <View style={styles.toolTextContainer}>
            <Text style={styles.toolTitle}>{title}</Text>
            <Text style={styles.toolSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
    </View>
    {hasSeparator && <View style={styles.separator} />}
    </>
);

const ToolsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>Tools</Text>
            <Text style={styles.subHeader}>Last 7 days performance</Text>
            
            <View style={styles.statsContainer}>
                <StatCard title={"Conversations\nstarted"} value="0" icon="chatbubbles-outline" />
                <StatCard title="Catalog views" value="-" icon="eye-outline" />
                <StatCard title="Status views" value="-" icon="analytics-outline" />
            </View>

            <View style={styles.adCard}>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="megaphone" size={30} color={Colors.primary} />
                    <View style={{marginLeft: 15}}>
                        <Text style={styles.adTitle}>Create your first ad from $1.00/day</Text>
                        <Text style={styles.adSubtitle}>Reach potential customers with an ad that starts WhatsApp chats.</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.adButton}>
                    <Text style={styles.adButtonText}>Get started</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionHeader}>Grow your business</Text>
            <View style={styles.toolsList}>
                <ToolItem title="Catalog" subtitle="Show products and services" icon="folder-outline" />
                <ToolItem title="Advertise" subtitle="Create ads that lead to WhatsApp" icon="megaphone-outline" />
                <ToolItem title="Trade" subtitle="Open P2P trades with customers in a secured way" icon="swap-horizontal-outline" />
                <ToolItem title="Orders" subtitle="Manage orders and payments" icon="receipt-outline" hasSeparator={false} />
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.background }, //
    container: { flex: 1, paddingHorizontal: 24, },
    headerTitle: { fontSize: 35, fontWeight: '700', color: '#1F1F1F', marginTop: 20 }, //
    subHeader: { fontSize: 15, fontWeight: '500', color: '#9A9A9A', marginBottom: 20 }, //
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statCard: { flex: 1, height: 95, backgroundColor: Colors.white, borderRadius: 5, padding: 10, marginRight: 10 }, //
    statValue: { fontSize: 15, fontWeight: '400', color: '#444444', marginTop: 15 }, //
    statTitle: { fontSize: 13, color: '#A6A6A6', marginTop: 5, lineHeight: 17 }, //
    adCard: { backgroundColor: Colors.white, borderRadius: 10, padding: 15, marginBottom: 30 }, //
    adTitle: { fontSize: 16, fontWeight: '500', color: '#3A3A3A', lineHeight: 19 }, //
    adSubtitle: { fontSize: 13, color: '#A6A6A6', marginTop: 5, lineHeight: 17 }, //
    adButton: { backgroundColor: '#151514', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 15, alignSelf: 'flex-start', marginTop: 15, marginLeft: 45 }, //
    adButtonText: { color: '#B0B1B1', fontSize: 14, fontWeight: '500' }, //
    sectionHeader: { fontSize: 18, fontWeight: '500', color: '#3B3B3B', marginBottom: 10 }, //
    toolsList: { backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10 }, //
    toolItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, },
    toolIcon: { width: 40, textAlign: 'center' },
    toolTextContainer: { flex: 1, marginLeft: 10, },
    toolTitle: { fontSize: 18, color: '#474747' }, //
    toolSubtitle: { fontSize: 12, color: '#AAAAAA', marginTop: 2 }, //
    separator: { height: 1, backgroundColor: Colors.separator, marginLeft: 65 }, //
});

export default ToolsScreen;