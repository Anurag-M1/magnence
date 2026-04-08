import { Text } from "react-native";
import { Card } from "../components/card";

export function DashboardScreen() {
  return (
    <>
      <Card title="Monthly Revenue" subtitle="$48,200 (MoM +12%)" />
      <Card title="Lead Conversion Rate" subtitle="21.8%" />
      <Card title="Active Projects" subtitle="12 projects running">
        <Text style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>
          This screen is designed for offline-first summary caching in later iterations.
        </Text>
      </Card>
    </>
  );
}
