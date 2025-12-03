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

const DateDetailsModal = ({ visible, onClose, date, holiday, attendance, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const formattedDate = `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const getHolidayTypeColor = (type) => {
    switch (type) {
      case 'holiday':
        return isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2';
      case 'exam':
        return isDark ? 'rgba(168, 85, 247, 0.2)' : '#F3E8FF';
      case 'event':
        return isDark ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE';
      default:
        return isDark ? 'rgba(107, 114, 128, 0.2)' : '#F3F4F6';
    }
  };

  const getHolidayTypeBorderColor = (type) => {
    switch (type) {
      case 'holiday':
        return isDark ? '#EF4444' : '#FCA5A5';
      case 'exam':
        return isDark ? '#A855F7' : '#C084FC';
      case 'event':
        return isDark ? '#3B82F6' : '#93C5FD';
      default:
        return isDark ? '#6B7280' : '#D1D5DB';
    }
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

  const getStatusInfo = (status) => {
    switch (status) {
      case 'present':
        return {
          icon: 'check-circle',
          color: '#10B981',
          bgColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#D1FAE5',
          label: 'Present',
        };
      case 'absent':
        return {
          icon: 'x-circle',
          color: '#EF4444',
          bgColor: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
          label: 'Absent',
        };
      case 'leave':
        return {
          icon: 'alert-circle',
          color: '#F59E0B',
          bgColor: isDark ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
          label: 'On Leave',
        };
      default:
        return {
          icon: 'calendar',
          color: '#6B7280',
          bgColor: isDark ? 'rgba(107, 114, 128, 0.2)' : '#F3F4F6',
          label: 'No Record',
        };
    }
  };

  const statusInfo = attendance ? getStatusInfo(attendance.status) : getStatusInfo(null);

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
              <Text style={[styles.dateString, { color: theme.textSecondary }]}>
                {formattedDate}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: theme.background }]}
            >
              <Icon name="x" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
            {/* Holiday Information */}
            {holiday && (
              <View
                style={[
                  styles.holidayCard,
                  {
                    backgroundColor: getHolidayTypeColor(holiday.type),
                    borderColor: getHolidayTypeBorderColor(holiday.type),
                  },
                ]}
              >
                <View style={styles.holidayContent}>
                  <Text style={styles.holidayIcon}>
                    {getHolidayTypeIcon(holiday.type)}
                  </Text>
                  <View style={styles.holidayInfo}>
                    <Text
                      style={[
                        styles.holidayName,
                        { color: theme.text },
                      ]}
                    >
                      {holiday.name}
                    </Text>
                    <Text
                      style={[
                        styles.holidayDescription,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {holiday.description}
                    </Text>
                    <View
                      style={[
                        styles.holidayBadge,
                        { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.holidayBadgeText,
                          { color: theme.text },
                        ]}
                      >
                        {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)} Holiday
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Attendance Status */}
            <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Icon name="calendar" size={16} color={theme.text} />
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  Attendance Status
                </Text>
              </View>
              <View
                style={[
                  styles.statusBox,
                  { backgroundColor: statusInfo.bgColor },
                ]}
              >
                <Icon name={statusInfo.icon} size={24} color={statusInfo.color} />
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusLabel, { color: statusInfo.color }]}>
                    {statusInfo.label}
                  </Text>
                  {attendance && attendance.status !== 'leave' && (
                    <Text style={[styles.statusTime, { color: theme.textSecondary }]}>
                      {attendance.attendedTime} / {attendance.totalTime} minutes
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Lecture-wise Breakdown */}
            {attendance && attendance.lectures.length > 0 && (
              <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <View style={styles.cardHeader}>
                  <Icon name="clock" size={16} color={theme.text} />
                  <Text style={[styles.cardTitle, { color: theme.text }]}>
                    Lecture Breakdown
                  </Text>
                </View>
                <View style={styles.lecturesList}>
                  {attendance.lectures.map((lecture, index) => (
                    <View
                      key={index}
                      style={[
                        styles.lectureItem,
                        { backgroundColor: theme.surface },
                      ]}
                    >
                      <View style={styles.lectureInfo}>
                        <Text style={[styles.lectureSubject, { color: theme.text }]}>
                          {lecture.subject}
                        </Text>
                        <Text style={[styles.lectureTime, { color: theme.textSecondary }]}>
                          {lecture.time} • {lecture.duration} mins
                        </Text>
                      </View>
                      <Icon
                        name={lecture.attended ? 'check-circle' : 'x-circle'}
                        size={20}
                        color={lecture.attended ? '#10B981' : '#EF4444'}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Day Summary */}
            {attendance && attendance.status !== 'leave' && (
              <View style={[styles.summaryCard, { backgroundColor: theme.primary }]}>
                <View style={styles.summaryHeader}>
                  <Icon name="trending-up" size={20} color="#FFFFFF" />
                  <Text style={styles.summaryTitle}>Day Summary</Text>
                </View>
                <View style={styles.summaryGrid}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Classes</Text>
                    <Text style={styles.summaryValue}>
                      {attendance.lectures.length}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Attended</Text>
                    <Text style={styles.summaryValue}>
                      {attendance.lectures.filter((l) => l.attended).length}
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
              <View style={styles.noDataContainer}>
                <Icon name="calendar" size={48} color={theme.textSecondary} />
                <Text style={[styles.noDataText, { color: theme.textSecondary }]}>
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
    maxWidth: 400,
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  dateString: {
    fontSize: 14,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
  },
  holidayCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  holidayContent: {
    flexDirection: 'row',
    gap: 12,
  },
  holidayIcon: {
    fontSize: 32,
  },
  holidayInfo: {
    flex: 1,
    gap: 4,
  },
  holidayName: {
    fontSize: 16,
    fontWeight: '600',
  },
  holidayDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  holidayBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  holidayBadgeText: {
    fontSize: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
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
    marginBottom: 4,
  },
  lectureTime: {
    fontSize: 12,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 12,
  },
  noDataText: {
    fontSize: 14,
  },
});

export default DateDetailsModal;
