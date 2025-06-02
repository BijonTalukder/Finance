import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert("Error", "Please enter both phone number and password.");
      return;
    }

    // TODO: Call your login API here
    Alert.alert("Login", `Phone: ${phone}\nPassword: ${password}`);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-8">Login</Text>

      <Text className="text-sm mb-1">Phone Number</Text>
      <TextInput
        keyboardType="phone-pad"
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <Text className="text-sm mb-1">Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 rounded-md px-4 py-2 mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 py-3 rounded-md mb-4"
      >
        <Text className="text-center text-white font-semibold">Login</Text>
      </TouchableOpacity>

      <Text className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href={'/register'} className="text-blue-500 font-medium">
          Register
        </Link>
      </Text>
    </View>
  );
}
