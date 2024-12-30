import { View, TouchableOpacity, Alert, Image } from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uploadProfileImage } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import { useState } from "react";

interface Props {
  currentAvatar?: string;
  onImageSelected?: () => void;
}

export default function CustomImagePicker({
  currentAvatar,
  onImageSelected,
}: Props) {
  const { refetch } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow access to your photos");
        return;
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0].uri) {
        setUploading(true);
        await uploadProfileImage(result.assets[0].uri);
        await refetch();
        onImageSelected?.();
        Alert.alert("Success", "Profile picture updated successfully");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile picture");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="relative">
      <Image
        source={{ uri: currentAvatar }}
        className="size-44 rounded-full"
        defaultSource={require("@/assets/images/avatar.png")}
      />
      <TouchableOpacity
        onPress={pickImage}
        disabled={uploading}
        className="absolute bottom-2 right-2 bg-white rounded-full p-2"
      >
        <Image
          source={icons.edit}
          className="size-6"
          style={{ opacity: uploading ? 0.5 : 1 }}
        />
      </TouchableOpacity>
    </View>
  );
}
