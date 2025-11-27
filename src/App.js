import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TeacherDashboard from './teacher/TeacherDashboard';

const App = () => {
  return (
    <NavigationContainer>
      <TeacherDashboard />
    </NavigationContainer>
  );
};

export default App;
