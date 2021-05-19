import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import Queries from '../components/Queries';
export default function QueriesScreen() {
  return (
    <View style={styles.container}>
      <Queries/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});