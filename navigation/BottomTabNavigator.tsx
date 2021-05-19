/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import QueriesScreen from '../screens/QueriesScreen';
import { BottomTabParamList, HomeNavigatorParamList, NewItemParamList, QueriesParamList} from '../types';
import NewItemScreen from '../screens/NewItemScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false}}>
      <BottomTab.Screen
        name="Home"
        component={NewItem}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-add" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-folder" color={color} />,
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
    headerTitle: () => (
      <MaterialCommunityIcons name={'spa'} size={30} color={Colors.light.tint}/>
      ),
    headerRightContainerStyle: {
      marginRight: 15,
    },
    headerLeftContainerStyle: {
      marginLeft: 15,
    },
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
          headerTitle: () => (
            <MaterialCommunityIcons name={'spa'} size={30} color={Colors.light.tint}/>
            ),
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
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
          headerTitle: () => (
            <MaterialCommunityIcons name={'spa'} size={30} color={Colors.light.tint}/>
            ),
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
        }}
      />
    </TabThreeStack.Navigator>
  );
}
