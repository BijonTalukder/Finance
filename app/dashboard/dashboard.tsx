import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface ExpenseData {
  totalRoomExpense: number;
  myPaid: number;
  myDue: number; // positive = I owe, negative = others owe me
}

const HomeDashboard: React.FC = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    totalRoomExpense: 0,
    myPaid: 0,
    myDue: 0
  });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('John');

  const navigation = useNavigation();

  const fetchExpenseData = async (): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExpenseData({
        totalRoomExpense: 2450.75,
        myPaid: 850.25,
        myDue: -125.5
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch expense data');
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    await fetchExpenseData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const formatCurrency = (amount: number): string => {
    return `₹${Math.abs(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const getDueStatus = (): { text: string; color: string; bgColor: string } => {
    if (expenseData.myDue > 0) {
      return {
        text: 'My Due',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    } else if (expenseData.myDue < 0) {
      return {
        text: 'I\'ll Receive',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    } else {
      return {
        text: 'All Settled',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50'
      };
    }
  };

  const quickActions = [
    {
      id: 1,
      title: 'Add Expense',
      icon: 'add-circle-outline',
      color: 'bg-blue-500',
      onPress: () => router.push('/dashboard/add-expense')
    },
    {
      id: 2,
      title: 'View Summary',
      icon: 'analytics-outline',
      color: 'bg-purple-500',
      onPress: () => navigation.navigate('ExpenseSummary' as never)
    },
    {
      id: 3,
      title: 'Add Member',
      icon: 'person-add-outline',
      color: 'bg-green-500',
      onPress: () => navigation.navigate('AddMember' as never)
    }
  ];

  const dueStatus = getDueStatus();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View className="bg-white px-6 py-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg text-gray-600">Welcome back,</Text>
              <Text className="text-2xl font-bold text-gray-900">{userName}!</Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              onPress={() => navigation.navigate('Profile' as never)}
            >
              <Ionicons name="person-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Expense Cards */}
        <View className="px-6 py-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Room Expenses Overview
          </Text>

          <View className="space-y-4">
            {/* Total Room Expense Card */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                      <Ionicons name="home-outline" size={20} color="#3B82F6" />
                    </View>
                    <Text className="text-sm font-medium text-gray-600">
                      Total Room Expense
                    </Text>
                  </View>
                  <Text className="text-2xl font-bold text-gray-900">
                    {formatCurrency(expenseData.totalRoomExpense)}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    This month's total
                  </Text>
                </View>
              </View>
            </View>

            {/* My Paid Card */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                      <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
                    </View>
                    <Text className="text-sm font-medium text-gray-600">
                      My Paid
                    </Text>
                  </View>
                  <Text className="text-2xl font-bold text-green-600">
                    {formatCurrency(expenseData.myPaid)}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    Amount I've contributed
                  </Text>
                </View>
              </View>
            </View>

            {/* My Due/Receive Card */}
            <View className={`rounded-2xl p-6 shadow-sm border border-gray-100 ${dueStatus.bgColor}`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                      expenseData.myDue > 0 ? 'bg-red-100' :
                      expenseData.myDue < 0 ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Ionicons
                        name={
                          expenseData.myDue > 0 ? "arrow-up-outline" :
                          expenseData.myDue < 0 ? "arrow-down-outline" : "checkmark-outline"
                        }
                        size={20}
                        color={
                          expenseData.myDue > 0 ? "#EF4444" :
                          expenseData.myDue < 0 ? "#10B981" : "#6B7280"
                        }
                      />
                    </View>
                    <Text className="text-sm font-medium text-gray-600">
                      {dueStatus.text}
                    </Text>
                  </View>
                  <Text className={`text-2xl font-bold ${dueStatus.color}`}>
                    {expenseData.myDue === 0 ? '₹0.00' : formatCurrency(expenseData.myDue)}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {expenseData.myDue > 0 ? 'Amount I need to pay' :
                     expenseData.myDue < 0 ? 'Amount I will receive' : 'No pending amounts'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </Text>

          <View className="flex-row justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={action.onPress}
                className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 items-center mx-1"
                activeOpacity={0.7}
              >
                <View className={`w-12 h-12 ${action.color} rounded-full items-center justify-center mb-3`}>
                  <Ionicons name={action.icon as any} size={24} color="white" />
                </View>
                <Text className="text-sm font-medium text-gray-900 text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity Preview */}
        <View className="px-6 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ActivityHistory' as never)}>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="restaurant-outline" size={20} color="#F97316" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900">Grocery Shopping</Text>
                <Text className="text-sm text-gray-500">Added by Sarah • 2 hours ago</Text>
              </View>
              <Text className="font-semibold text-gray-900">₹450.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDashboard;
