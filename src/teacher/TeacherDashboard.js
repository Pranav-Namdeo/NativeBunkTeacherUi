import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import TeacherHeader from './components/TeacherHeader';
import StudentSearch from './components/StudentSearch';
import StudentListView from './components/StudentListView';
import TeacherStats from './components/TeacherStats';
import FilterButtons from './components/FilterButtons';
import RandomRingModal from './components/RandomRingModal';
import ViewRecords from './components/ViewRecords';
import Updates from './components/Updates';
import { getStyles, colors } from './styles/teacherStyles';
import apiService from './services/api';
import socketService from './services/socket';

const Tab = createBottomTabNavigator();

const TeacherDashboard = () => {
  // UI State
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [randomRingVisible, setRandomRingVisible] = useState(false);
  const [viewRecordsVisible, setViewRecordsVisible] = useState(false);
  const [updatesVisible, setUpdatesVisible] = useState(false);
  
  // API State
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [hasActiveClass, setHasActiveClass] = useState(false);
  const [teacherId] = useState('EMP001'); // TODO: Get from login/auth
  const [refreshing, setRefreshing] = useState(false);

  // Fetch current class and students
  const fetchCurrentClassStudents = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCurrentClassStudents(teacherId);
      
      if (response.success) {
        setHasActiveClass(response.hasActiveClass);
        setCurrentClass(response.currentClass);
        
        if (response.students) {
          // Transform API data to match our format
          const transformedStudents = response.students.map(student => ({
            id: student._id,
            name: student.name,
            rollNumber: student.enrollmentNo,
            photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`,
            status: student.status || 'absent',
            attendance: Math.floor(Math.random() * 30) + 70, // TODO: Get real attendance
            classes: 48, // TODO: Get from API
            email: student.email,
            phone: student.phone,
            semester: student.semester,
            course: student.course,
            timerValue: student.timerValue,
            isRunning: student.isRunning,
            lastUpdated: student.lastUpdated,
          }));
          setStudents(transformedStudents);
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      // Fallback to mock data on error
      loadMockData();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Mock data fallback
  const loadMockData = () => {
    const mockStudents = [
    {
      id: '1',
      name: 'Aarav Sharma',
      rollNumber: 'CS001',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
      status: 'present',
      attendance: 92,
      classes: 48,
    },
    {
      id: '2',
      name: 'Diya Patel',
      rollNumber: 'CS002',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diya',
      status: 'present',
      attendance: 88,
      classes: 48,
    },
    {
      id: '3',
      name: 'Arjun Singh',
      rollNumber: 'CS003',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
      status: 'absent',
      attendance: 75,
      classes: 48,
    },
    {
      id: '4',
      name: 'Ananya Verma',
      rollNumber: 'CS004',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      status: 'present',
      attendance: 95,
      classes: 48,
    },
    {
      id: '5',
      name: 'Vihaan Kumar',
      rollNumber: 'CS005',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan',
      status: 'active',
      attendance: 85,
      classes: 48,
    },
    {
      id: '6',
      name: 'Isha Reddy',
      rollNumber: 'CS006',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isha',
      status: 'present',
      attendance: 90,
      classes: 48,
    },
    {
      id: '7',
      name: 'Aditya Gupta',
      rollNumber: 'CS007',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya',
      status: 'absent',
      attendance: 70,
      classes: 48,
    },
    {
      id: '8',
      name: 'Saanvi Nair',
      rollNumber: 'CS008',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saanvi',
      status: 'present',
      attendance: 93,
      classes: 48,
    },
    {
      id: '9',
      name: 'Reyansh Joshi',
      rollNumber: 'CS009',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reyansh',
      status: 'present',
      attendance: 87,
      classes: 48,
    },
    {
      id: '10',
      name: 'Myra Kapoor',
      rollNumber: 'CS010',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Myra',
      status: 'left',
      attendance: 82,
      classes: 48,
    },
    {
      id: '11',
      name: 'Kabir Mehta',
      rollNumber: 'CS011',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir',
      status: 'present',
      attendance: 91,
      classes: 48,
    },
    {
      id: '12',
      name: 'Anika Roy',
      rollNumber: 'CS012',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anika',
      status: 'present',
      attendance: 89,
      classes: 48,
    },
  ];
  setStudents(mockStudents);
  setHasActiveClass(true);
  setCurrentClass({
    subject: 'Data Structures',
    semester: '3',
    branch: 'CSE',
    period: 2,
    room: '101',
  });
};

  // Initialize data and socket connection
  useEffect(() => {
    fetchCurrentClassStudents();

    // Connect to socket for real-time updates
    socketService.connect();

    // Listen for student status changes
    const unsubscribeStatus = socketService.onStudentStatusChange((data) => {
      console.log('Student status changed:', data);
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === data.studentId
            ? { ...student, status: data.status, lastUpdated: new Date() }
            : student
        )
      );
    });

    // Listen for timer updates
    const unsubscribeTimer = socketService.onTimerUpdated((data) => {
      console.log('Timer updated:', data);
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === data.studentId
            ? {
                ...student,
                timerValue: data.timerValue,
                isRunning: data.isRunning,
                lastUpdated: new Date(),
              }
            : student
        )
      );
    });

    // Listen for new student registrations
    const unsubscribeRegistered = socketService.onStudentRegistered((data) => {
      console.log('Student registered:', data);
      fetchCurrentClassStudents(); // Refresh list
    });

    // Cleanup
    return () => {
      unsubscribeStatus();
      unsubscribeTimer();
      unsubscribeRegistered();
      socketService.disconnect();
    };
  }, []);

  // Refresh data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentClassStudents();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  const handleToggleAttendance = async (studentId, newStatus) => {
    try {
      // Optimistic update
      setStudents(prevStudents =>
        prevStudents.map(student => {
          if (student.id === studentId) {
            // Cycle through statuses if no newStatus provided
            if (!newStatus) {
              const statuses = ['active', 'present', 'absent', 'left'];
              const currentIndex = statuses.indexOf(student.status);
              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
              return { ...student, status: nextStatus };
            }
            return { ...student, status: newStatus };
          }
          return student;
        })
      );

      // Update on server
      const student = students.find(s => s.id === studentId);
      if (student) {
        const finalStatus = newStatus || (() => {
          const statuses = ['active', 'present', 'absent', 'left'];
          const currentIndex = statuses.indexOf(student.status);
          return statuses[(currentIndex + 1) % statuses.length];
        })();

        await apiService.updateStudentStatus(studentId, {
          status: finalStatus,
          timerValue: student.timerValue,
          isRunning: finalStatus === 'active',
        });

        // Emit socket event for real-time update
        socketService.emitStudentStatusChange({
          studentId,
          status: finalStatus,
          timestamp: new Date(),
        });
      }
    } catch (error) {
      console.error('Error updating student status:', error);
      // Revert on error
      fetchCurrentClassStudents();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCurrentClassStudents();
  };

  // Filter by search query
  let filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by status
  if (selectedFilter !== 'all') {
    filteredStudents = filteredStudents.filter(
      student => student.status === selectedFilter
    );
  }

  // Calculate counts for each filter
  const filterCounts = {
    all: students.length,
    active: students.filter(s => s.status === 'active').length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    left: students.filter(s => s.status === 'left').length,
  };

  const presentCount = students.filter(
    s => s.status === 'active' || s.status === 'present'
  ).length;

  const handleMenuItemPress = (action) => {
    switch (action) {
      case 'viewRecords':
        setViewRecordsVisible(true);
        break;
      case 'notification':
        // TODO: Add notification screen
        console.log('Notification clicked');
        break;
      case 'updates':
        setUpdatesVisible(true);
        break;
      case 'help':
        // TODO: Add help screen
        console.log('Help clicked');
        break;
      case 'feedback':
        // TODO: Add feedback screen
        console.log('Feedback clicked');
        break;
      default:
        break;
    }
  };

  const HomeScreen = () => {
    if (loading) {
      return (
        <View style={[localStyles.screenContainer, localStyles.centerContent, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[localStyles.loadingText, { color: theme.textSecondary }]}>
            Loading students...
          </Text>
        </View>
      );
    }

    if (!hasActiveClass) {
      return (
        <View style={[localStyles.screenContainer, localStyles.centerContent, { backgroundColor: theme.background }]}>
          <Icon name="calendar" size={64} color={theme.textSecondary} />
          <Text style={[localStyles.emptyTitle, { color: theme.text }]}>
            No Active Class
          </Text>
          <Text style={[localStyles.emptyText, { color: theme.textSecondary }]}>
            You don't have any class scheduled right now
          </Text>
          <TouchableOpacity
            style={[localStyles.refreshButton, { backgroundColor: theme.primary }]}
            onPress={handleRefresh}
          >
            <Icon name="refresh-cw" size={20} color="#FFFFFF" />
            <Text style={localStyles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[localStyles.screenContainer, { backgroundColor: theme.background }]}>
        {/* Current Class Info */}
        {currentClass && (
          <View style={[localStyles.classInfoBanner, { backgroundColor: theme.primary }]}>
            <View style={localStyles.classInfoContent}>
              <Text style={localStyles.classSubject}>{currentClass.subject}</Text>
              <Text style={localStyles.classDetails}>
                {currentClass.branch} - Semester {currentClass.semester} • Room {currentClass.room}
              </Text>
            </View>
            <TouchableOpacity onPress={handleRefresh}>
              <Icon name="refresh-cw" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        <StudentSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDark={isDark}
        />
        <TeacherStats students={students} isDark={isDark} />
        
        {/* Students Attending Header */}
        <View style={[localStyles.headerContainer, { backgroundColor: theme.background }]}>
          <View style={localStyles.headerRow}>
            <Text style={[localStyles.headerTitle, { color: theme.text }]}>
              Students Attending
            </Text>
            <Text style={[localStyles.headerCount, { color: theme.textSecondary }]}>
              {presentCount} / {students.length} Present
            </Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <FilterButtons
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          counts={filterCounts}
          isDark={isDark}
        />

        <StudentListView
          students={filteredStudents}
          onToggleAttendance={handleToggleAttendance}
          isDark={isDark}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        {/* Floating Action Button */}
        <TouchableOpacity
          style={[localStyles.fab, { backgroundColor: theme.primary }]}
          onPress={() => setRandomRingVisible(true)}
        >
          <Icon name="bell" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const CalendarScreen = () => (
    <View style={[localStyles.screenContainer, { backgroundColor: theme.background }]}>
      <View style={localStyles.centerContent}>
        <Icon name="calendar" size={64} color={theme.textSecondary} />
        <View style={localStyles.comingSoonText}>
          <Icon name="clock" size={20} color={theme.textSecondary} />
        </View>
      </View>
    </View>
  );

  const TimetableScreen = () => (
    <View style={[localStyles.screenContainer, { backgroundColor: theme.background }]}>
      <View style={localStyles.centerContent}>
        <Icon name="grid" size={64} color={theme.textSecondary} />
        <View style={localStyles.comingSoonText}>
          <Icon name="clock" size={20} color={theme.textSecondary} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[localStyles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.surface}
      />
      <TeacherHeader 
        isDark={isDark} 
        onToggleTheme={() => setIsDark(!isDark)}
        onMenuItemPress={handleMenuItemPress}
      />
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar';
            } else if (route.name === 'Timetable') {
              iconName = 'grid';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Timetable" component={TimetableScreen} />
      </Tab.Navigator>

      <RandomRingModal
        visible={randomRingVisible}
        onClose={() => setRandomRingVisible(false)}
        students={students}
        isDark={isDark}
        teacherId={teacherId}
        currentClass={currentClass}
      />

      <ViewRecords
        visible={viewRecordsVisible}
        onClose={() => setViewRecordsVisible(false)}
        isDark={isDark}
      />

      <Updates
        visible={updatesVisible}
        onClose={() => setUpdatesVisible(false)}
        isDark={isDark}
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  comingSoonText: {
    marginTop: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  classInfoBanner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  classInfoContent: {
    flex: 1,
  },
  classSubject: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  classDetails: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerCount: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default TeacherDashboard;
