import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const DateDetailsModal = ({
  visible,
  onClose,
  date,
  holiday,
  attendance,
  isDark,
}) => {
  const theme = isDark ? colors.dark : colors.light;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (!date) return null;

  const formattedDate = `${dayNames[date.getDay()]}, ${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const getHolidayTypeIcon = (type) => {
    switch (type) {
      case 'national':
        return '🏖️';
      case 'religious':
        return '🎉';
      case 'exam':
        return '📝';
      case 'academic':
        return '🎓';
      default:
        return '📅';
    }
  };

  const getHolidayTypeColor = (type) => {
    switch (type) {
      case 'national':
        return {
          bg: isDark ? 'rgba(251, 146, 60, 0.2)' : '#FED7AA',
          text: isDark ? '#FB923C' : '#EA580C',
          border: isDark ? '#C2410C' : '#FDBA74',
        };
      case 'religious':
        return {
          bg: isDark ? 'rgba(248, 113, 113, 0.2)' : '#FECACA',
          text: isDark ? '#F87171' : '#DC2626',
          border: isDark ? '#991B1B' : '#FCA5A5',
        };
      case 'exam':
        return {
          bg: isDark ? 'rgba(167, 139, 250, 0.2)' : '#E9D5FF',
          text: isDark ? '#A78BFA' : '#9333EA',
          border: isDark ? '#6B21A8' : '#D8B4FE',
        };
      case 'academic':
        return {
          bg: isDark ? 'rgba(96, 165, 250, 0.2)' : '#DBEAFE',
          text: isDark ? '#60A5FA' : '#2563EB',
          border: isDark ? '#1E40AF' : '#93C5FD',
        };
      default:
        return {
          bg: theme.gray100,
          text: theme.text,
          border: theme.border,
        };
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'present':
        return {
          icon: 'check-circle',
          color: isDark ? '#34D399' : '#10B981',
          bg: isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5',
          label: 'Present',
        };
      case 'absent':
        return {
          icon: 'x-circle',
          color: isDark ? '#F87171' : '#EF4444',
          bg: isDark ? 'rgba(248, 113, 113, 0.2)' : '#FEE2E2',
          label: 'Absent',
        };
      case 'leave':
        return {
          icon: 'alert-circle',
          color: isDark ? '#FBBF24' : '#F59E0B',
          bg: isDark ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
          label: 'On Leave',
        };
      default:
        return {
          icon: 'calendar',
          color: theme.textSecondary,
          bg: theme.gray100,
          label: 'No Record',
        };
    }
  };

  const statusInfo = attendance
    ? getStatusInfo(attendance.status)
    : getStatusInfo(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={[styles.dateNumber, { color: theme.text }]}>
                {date.getDate()}
              </Text>
              <Text
                style={[styles.dateString, { color: theme.textSecondary }]}
              >
                {formattedDate}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Holiday Information */}
            {holiday && (
              <View
                style={[
                  styles.holidayCard,
                  {
                    backgroundColor: getHolidayTypeColor(holiday.type).bg,
                    borderColor: getHolidayTypeColor(holiday.type).border,
                  },
                ]}
              >
                <Text style={styles.holidayIcon}>
                  {getHolidayTypeIcon(holiday.type)}
                </Text>
                <View style={styles.holidayContent}>
                  <Text
                    style={[
                      styles.holidayName,
                      { color: getHolidayTypeColor(holiday.type).text },
                    ]}
                  >
                    {holiday.name}
                  </Text>
                  <Text
                    style={[
                      styles.holidayDescription,
                      { color: getHolidayTypeColor(holiday.type).text },
                    ]}
                  >
                    {holiday.description}
                  </Text>
                  <View style={styles.holidayBadge}>
                    <Text
                      style={[
                        styles.holidayBadgeText,
                        { color: getHolidayTypeColor(holiday.type).text },
                      ]}
                    >
                      {holiday.type.charAt(0).toUpperCase() +
                        holiday.type.slice(1)}{' '}
                      Holiday
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Attendance Status */}
            <View
              style={[
                styles.section,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Icon name="calendar" size={16} color={theme.text} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Attendance Status
                </Text>
              </View>
              <View
                style={[styles.statusCard, { backgroundColor: statusInfo.bg }]}
              >
                <Icon name={statusInfo.icon} size={24} color={statusInfo.color} />
                <View style={styles.statusInfo}>
                  <Text
                    style={[styles.statusLabel, { color: statusInfo.color }]}
                  >
                    {statusInfo.label}
                  </Text>
                  {attendance && attendance.status !== 'leave' && (
                    <Text
                      style={[
                        styles.statusTime,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {attendance.attendedTime} / {attendance.totalTime} minutes
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Lecture Breakdown */}
            {attendance && attendance.lectures && attendance.lectures.length > 0 && (
              <View
                style={[
                  styles.section,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <View style={styles.sectionHeader}>
                  <Icon name="clock" size={16} color={theme.text} />
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    Lecture Breakdown
                  </Text>
                </View>
                <View style={styles.lecturesList}>
                  {attendance.lectures.map((lecture, index) => (
                    <View
                      key={index}
                      style={[
                        styles.lectureItem,
                        { backgroundColor: theme.gray100 },
                      ]}
                    >
                      <View style={styles.lectureInfo}>
                        <Text
                          style={[styles.lectureSubject, { color: theme.text }]}
                        >
                          {lecture.subject}
                        </Text>
                        <Text
                          style={[
                            styles.lectureTime,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {lecture.time} • {lecture.duration} mins
                        </Text>
                      </View>
                      <Icon
                        name={lecture.attended ? 'check-circle' : 'x-circle'}
                        size={20}
                        color={
                          lecture.attended
                            ? isDark
                              ? '#34D399'
                              : '#10B981'
                            : isDark
                            ? '#F87171'
                            : '#EF4444'
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Day Summary */}
            {attendance && attendance.status !== 'leave' && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                  <Icon name="trending-up" size={20} color="#FFFFFF" />
                  <Text style={styles.summaryTitle}>Day Summary</Text>
                </View>
                <View style={styles.summaryGrid}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Classes</Text>
                    <Text style={styles.summaryValue}>
                      {attendance.lectures?.length || 0}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Attended</Text>
                    <Text style={styles.summaryValue}>
                      {attendance.lectures?.filter((l) => l.attended).length || 0}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Time</Text>
                    <Text style={styles.summaryValue}>
                      {attendance.totalTime} min
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Attendance %</Text>
                    <Text style={styles.summaryValue}>
                      {attendance.percentage}%
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* No Data Message */}
            {!holiday && !attendance && (
              <View style={styles.noData}>
                <Icon name="calendar" size={48} color={theme.textSecondary} />
                <Text
                  style={[styles.noDataText, { color: theme.textSecondary }]}
                >
                  No data available for this date
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 448,
    borderRadius: 16,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  dateNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  dateString: {
    fontSize: 14,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    maxHeight: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  holidayCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  holidayIcon: {
    fontSize: 28,
  },
  holidayContent: {
    flex: 1,
  },
  holidayName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  holidayDescription: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  holidayBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  holidayBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusTime: {
    fontSize: 12,
    marginTop: 2,
  },
  lecturesList: {
    gap: 8,
  },
  lectureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
  lectureInfo: {
    flex: 1,
  },
  lectureSubject: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  lectureTime: {
    fontSize: 12,
  },
  summaryCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    width: '45%',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#BFDBFE',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  noData: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noDataText: {
    fontSize: 14,
    marginTop: 12,
  },
});

export default DateDetailsModal;
