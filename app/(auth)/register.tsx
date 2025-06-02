import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface FormData {
  name: string;
  phone: string;
  password: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  password?: string;
}

interface NavigationProp {
  goBack: () => void;
}

interface RegisterProps {
  navigation: NavigationProp;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      //link dashboard
      Alert.alert(
        'Success',
        'Registration successful!',
        // [{ text: 'OK', onPress: () => navigation.goBack() }]
        router.push("/dashboard/dashboard")
      );
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
            <TouchableOpacity
              onPress={handleBack}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
            
            <Text className="text-lg font-semibold text-gray-900">
              Create Account
            </Text>
            
            <View className="w-10" />
          </View>

          {/* Content */}
          <View className="flex-1 px-6 py-8">
            {/* Welcome Text */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Welcome!
              </Text>
              <Text className="text-gray-600 text-base">
                Please fill in the details to create your account
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-6">
              {/* Name Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </Text>
                <View className={`border rounded-xl px-4 py-3 ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <TextInput
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    className="text-base text-gray-900"
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                {errors.name && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.name}
                  </Text>
                )}
              </View>

              {/* Phone Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </Text>
                <View className={`border rounded-xl px-4 py-3 ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <TextInput
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#9CA3AF"
                    className="text-base text-gray-900"
                    keyboardType="phone-pad"
                    autoCorrect={false}
                  />
                </View>
                {errors.phone && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.phone}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <View className={`border rounded-xl px-4 py-3 flex-row items-center ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <TextInput
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder="Create a strong password"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-base text-gray-900"
                    secureTextEntry={!showPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-3"
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#9CA3AF" 
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Password Requirements */}
              <View className="bg-blue-50 rounded-xl p-4">
                <Text className="text-sm text-blue-800 font-medium mb-2">
                  Password Requirements:
                </Text>
                <View className="space-y-1">
                  <Text className="text-sm text-blue-700">
                    • At least 6 characters long
                  </Text>
                  <Text className="text-sm text-blue-700">
                    • Contains uppercase and lowercase letters
                  </Text>
                  <Text className="text-sm text-blue-700">
                    • Contains at least one number
                  </Text>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <View className="mt-8">
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                className={`rounded-xl py-4 items-center ${
                  isLoading 
                    ? 'bg-gray-300' 
                    : 'bg-blue-600 shadow-lg shadow-blue-600/25'
                }`}
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-base">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <View className="mt-6">
              <Text className="text-center text-sm text-gray-600">
                By creating an account, you agree to our{' '}
                <Text className="text-blue-600 font-medium">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-blue-600 font-medium">Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;