import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const PropertiesLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="properties" options={{ href: null }} />
    </Tabs>
  );
};

export default PropertiesLayout;
