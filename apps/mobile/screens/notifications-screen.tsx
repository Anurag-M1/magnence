import { Text } from "react-native";
import { Card } from "../components/card";

export function NotificationsScreen() {
  return (
    <>
      <Card title="New Lead Assigned" subtitle="2 min ago">
        <Text style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>
          Socket-driven realtime updates and push notifications are wired in API scaffolding.
        </Text>
      </Card>
      <Card title="Invoice Paid" subtitle="Today 09:10" />
    </>
  );
}
