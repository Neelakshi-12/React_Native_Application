
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';
import Todo from './screens/Todo';
import CreateProfile from './screens/CreateProfile';
import UserScreen from './screens/UserScreen';
import UserInfo from './screens/UserInfo';
import ForgetPassword from './screens/ForgetPassword';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e8099',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
        name="ForgetPassword" 
        component={ForgetPassword} 
        options={
          {title: 'Forget Password'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="Todo" 
       component={Todo} 
       options={
         { title: 'Todos' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="CreateProfile" 
       component={CreateProfile} 
       options={
         { title: 'CreateProfile' },
         {headerLeft: null} 
       }
      />
       <Stack.Screen 
       name="UserScreen" 
       component={UserScreen} 
       options={
         { title: 'UserScreen' },
         {headerLeft: null} 
       }
      />
       <Stack.Screen 
       name="UserInfo" 
       component={UserInfo} 
       options={
         { title: 'UserInfo' },
         {headerLeft: null} 
       }
      />
     
    
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}