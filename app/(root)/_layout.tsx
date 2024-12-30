import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AppLayout = () => {
  const { loading, isLoggedin } = useGlobalContext();
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }
  if (!isLoggedin) return <Redirect href="/sign-in" />;
  return <Slot />;
};

export default AppLayout;
