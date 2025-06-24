// import { useRouter } from 'expo-router';
import { router } from 'expo-router';
import React, { useState } from 'react';

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// import { useAuthStore } from '../store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLoading=0;
  // const { login, isLoading, error } = useAuthStore()
  // const router = useRouter()

  const handleLogin = async () => {
            router.push("/OnboardingScreen")
    
    // await login(email, password)
    // const { token } = useAuthStore.getState()
    // if (token) {
    //   router.replace('/dashboard')
    // } else {
    //   Alert.alert('Login Failed', error || 'Check your credentials')
    // }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center text-blue-600 mb-8">
        Login
      </Text>

      <Text className="text-sm font-medium mb-1">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <Text className="text-sm font-medium mb-1">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        className="border border-gray-300 rounded-md px-4 py-2 mb-6"
      />

      {isLoading ? (
        <ActivityIndicator size="small" color="#2563EB" />
      ) : (
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 py-3 rounded-md"
        >
          <Text className="text-white text-center font-medium text-lg">
            Sign In
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => router.push('/register')}
        className="mt-6"
      >
        <Text className="text-center text-blue-600 underline">
          Don’t have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  )
}
