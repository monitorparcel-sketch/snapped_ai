import React from 'react';
import OnboardShell from '../components/OnboardShell';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function Onboarding3({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding3'>) {
  return (
    <OnboardShell
      image={require('../../assets/onboard3.png')}
      title="Designer or Dupe"
      subtitle="Shop the original or its budget-friendly twin."
      buttonText="GET STARTED"
      onNext={() => navigation.replace('Home')}
    />
  );
}
