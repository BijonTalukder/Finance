import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const userData = [
  { name: 'Amit', paid: 1000, shouldPay: 1200 },
  { name: 'Ratul', paid: 2000, shouldPay: 1000 },
];

const DueReceiveReport = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">Final Report</Text>

      {userData.map((user, idx) => {
        const net = user.paid - user.shouldPay;
        return (
          <View
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-semibold text-gray-900">{user.name}</Text>
                <Text className="text-sm text-gray-500">Paid: ৳{user.paid}</Text>
                <Text className="text-sm text-gray-500">Should Pay: ৳{user.shouldPay}</Text>
              </View>
              <Text
                className={`text-base font-bold ${
                  net < 0 ? 'text-red-600' : net > 0 ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {net > 0 ? `Receive ৳${net}` : net < 0 ? `Due ৳${Math.abs(net)}` : 'Settled'}
              </Text>
            </View>

            <TouchableOpacity className="mt-3 bg-blue-100 px-4 py-2 rounded-full self-start">
              <Text className="text-sm text-blue-600 font-semibold">Log Payment</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity className="bg-green-600 mt-6 py-4 rounded-lg">
        <Text className="text-white text-center font-bold text-base">Settle All</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DueReceiveReport;
