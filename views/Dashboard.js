import React from 'react';
import {ScrollView} from 'react-native';
import Header from '../components/Header';

export default function Dashboard() {
  return (
    <ScrollView style={{backgroundColor: '#FFF'}}>
      <Header />
    </ScrollView>
  );
}
