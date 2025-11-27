import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyles, colors } from '../styles/teacherStyles';

const TeacherStats = ({ students, isDark }) => {
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  const totalStudents = students.length;
  const presentStudents = students.filter(s => s.status === 'present').length;
  const absentStudents = students.filter(s => s.status === 'absent').length;
  const lateStudents = students.filter(s => s.status === 'late').length;
  const attendancePercentage = totalStudents > 0 
    ? Math.round((presentStudents / totalStudents) * 100) 
    : 0;

  const stats = [
    {
      id: 1,
      label: 'Total',
      value: totalStudents,
      icon: 'users',
      color: theme.primary,
      bgColor: isDark ? 'rgba(96, 165, 250, 0.2)' : '#DBEAFE',
    },
    {
      id: 2,
      label: 'Present',
      value: presentStudents,
      icon: 'check-circle',
      color: isDark ? '#34D399' : '#059669',
      bgColor: isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5',
    },
    {
      id: 3,
      label: 'Absent',
      value: absentStudents,
      icon: 'x-circle',
      color: isDark ? '#F87171' : '#DC2626',
      bgColor: isDark ? 'rgba(248, 113, 113, 0.2)' : '#FEE2E2',
    },
    {
      id: 4,
      label: 'Late',
      value: lateStudents,
      icon: 'clock',
      color: isDark ? '#FBBF24' : '#D97706',
      bgColor: isDark ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
    },
  ];

  return (
    <View style={localStyles.container}>
      <View style={localStyles.statsGrid}>
        {stats.map((stat) => (
          <View
            key={stat.id}
            style={[
              localStyles.statCard,
              { 
                backgroundColor: theme.surface,
                borderLeftColor: stat.color,
              },
            ]}
          >
            <View style={[localStyles.iconContainer, { backgroundColor: stat.bgColor }]}>
              <Icon name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={[localStyles.statValue, { color: theme.text }]}>
              {stat.value}
            </Text>
            <Text style={[localStyles.statLabel, { color: theme.textSecondary }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={[localStyles.attendanceCard, { backgroundColor: theme.surface }]}>
        <View style={localStyles.attendanceHeader}>
          <Text style={[localStyles.attendanceTitle, { color: theme.text }]}>
            Today's Attendance
          </Text>
          <View style={[localStyles.percentageBadge, { 
            backgroundColor: attendancePercentage >= 75 
              ? (isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5')
              : (isDark ? 'rgba(248, 113, 113, 0.2)' : '#FEE2E2')
          }]}>
            <Text style={[localStyles.percentageText, { 
              color: attendancePercentage >= 75 
                ? (isDark ? '#34D399' : '#059669')
                : (isDark ? '#F87171' : '#DC2626')
            }]}>
              {attendancePercentage}%
            </Text>
          </View>
        </View>

        <View style={localStyles.progressContainer}>
          <View style={[localStyles.progressBar, { backgroundColor: theme.gray200 }]}>
            <View
              style={[
                localStyles.progressFill,
                {
                  width: `${attendancePercentage}%`,
                  backgroundColor: attendancePercentage >= 75 
                    ? (isDark ? '#34D399' : '#10B981')
                    : (isDark ? '#F87171' : '#EF4444')
                },
              ]}
            />
          </View>
        </View>

        <Text style={[localStyles.attendanceInfo, { color: theme.textSecondary }]}>
          {presentStudents} out of {totalStudents} students present
        </Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  statCard: {
    width: '47%',
    margin: 6,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  attendanceCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  attendanceTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentageBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  attendanceInfo: {
    fontSize: 14,
  },
});

export default TeacherStats;
