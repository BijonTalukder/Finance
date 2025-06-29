import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

export default function OnboardingScreen() {
  const router = useRouter()
  const [modalType, setModalType] = useState<null | 'create' | 'join' | 'invitation'>(null)
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const handleCreate = () => {
    // API call for group creation
    Alert.alert('Group created', `Name: ${groupName}`)
    setModalType(null)
    router.replace('/dashboard/dashboard')
  }

  const handleJoin = () => {
    // API call for join
    Alert.alert('Joined group', `Code: ${inviteCode}`)
    setModalType(null)
    router.replace('/dashboard/dashboard')
  }

  const handleIndividual = () => {
    // continue solo
    router.replace('/dashboard/dashboard')
  }

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
        Welcome!
      </Text>
      <Text className="text-base text-center text-gray-600 mb-8">
        Select how you want to start
      </Text>

      {/* Button 1 */}
      <TouchableOpacity
        onPress={() => setModalType('create')}
        className="bg-blue-600 p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center text-lg">Create Group</Text>
      </TouchableOpacity>

      {/* Button 2 */}
      <TouchableOpacity
        onPress={() => setModalType('join')}
        className="bg-purple-600 p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center text-lg">Join with Code</Text>
      </TouchableOpacity>

      {/* Button 3 */}
      <TouchableOpacity
        onPress={handleIndividual}
        className="bg-gray-100 p-4 rounded-lg mb-4"
      >
        <Text className="text-center text-lg text-gray-700">Use Individually</Text>
      </TouchableOpacity>

      {/* ========= Modal UI Section ========= */}

      {/* Create Group Modal */}
      <Modal visible={modalType === 'create'} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-center px-6">
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-bold mb-4">Create Group</Text>
            <TextInput
              placeholder="Group Name"
              className="border px-4 py-2 rounded mb-4"
              value={groupName}
              onChangeText={setGroupName}
            />
            <TouchableOpacity
              className="bg-blue-600 p-3 rounded"
              onPress={handleCreate}
            >
              <Text className="text-white text-center font-medium">Create</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-3" onPress={() => setModalType(null)}>
              <Text className="text-center text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Join Group Modal */}
      <Modal visible={modalType === 'join'} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-center px-6">
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-bold mb-4">Join Group</Text>
            <TextInput
              placeholder="Enter Invite Code"
              className="border px-4 py-2 rounded mb-4"
              value={inviteCode}
              onChangeText={setInviteCode}
            />
            <TouchableOpacity
              className="bg-purple-600 p-3 rounded"
              onPress={handleJoin}
            >
              <Text className="text-white text-center font-medium">Join</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-3" onPress={() => setModalType(null)}>
              <Text className="text-center text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
