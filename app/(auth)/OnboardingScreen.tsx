import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function OnboardingScreen() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      {/* Welcome Text */}
      <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
        Welcome!
      </Text>
      <Text className="text-base text-center text-gray-600 mb-8">
        How would you like to start using the app?
      </Text>

      {/* Create Group */}
      <TouchableOpacity
        // onPress={() => router.push('/group/create')}
        className="w-full bg-blue-600 p-4 rounded-xl flex-row items-center mb-4"
        activeOpacity={0.8}
      >
        <Ionicons name="construct-outline" size={22} color="white" className="mr-3" />
        <Text className="text-white text-lg font-medium text-center flex-1">
          Create New Group
        </Text>
      </TouchableOpacity>

      {/* Join Group */}
      <TouchableOpacity
        // onPress={() => router.push('/group/join')}
        className="w-full bg-purple-600 p-4 rounded-xl flex-row items-center mb-4"
        activeOpacity={0.8}
      >
        <Ionicons name="people-outline" size={22} color="white" className="mr-3" />
        <Text className="text-white text-lg font-medium text-center flex-1">
          Join with Invite Code
        </Text>
      </TouchableOpacity>

      {/* Use Solo */}
      <TouchableOpacity
        onPress={() => router.replace('/dashboard/dashboard')}
        className="w-full bg-gray-100 p-4 rounded-xl flex-row items-center"
        activeOpacity={0.8}
      >
        <Ionicons name="person-outline" size={22} color="#374151" className="mr-3" />
        <Text className="text-gray-800 text-lg font-medium text-center flex-1">
          Use Solo (No Group)
        </Text>
      </TouchableOpacity>

      {/* Note */}
      <Text className="text-sm text-gray-400 text-center mt-6">
        You can switch to a group anytime from settings.
      </Text>
    </View>
  )
}
