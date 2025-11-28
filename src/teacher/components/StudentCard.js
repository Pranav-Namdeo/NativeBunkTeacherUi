import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyles, colors } from '../styles/teacherStyles';

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

      {/* Student Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View style={[localStyles.modalContent, { backgroundColor: theme.surface }]}>
            <View style={localStyles.modalHeader}>
              <Text style={[localStyles.modalTitle, { color: theme.text }]}>
                Student Details
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={localStyles.modalBody}>
              <View style={localStyles.profileSection}>
                <Image
                  source={{ uri: student.photo }}
                  style={localStyles.profileImage}
                />
                <Text style={[localStyles.profileName, { color: theme.text }]}>
                  {student.name}
                </Text>
                <Text style={[localStyles.profileRoll, { color: theme.textSecondary }]}>
                  {student.rollNumber}
                </Text>
              </View>

              <View style={[localStyles.statsSection, { borderTopColor: theme.border }]}>
                <View style={localStyles.statItem}>
                  <Text style={[localStyles.statValue, { color: theme.text }]}>
                    {student.attendance}%
                  </Text>
                  <Text style={[localStyles.statLabel, { color: theme.textSecondary }]}>
                    Attendance
                  </Text>
                </View>
                <View style={[localStyles.statDivider, { backgroundColor: theme.border }]} />
                <View style={localStyles.statItem}>
                  <Text style={[localStyles.statValue, { color: theme.text }]}>
                    {student.classes}
                  </Text>
                  <Text style={[localStyles.statLabel, { color: theme.textSecondary }]}>
                    Total Classes
                  </Text>
                </View>
              </View>

              <View style={localStyles.detailSection}>
                <Text style={[localStyles.sectionTitle, { color: theme.text }]}>
                  Current Status
                </Text>
                <View style={[localStyles.statusContainer, getStatusStyle(student.status)]}>
                  <Icon
                    name={getStatusIcon(student.status)}
                    size={20}
                    color={getStatusColor(student.status)}
                  />
                  <Text style={[localStyles.statusLabel, getStatusTextStyle(student.status)]}>
                    {getStatusLabel(student.status)}
                  </Text>
                </View>
              </View>

              <View style={localStyles.actionSection}>
                <TouchableOpacity
                  style={[localStyles.actionButton, { 
                    backgroundColor: isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5',
                  }]}
                  onPress={() => {
                    onToggleAttendance(student.id, 'active');
                    setModalVisible(false);
                  }}
                >
                  <Icon name="activity" size={20} color={isDark ? '#34D399' : '#10B981'} />
                  <Text style={[localStyles.actionButtonText, { 
                    color: isDark ? '#34D399' : '#10B981',
                  }]}>
                    Mark Active
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[localStyles.actionButton, { 
                    backgroundColor: isDark ? 'rgba(96, 165, 250, 0.2)' : '#DBEAFE',
                  }]}
                  onPress={() => {
                    onToggleAttendance(student.id, 'present');
                    setModalVisible(false);
                  }}
                >
                  <Icon name="check-circle" size={20} color={isDark ? '#60A5FA' : '#3B82F6'} />
                  <Text style={[localStyles.actionButtonText, { 
                    color: isDark ? '#60A5FA' : '#3B82F6',
                  }]}>
                    Mark Present
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[localStyles.actionButton, { 
                    backgroundColor: isDark ? 'rgba(248, 113, 113, 0.2)' : '#FEE2E2',
                  }]}
                  onPress={() => {
                    onToggleAttendance(student.id, 'absent');
                    setModalVisible(false);
                  }}
                >
                  <Icon name="x-circle" size={20} color={isDark ? '#F87171' : '#EF4444'} />
                  <Text style={[localStyles.actionButtonText, { 
                    color: isDark ? '#F87171' : '#EF4444',
                  }]}>
                    Mark Absent
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[localStyles.actionButton, { 
                    backgroundColor: isDark ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
                  }]}
                  onPress={() => {
                    onToggleAttendance(student.id, 'left');
                    setModalVisible(false);
                  }}
                >
                  <Icon name="log-out" size={20} color={isDark ? '#FBBF24' : '#F59E0B'} />
                  <Text style={[localStyles.actionButtonText, { 
                    color: isDark ? '#FBBF24' : '#F59E0B',
                  }]}>
                    Mark Left Early
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
