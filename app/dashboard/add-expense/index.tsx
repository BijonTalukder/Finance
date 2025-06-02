import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface ExpenseForm {
  expenseType: string;
  amount: string;
  description: string;
  date: string;
}

interface FormErrors {
  expenseType?: string;
  amount?: string;
  description?: string;
  date?: string;
}

interface NavigationProp {
  goBack: () => void;
  navigate: (screen: string, params?: any) => void;
}

interface AddExpenseScreenProps {
  navigation: NavigationProp;
}

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<ExpenseForm>({
    expenseType: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const expenseTypes = [
    { id: 1, label: 'Groceries', icon: 'basket-outline', color: '#10B981' },
    { id: 2, label: 'Utilities', icon: 'flash-outline', color: '#F59E0B' },
    { id: 3, label: 'Rent', icon: 'home-outline', color: '#3B82F6' },
    { id: 4, label: 'Food & Dining', icon: 'restaurant-outline', color: '#EF4444' },
    { id: 5, label: 'Transportation', icon: 'car-outline', color: '#8B5CF6' },
    { id: 6, label: 'Entertainment', icon: 'musical-notes-outline', color: '#EC4899' },
    { id: 7, label: 'Healthcare', icon: 'medical-outline', color: '#06B6D4' },
    { id: 8, label: 'Miscellaneous', icon: 'ellipsis-horizontal-outline', color: '#6B7280' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.expenseType) {
      newErrors.expenseType = 'Please select an expense type';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 3) {
      newErrors.description = 'Description must be at least 3 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ExpenseForm, value: string): void => {
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

  const handleExpenseTypeSelect = (type: string): void => {
    handleInputChange('expenseType', type);
    setShowDropdown(false);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Success',
        'Expense added successfully!',
        [
          { 
            text: 'Add Another', 
            style: 'default',
            onPress: () => {
              setFormData({
                expenseType: '',
                amount: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
              });
              setErrors({});
            }
          },
          { 
            text: 'Go Back', 
            style: 'cancel',
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedExpenseType = () => {
    return expenseTypes.find(type => type.label === formData.expenseType);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-white px-6 py-4 shadow-sm border-b border-gray-100">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
            
            <Text className="text-lg font-semibold text-gray-900">
              Add Expense
            </Text>
            
            <View className="w-10" />
          </View>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-6">
            {/* Form Header */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                New Expense
              </Text>
              <Text className="text-gray-600">
                Add details for your room expense
              </Text>
            </View>

            {/* Form Fields */}
            <View className="space-y-6">
              {/* Expense Type Dropdown */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Expense Type *
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDropdown(true)}
                  className={`border rounded-xl px-4 py-4 flex-row items-center justify-between ${
                    errors.expenseType ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    {getSelectedExpenseType() && (
                      <View 
                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: `${getSelectedExpenseType()?.color}20` }}
                      >
                        <Ionicons 
                          name={getSelectedExpenseType()?.icon as any} 
                          size={16} 
                          color={getSelectedExpenseType()?.color} 
                        />
                      </View>
                    )}
                    <Text className={`text-base ${
                      formData.expenseType ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {formData.expenseType || 'Select expense type'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                {errors.expenseType && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.expenseType}
                  </Text>
                )}
              </View>

              {/* Amount Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </Text>
                <View className={`border rounded-xl px-4 py-4 flex-row items-center ${
                  errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}>
                  <Text className="text-lg font-medium text-gray-600 mr-2">₹</Text>
                  <TextInput
                    value={formData.amount}
                    onChangeText={(value) => handleInputChange('amount', value)}
                    placeholder="0.00"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-base text-gray-900"
                    keyboardType="numeric"
                    autoCorrect={false}
                  />
                </View>
                {errors.amount && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.amount}
                  </Text>
                )}
              </View>

              {/* Description Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Description *
                </Text>
                <View className={`border rounded-xl px-4 py-4 ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}>
                  <TextInput
                    value={formData.description}
                    onChangeText={(value) => handleInputChange('description', value)}
                    placeholder="What was this expense for?"
                    placeholderTextColor="#9CA3AF"
                    className="text-base text-gray-900"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    autoCorrect={true}
                  />
                </View>
                {errors.description && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.description}
                  </Text>
                )}
              </View>

              {/* Date Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Date *
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className={`border rounded-xl px-4 py-4 flex-row items-center justify-between ${
                    errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={20} color="#6B7280" className="mr-3" />
                    <Text className="text-base text-gray-900 ml-3">
                      {formatDate(formData.date)}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                {errors.date && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.date}
                  </Text>
                )}
              </View>
            </View>

            {/* Submit Button */}
            <View className="mt-12">
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                className={`rounded-xl py-4 flex-row items-center justify-center ${
                  isLoading 
                    ? 'bg-gray-300' 
                    : 'bg-blue-600 shadow-lg shadow-blue-600/25'
                }`}
                activeOpacity={0.8}
              >
                {isLoading && (
                  <View className="mr-2">
                    <Ionicons name="refresh" size={20} color="white" />
                  </View>
                )}
                <Text className="text-white font-semibold text-base">
                  {isLoading ? 'Adding Expense...' : 'Add Expense'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Expense Type Modal */}
        <Modal
          visible={showDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDropdown(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl max-h-96">
              <View className="p-6 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-gray-900">
                    Select Expense Type
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDropdown(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                  >
                    <Ionicons name="close" size={20} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <ScrollView className="max-h-80">
                {expenseTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => handleExpenseTypeSelect(type.label)}
                    className="px-6 py-4 flex-row items-center border-b border-gray-50"
                    activeOpacity={0.7}
                  >
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: `${type.color}20` }}
                    >
                      <Ionicons name={type.icon as any} size={20} color={type.color} />
                    </View>
                    <Text className="text-base text-gray-900 flex-1">
                      {type.label}
                    </Text>
                    {formData.expenseType === type.label && (
                      <Ionicons name="checkmark" size={20} color="#10B981" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;