import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type CardProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#475569",
  },
});
