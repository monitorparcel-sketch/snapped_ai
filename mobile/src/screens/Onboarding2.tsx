import React from 'react';
import OnboardShell from '../components/OnboardShell';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function Onboarding2({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding2'>) {
  return (
    <OnboardShell
      image={require('../../assets/onboard2.png')}
      title="Your Closest Match, First"
      subtitle="We find the most similar items—down to the tiniest details."
      buttonText="NEXT"
      onNext={() => navigation.replace('Onboarding3')}
    />
  );
}
