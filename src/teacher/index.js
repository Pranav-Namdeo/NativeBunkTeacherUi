/**
 * LetsBunk Teacher App
 * React Native Entry Point
 */

import { AppRegistry } from 'react-native';
import TeacherDashboard from './TeacherDashboard';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => TeacherDashboard);
