import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DashboardScreen } from "./screens/dashboard-screen";
import { ProjectsScreen } from "./screens/projects-screen";
import { AppointmentsScreen } from "./screens/appointments-screen";
import { InvoicesScreen } from "./screens/invoices-screen";
import { NotificationsScreen } from "./screens/notifications-screen";

const tabs = ["Dashboard", "Projects", "Appointments", "Invoices", "Notifications"] as const;

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Dashboard");

  const content =
    activeTab === "Dashboard" ? (
      <DashboardScreen />
    ) : activeTab === "Projects" ? (
      <ProjectsScreen />
    ) : activeTab === "Appointments" ? (
      <AppointmentsScreen />
    ) : activeTab === "Invoices" ? (
      <InvoicesScreen />
    ) : (
      <NotificationsScreen />
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Magnence Mobile</Text>
        <Text style={styles.subtitle}>Client + Team Companion App</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab ? styles.tabButtonActive : undefined]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabLabel, activeTab === tab ? styles.tabLabelActive : undefined]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.content}>{content}</View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 2,
    color: "#475569",
    fontSize: 13,
  },
  tabRow: {
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  tabButtonActive: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  tabLabel: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: "#1d4ed8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
});
