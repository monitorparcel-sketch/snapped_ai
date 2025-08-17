import React from 'react';
import OnboardShell from '../components/OnboardShell';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function Onboarding1({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding1'>) {
  return (
    <OnboardShell
      image={require('../../assets/onboard1.png')}
      title="Snap It"
      subtitle="Stop guessing. Get instant matches for exactly what you want."
      buttonText="NEXT"
      onNext={() => navigation.replace('Onboarding2')}
    />
  );
}
