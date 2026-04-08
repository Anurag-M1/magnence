import { Text } from "react-native";
import { Card } from "../components/card";

export function AppointmentsScreen() {
  return (
    <>
      <Card title="Discovery Call" subtitle="2026-04-10 14:30 IST">
        <Text style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>Timezone aware reminders and reschedule controls go here.</Text>
      </Card>
      <Card title="Sprint Review" subtitle="2026-04-13 17:00 IST" />
    </>
  );
}
