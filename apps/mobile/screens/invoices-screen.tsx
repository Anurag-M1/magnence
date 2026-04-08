import { Text } from "react-native";
import { Card } from "../components/card";

export function InvoicesScreen() {
  return (
    <>
      <Card title="INV-001" subtitle="$1,200 • SENT">
        <Text style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>Tap to open Stripe checkout in-app webview (next module).</Text>
      </Card>
      <Card title="INV-002" subtitle="$2,900 • PAID" />
    </>
  );
}
