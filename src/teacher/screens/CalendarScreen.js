import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';
import DateDetailsModal from '../components/DateDetailsModal';
import apiService from '../services/api';

const CalendarScreen = ({ isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch holidays from API
  useEffect(() => {
    fetchHolidays();
  }, [currentDate]);

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      
      // Get month start and end dates
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const response = await apiService.getHolidaysInRange(
        startDate.toISOString(),
        endDate.toISOString()
      );

      if (response.success && response.holidays) {
        setHolidays(response.holidays);
      }
    } catch (error) {
      console.error('Error fetching holidays:', error);
      // Use fallback mock data
      setHolidays(getMockHolidays());
    } finally {
      setLoading(false);
    }
  };

  // Mock attendance data (TODO: Replace with API)
  const attendanceData = {
    '2024-11-01': {
      date: '2024-11-01',
      status: 'present',
      lectures: [
        { subject: 'Mathematics', time: '9:00 AM', duration: 60, attended: true },
        { subject: 'Physics', time: '10:00 AM', duration: 60, attended: true },
        { subject: 'Chemistry', time: '11:00 AM', duration: 60, attended: true },
      ],
      totalTime: 180,
      attendedTime: 180,
      percentage: 100,
    },
    '2024-11-04': {
      date: '2024-11-04',
      status: 'absent',
      lectures: [
        { subject: 'Mathematics', time: '9:00 AM', duration: 60, attended: false },
        { subject: 'Physics', time: '10:00 AM', duration: 60, attended: false },
      ],
      totalTime: 120,
      attendedTime: 0,
      percentage: 0,
    },
    '2024-11-05': {
      date: '2024-11-05',
      status: 'present',
      lectures: [
        { subject: 'English', time: '9:00 AM', duration: 60, attended: true },
        { subject: 'Computer Science', time: '10:00 AM', duration: 60, attended: true },
        { subject: 'Chemistry', time: '11:00 AM', duration: 60, attended: false },
      ],
      totalTime: 180,
      attendedTime: 120,
      percentage: 67,
    },
  };

  const getMockHolidays = () => [
    {
      date: '2024-11-26',
      name: 'Constitution Day',
      description: 'National holiday celebrating the adoption of the Indian Constitution',
      type: 'holiday',
      color: '#FF6B6B',
    },
    {
      date: '2024-11-15',
      name: 'Guru Nanak Jayanti',
      description: 'Birth anniversary of Guru Nanak Dev Ji',
      type: 'holiday',
      color: '#FF6B6B',
    },
    {
      date: '2024-11-28',
      name: 'Mid-Term Examination',
      description: 'Mathematics mid-term exam',
      type: 'exam',
      color: '#A855F7',
    },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const formatDateKey = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getHolidayForDate = (day) => {
    const dateKey = formatDateKey(day);
    return holidays.find((h) => {
      const holidayDate = new Date(h.date);
      const holidayKey = `${holidayDate.getFullYear()}-${String(holidayDate.getMonth() + 1).padStart(2, '0')}-${String(holidayDate.getDate()).padStart(2, '0')}`;
      return holidayKey === dateKey;
    });
  };

  const getAttendanceForDate = (day) => {
    const dateKey = formatDateKey(day);
    return attendanceData[dateKey];
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const getHolidayTypeIcon = (type) => {
    switch (type) {
      case 'holiday':
        return '🏖️';
      case 'exam':
        return '📝';
      case 'event':
        return '🎓';
      default:
        return '📅';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return '#10B981';
      case 'absent':
        return '#EF4444';
      case 'leave':
        return '#F59E0B';
      default:
        return 'transparent';
    }
  };

  // Calculate month stats
  const calculateMonthStats = () => {
    let presentDays = 0;
    let absentDays = 0;
    let totalDays = 0;

    Object.values(attendanceData).forEach((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getMonth() === currentDate.getMonth() &&
        recordDate.getFullYear() === currentDate.getFullYear()
      ) {
        if (record.status === 'present') presentDays++;
        if (record.status === 'absent') absentDays++;
        if (record.status !== 'leave' && record.status !== null) totalDays++;
      }
    });

    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return { presentDays, absentDays, percentage, totalDays };
  };

  const stats = calculateMonthStats();

  // Render calendar days
  const renderDays = () => {
    const days = [];
    
    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const holiday = getHolidayForDate(day);
      const attendance = getAttendanceForDate(day);
      const isTodayDate = isToday(day);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isTodayDate && { ...styles.todayCell, borderColor: theme.primary },
          ]}
          onPress={() => handleDateClick(day)}
        >
          <Text
            style={[
              styles.dayText,
              { color: theme.text },
              isTodayDate && { color: theme.primary, fontWeight: '700' },
            ]}
          >
            {day}
          </Text>

          {/* Holiday indicator */}
          {holiday && (
            <Text style={styles.holidayIcon}>
              {getHolidayTypeIcon(holiday.type)}
            </Text>
          )}

          {/* Attendance status indicator */}
          {attendance && !holiday && (
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(attendance.status) },
              ]}
            />
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Loading calendar...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Month Stats Card */}
        <View
          style={[
            styles.statsCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.statsHeader}>
            <Icon name="calendar" size={20} color={theme.primary} />
            <Text style={[styles.statsTitle, { color: theme.text }]}>
              {monthNames[currentDate.getMonth()]} Stats
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statLabelRow}>
                <Icon name="check-circle" size={16} color="#10B981" />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Present
                </Text>
              </View>
              <Text style={[styles.statValue, { color: '#10B981' }]}>
                {stats.presentDays}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statLabelRow}>
                <Icon name="x-circle" size={16} color="#EF4444" />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Absent
                </Text>
              </View>
              <Text style={[styles.statValue, { color: '#EF4444' }]}>
                {stats.absentDays}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statLabelRow}>
                <Icon name="clock" size={16} color={theme.primary} />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Rate
                </Text>
              </View>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {stats.percentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Calendar Card */}
        <View
          style={[
            styles.calendarCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          {/* Calendar Header */}
          <View style={[styles.calendarHeader, { borderBottomColor: theme.border }]}>
            <TouchableOpacity
              onPress={previousMonth}
              style={[styles.navButton, { backgroundColor: theme.background }]}
            >
              <Icon name="chevron-left" size={20} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.monthYear, { color: theme.text }]}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity
              onPress={nextMonth}
              style={[styles.navButton, { backgroundColor: theme.background }]}
            >
              <Icon name="chevron-right" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarBody}>
            {/* Day names */}
            <View style={styles.dayNamesRow}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <View key={day} style={styles.dayNameCell}>
                  <Text style={[styles.dayName, { color: theme.textSecondary }]}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Days */}
            <View style={styles.daysGrid}>{renderDays()}</View>
          </View>

          {/* Legend */}
          <View style={[styles.legend, { borderTopColor: theme.border }]}>
            <Text style={[styles.legendTitle, { color: theme.textSecondary }]}>
              Legend:
            </Text>
            <View style={styles.legendGrid}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>
                  Present
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>
                  Absent
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>
                  Leave
                </Text>
              </View>
              <View style={styles.legendItem}>
                <Text style={styles.legendIcon}>🏖️</Text>
                <Text style={[styles.legendText, { color: theme.text }]}>
                  Holiday
                </Text>
              </View>
              <View style={styles.legendItem}>
                <Text style={styles.legendIcon}>📝</Text>
                <Text style={[styles.legendText, { color: theme.text }]}>
                  Exam
                </Text>
              </View>
              <View style={styles.legendItem}>
                <Text style={styles.legendIcon}>🎓</Text>
                <Text style={[styles.legendText, { color: theme.text }]}>
                  Event
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Date Details Modal */}
      {selectedDate && (
        <DateDetailsModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
          holiday={getHolidayForDate(selectedDate.getDate())}
          attendance={getAttendanceForDate(selectedDate.getDate())}
          isDark={isDark}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  statsCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  calendarCard: {
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
  },
  calendarBody: {
    padding: 16,
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayName: {
    fontSize: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  todayCell: {
    borderWidth: 2,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
  },
  holidayIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: 10,
  },
  statusDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legend: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  legendTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '48%',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendIcon: {
    fontSize: 14,
  },
  legendText: {
    fontSize: 12,
  },
});

export default CalendarScreen;
