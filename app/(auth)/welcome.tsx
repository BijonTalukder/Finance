import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const Welcome = () => {
  const router = useRouter()
  return (
    <ScreenWrapper style={styles.screen}>
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.top}>
          <TouchableOpacity onPress={()=>router.push('/(auth)/login')} style={styles.signInBtn}>
            <Typo size={16} fontWeight="600" color={colors.primary}>
              Sign In
            </Typo>
          </TouchableOpacity>
          <Image
            source={require('@/assets/images/icon.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.centerText}>
            <Typo size={20} fontWeight="700" color="#fff">
              Always take control
            </Typo>
            <Typo size={20} fontWeight="700" color="#fff">
              of your finance
            </Typo>
          </View>

          <View style={styles.subText}>
            <Typo color="#ccc">Finance must be arranged to set a better</Typo>
            <Typo color="#ccc">lifestyle in future</Typo>
          </View>

          <View style={styles.buttonWrapper}>
            <Button onPress={()=>router.push('/(auth)/register')}>
              <Typo size={16} fontWeight="600" color="#fff">
                Get Started
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#121212', // dark background
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  top: {
    alignItems: 'flex-end',
  },
  signInBtn: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  footer: {
    alignItems: 'center',
  },
  centerText: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subText: {
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonWrapper: {
    width: '100%',
  },
});
