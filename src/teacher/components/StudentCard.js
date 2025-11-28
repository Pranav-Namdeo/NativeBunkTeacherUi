import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyles, colors } from '../styles/teacherStyles';
import StudentProfileDialog from './StudentProfileDialog';

const StudentCard = ({ student, onToggleAttendance, isDark }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  const getStatusStyle = (status) => {
    if (status === 'active') return styles.badgeActive;
    if (status === 'present') return styles.badgePresent;
    if (status === 'absent') return styles.badgeAbsent;
    if (status === 'left') return styles.badgeLeft;
    return styles.badgeActive;
  };

  const getStatusTextStyle = (status) => {
    if (status === 'active') return styles.badgeTextActive;
    if (status === 'present') return styles.badgeTextPresent;
    if (status === 'absent') return styles.badgeTextAbsent;
    if (status === 'left') return styles.badgeTextLeft;
    return styles.badgeTextActive;
  };

  const getStatusIcon = (status) => {
    if (status === 'active') return 'activity';
    if (status === 'present') return 'check-circle';
    if (status === 'absent') return 'x-circle';
    if (status === 'left') return 'log-out';
    return 'activity';
  };

  const getStatusColor = (status) => {
    if (status === 'active') return isDark ? '#34D399' : '#10B981';
    if (status === 'present') return isDark ? '#60A5FA' : '#3B82F6';
    if (status === 'absent') return isDark ? '#F87171' : '#EF4444';
    if (status === 'left') return isDark ? '#FBBF24' : '#F59E0B';
    return isDark ? '#34D399' : '#10B981';
  };

  const getStatusLabel = (status) => {
    if (status === 'active') return 'Active';
    if (status === 'present') return 'Present';
    if (status === 'absent') return 'Absent';
    if (status === 'left') return 'Left Early';
    return 'Active';
  };

  return (
    <>
      <TouchableOpacity
        style={[localStyles.card, { backgroundColor: theme.surface }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: student.photo }} style={localStyles.avatar} />
        
        <View style={localStyles.info}>
          <Text style={[localStyles.name, { color: theme.text }]}>
            {student.name}
          </Text>
          <Text style={[localStyles.rollNumber, { color: theme.textSecondary }]}>
            {student.rollNumber}
          </Text>
        </View>

        <View style={[localStyles.statusBadge, getStatusStyle(student.status)]}>
          <Text style={[localStyles.statusText, getStatusTextStyle(student.status)]}>
            {getStatusLabel(student.status)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => onToggleAttendance(student.id)}
          style={localStyles.iconButton}
        >
          <Icon
            name={getStatusIcon(student.status)}
            size={24}
            color={getStatusColor(student.status)}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Student Profile Dialog */}
      <StudentProfileDialog
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        student={student}
        isDark={isDark}
      />
    </>
  );
};

const localStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  rollNumber: {
    fontSize: 14,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  iconButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileRoll: {
    fontSize: 16,
  },
  statsSection: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default StudentCard;
