import { Text } from "react-native";
import { Card } from "../components/card";

export function ProjectsScreen() {
  return (
    <>
      <Card title="Client Portal Revamp" subtitle="IN_PROGRESS • Deadline: 2026-05-10">
        <Text style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>8 tasks done, 3 in review.</Text>
      </Card>
      <Card title="Lead Automation Stack" subtitle="REVIEW • Deadline: 2026-04-26">
        <Text style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>Awaiting client sign-off on workflow docs.</Text>
      </Card>
    </>
  );
}
