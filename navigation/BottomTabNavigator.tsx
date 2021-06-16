/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, Entypo} from '@expo/vector-icons';
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import mystyle from '../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import QueriesScreen from '../screens/QueriesScreen';
import { BottomTabParamList, HomeNavigatorParamList, NewItemParamList, QueriesParamList} from '../types';
import NewItemScreen from '../screens/NewItemScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const logo = require('../assets/images/logo.png');

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        tabStyle: {backgroundColor: 'white'},
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false}}>
      <BottomTab.Screen
        name="Home"
        component={NewItem}
        options={{
          tabBarIcon: ({ color }) => <View><TabBarIcon name="md-add" color={color} /></View>,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => 
            <LinearGradient
            colors={[Colors.light.gray,Colors.light.dsecondary]}
            start={[0.3, 0.5]}
            style={{marginTop: -30, backgroundColor: Colors.light.gray, width: 70, 
            height: 70, borderRadius: 35}}>
            <Entypo style={[mystyle.centered,{marginTop: 'auto', marginBottom: 'auto'}]} name={'leaf'} size={30} color={color}/>
            </LinearGradient>,
        }}
      />
       <BottomTab.Screen
        name="Queries"
        component={Queries}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-search" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerStyle: {
            backgroundColor: Colors.light.background,
            height: 60,
            shadowRadius: 0,
            shadowOffset: {
              height: 0
            },
          },
    headerTitle: () => (
      <View style={[mystyle.centered,{flexDirection: 'row', marginTop: 10}]}>
      <Text style={{fontSize: 16, color: Colors.light.gray}}>Kitchen </Text>
      <Entypo name={'leaf'} size={20} color={Colors.light.tint}/>
      <Text style={{fontSize: 16, color: Colors.light.gray}}> Buddy</Text>
      </View>
      ),
  }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<NewItemParamList>();

function NewItem() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="NewItemScreen"
        component={NewItemScreen}
        options={{ 
          headerStyle: {
            backgroundColor: Colors.light.background,
            height: 60,
            shadowRadius: 0,
            shadowOffset: {
              height: 0
            },
          },
    headerTitle: () => (
      <View style={[mystyle.centered,{flexDirection: 'row', marginTop: 10}]}>
      <Text style={{fontSize: 16, color: Colors.light.gray}}>Kitchen </Text>
      <Entypo name={'leaf'} size={20} color={Colors.light.tint}/>
      <Text style={{fontSize: 16, color: Colors.light.gray}}> Buddy</Text>
      </View>
      ),
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<QueriesParamList>();

function Queries() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="QueriesScreen"
        component={QueriesScreen}
        options={{ 
          headerStyle: {
            backgroundColor: Colors.light.background,
            height: 60,
            shadowRadius: 0,
            shadowOffset: {
              height: 0
            },
          },
    headerTitle: () => (
      <View style={[mystyle.centered,{flexDirection: 'row', marginTop: 10}]}>
      <Text style={{fontSize: 16, color: Colors.light.gray}}>Kitchen </Text>
      <Entypo name={'leaf'} size={20} color={Colors.light.tint}/>
      <Text style={{fontSize: 16, color: Colors.light.gray}}> Buddy</Text>
      </View>
      ),
        }}
      />
    </TabThreeStack.Navigator>
  );
}
