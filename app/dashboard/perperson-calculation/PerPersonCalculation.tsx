import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const dummyData = [
  { name: 'Amit', paid: 500, shouldPay: 1000 },
  { name: 'Bappi', paid: 1000, shouldPay: 1000 },
  { name: 'Shuvo', paid: 1500, shouldPay: 1000 },
];

const PerPersonCalculation = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">Per Person Breakdown</Text>

      {dummyData.map((person, index) => {
        const diff = person.paid - person.shouldPay;
        return (
          <View
            key={index}
            className="bg-gray-100 rounded-lg p-4 mb-3 flex-row justify-between items-center"
          >
            <View>
              <Text className="text-base font-semibold text-gray-800">{person.name}</Text>
              <Text className="text-sm text-gray-600">Paid: ৳{person.paid}</Text>
              <Text className="text-sm text-gray-600">Should Pay: ৳{person.shouldPay}</Text>
            </View>
            <Text
              className={`text-base font-bold ${
                diff < 0 ? 'text-red-600' : diff > 0 ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {diff === 0 ? 'Settled' : diff > 0 ? `Receive ৳${diff}` : `Due ৳${Math.abs(diff)}`}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PerPersonCalculation;
