import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const StudentProfileDialog = ({ visible, onClose, student, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;

  if (!student) return null;

  const getStatusColor = () => {
    switch (student.status) {
      case 'present':
        return isDark ? '#60A5FA' : '#3B82F6';
      case 'active':
        return isDark ? '#34D399' : '#10B981';
      case 'absent':
        return isDark ? '#F87171' : '#EF4444';
      case 'left':
        return isDark ? '#FBBF24' : '#F59E0B';
      default:
        return theme.textSecondary;
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return isDark ? '#34D399' : '#10B981';
    if (percentage >= 50) return isDark ? '#FBBF24' : '#F59E0B';
    return isDark ? '#F87171' : '#EF4444';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.dialog, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.title, { color: theme.text }]}>
                Student Profile
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                View student information and attendance details
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Photo */}
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: student.photo || student.profileImage }}
                style={[styles.photo, { borderColor: theme.border }]}
              />
              {/* Status Badge */}
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor() },
                ]}
              >
                <Text style={styles.statusText}>
                  {student.status.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Student Information */}
            <View style={styles.infoContainer}>
              {/* Name */}
              <View style={styles.infoSection}>
                <Text
                  style={[styles.infoLabel, { color: theme.textSecondary }]}
                >
                  Name
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {student.name}
                </Text>
              </View>

              {/* Enrollment Number */}
              <View style={styles.infoSection}>
                <Text
                  style={[styles.infoLabel, { color: theme.textSecondary }]}
                >
                  Enrollment Number
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {student.rollNumber || student.rollNo}
                </Text>
              </View>

              {/* Email */}
              <View style={styles.infoSection}>
                <Text
                  style={[styles.infoLabel, { color: theme.textSecondary }]}
                >
                  Email
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {student.email}
                </Text>
              </View>

              {/* Attendance Percentage */}
              <View style={styles.infoSection}>
                <Text
                  style={[styles.infoLabel, { color: theme.textSecondary }]}
                >
                  Attendance Percentage
                </Text>
                <View style={styles.attendanceCircleContainer}>
                  <View
                    style={[
                      styles.attendanceCircle,
                      {
                        backgroundColor: isDark
                          ? 'rgba(59, 130, 246, 0.2)'
                          : '#DBEAFE',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.attendancePercentage,
                        {
                          color: getAttendanceColor(
                            student.attendance || student.attendancePercentage || 0
                          ),
                        },
                      ]}
                    >
                      {student.attendance || student.attendancePercentage || 0}%
                    </Text>
                  </View>
                </View>
              </View>

              {/* Additional Stats */}
              <View style={styles.statsContainer}>
                <View
                  style={[
                    styles.statCard,
                    { backgroundColor: theme.gray100 },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: theme.textSecondary }]}
                  >
                    Total Classes
                  </Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>
                    {student.classes || 0}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statCard,
                    { backgroundColor: theme.gray100 },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: theme.textSecondary }]}
                  >
                    Present
                  </Text>
                  <Text style={[styles.statValue, { color: theme.text }]}>
                    {student.classes
                      ? Math.round(
                          (student.classes * (student.attendance || 0)) / 100
                        )
                      : 0}
                  </Text>
                </View>
              </View>
            </View>
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
  dialog: {
    width: '100%',
    maxWidth: 448,
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingBottom: 8,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  photo: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  infoContainer: {
    gap: 16,
  },
  infoSection: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  attendanceCircleContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  attendanceCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendancePercentage: {
    fontSize: 28,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default StudentProfileDialog;
