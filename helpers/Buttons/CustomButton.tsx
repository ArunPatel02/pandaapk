import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

const CustomButton = ({
  ButtonText,
  onPress = () => {},
  disable,
}: {
  ButtonText: String;
  onPress?: any;
  disable?: boolean;
}) => {
  return (
    <TouchableHighlight
      className={`rounded-lg mt-4 ${
        disable ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onPress={onPress}
      disabled={disable}
    >
      <View
        className={`w-full ${
          disable ? "bg-background-600" : "bg-primary"
        } py-2 rounded-lg `}
      >
        <Text
          className={`text-2xl ${
            disable ? "text-typography-300" : "text-typography-0"
          } font-semibold text-center`}
        >
          {ButtonText}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default CustomButton;
