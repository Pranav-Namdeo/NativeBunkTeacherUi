import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

// Generate mock students for semester/branch
const generateStudents = (semester, branch) => {
  const branchCode = branch.split(' - ')[0];
  const studentData = [
    {
      names: ['Aarav Sharma', 'Priya Patel', 'Rohan Kumar', 'Ananya Singh'],
      images: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      ],
      statuses: ['active', 'present', 'absent', 'left'],
    },
    {
      names: ['Vikram Desai', 'Sneha Reddy', 'Kabir Malhotra', 'Diya Gupta'],
      images: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Diya',
      ],
      statuses: ['present', 'active', 'present', 'active'],
    },
    {
      names: ['Arjun Verma', 'Meera Iyer', 'Aditya Joshi', 'Ishita Nair'],
      images: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita',
      ],
      statuses: ['active', 'present', 'left', 'present'],
    },
  ];

  const result = [];
  const groupIndex = (semester - 1) % 3;
  const group = studentData[groupIndex];

  for (let i = 0; i < group.names.length; i++) {
    result.push({
      id: `${semester}-${i}`,
      name: group.names[i],
      rollNo: `${branchCode}${semester}${(i + 1).toString().padStart(3, '0')}`,
      status: group.statuses[i],
      photo: group.images[i],
      email: `${group.names[i].toLowerCase().replace(' ', '.')}@college.edu`,
      attendance: Math.floor(Math.random() * 30) + 70,
      semester,
      branch,
    });
  }

  return result;
};

const ViewRecords = ({ visible, onClose, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [semesterPickerVisible, setSemesterPickerVisible] = useState(false);
  const [branchPickerVisible, setBranchPickerVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentProfileVisible, setStudentProfileVisible] = useState(false);

  const semesters = [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8',
  ];

  const branches = [
    'CS - Computer Science',
    'IT - Information Technology',
    'ECE - Electronics & Communication',
    'EEE - Electrical Engineering',
    'ME - Mechanical Engineering',
    'CE - Civil Engineering',
  ];

  const students =
    selectedSemester && selectedBranch
      ? generateStudents(
          parseInt(selectedSemester.replace('Semester ', '')),
          selectedBranch
        )
      : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5';
      case 'present':
        return isDark ? 'rgba(96, 165, 250, 0.2)' : '#DBEAFE';
      case 'absent':
        return isDark ? 'rgba(248, 113, 113, 0.2)' : '#FEE2E2';
      case 'left':
        return isDark ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7';
      default:
        return theme.gray100;
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'active':
        return isDark ? '#34D399' : '#10B981';
      case 'present':
        return isDark ? '#60A5FA' : '#3B82F6';
      case 'absent':
        return isDark ? '#F87171' : '#EF4444';
      case 'left':
        return isDark ? '#FBBF24' : '#F59E0B';
      default:
        return theme.text;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'left':
        return 'Left Early';
      default:
        return 'Unknown';
    }
  };

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.studentCard, { backgroundColor: theme.surface }]}
      onPress={() => {
        setSelectedStudent(item);
        setStudentProfileVisible(true);
      }}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.photo }} style={styles.studentImage} />
      <View style={styles.studentInfo}>
        <Text style={[styles.studentName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.studentRoll, { color: theme.textSecondary }]}>
          {item.rollNo}
        </Text>
      </View>
      <View style={styles.studentRight}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusTextColor(item.status) },
            ]}
          >
            {getStatusLabel(item.status)}
          </Text>
        </View>
        <Text
          style={[styles.attendanceText, { color: theme.textSecondary }]}
        >
          {item.attendance}% Attendance
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderPickerModal = (title, items, selected, onSelect, visible, onClose) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.pickerOverlay}>
        <View style={[styles.pickerContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.pickerHeader}>
            <Text style={[styles.pickerTitle, { color: theme.text }]}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.pickerList}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.pickerItem,
                  selected === item && {
                    backgroundColor: theme.gray100,
                  },
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    { color: theme.text },
                    selected === item && { fontWeight: '600' },
                  ]}
                >
                  {item}
                </Text>
                {selected === item && (
                  <Icon name="check" size={20} color={theme.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            View Records
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Selection Section */}
        <View style={[styles.selectionSection, { backgroundColor: theme.surface }]}>
          <View style={styles.selectionRow}>
            {/* Semester Selector */}
            <View style={styles.selectorContainer}>
              <Text style={[styles.selectorLabel, { color: theme.textSecondary }]}>
                Select Semester
              </Text>
              <TouchableOpacity
                style={[styles.selector, { 
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                }]}
                onPress={() => setSemesterPickerVisible(true)}
              >
                <Text style={[styles.selectorText, { 
                  color: selectedSemester ? theme.text : theme.textSecondary,
                }]}>
                  {selectedSemester || 'Choose semester'}
                </Text>
                <Icon name="chevron-down" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Branch Selector */}
            <View style={styles.selectorContainer}>
              <Text style={[styles.selectorLabel, { color: theme.textSecondary }]}>
                Select Branch
              </Text>
              <TouchableOpacity
                style={[styles.selector, { 
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                }]}
                onPress={() => setBranchPickerVisible(true)}
              >
                <Text style={[styles.selectorText, { 
                  color: selectedBranch ? theme.text : theme.textSecondary,
                }]}>
                  {selectedBranch || 'Choose branch'}
                </Text>
                <Icon name="chevron-down" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Student List */}
        {selectedSemester && selectedBranch ? (
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text style={[styles.listTitle, { color: theme.text }]}>
                {selectedBranch.split(' - ')[0]} - {selectedSemester}
              </Text>
              <Text style={[styles.listCount, { color: theme.textSecondary }]}>
                {students.length} Students
              </Text>
            </View>
            <FlatList
              data={students}
              renderItem={renderStudentItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIcon, { backgroundColor: theme.gray100 }]}>
              <Icon name="file-text" size={48} color={theme.textSecondary} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No Selection Made
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Please select both semester and branch to view student records
            </Text>
          </View>
        )}

        {/* Picker Modals */}
        {renderPickerModal(
          'Select Semester',
          semesters,
          selectedSemester,
          setSelectedSemester,
          semesterPickerVisible,
          () => setSemesterPickerVisible(false)
        )}

        {renderPickerModal(
          'Select Branch',
          branches,
          selectedBranch,
          setSelectedBranch,
          branchPickerVisible,
          () => setBranchPickerVisible(false)
        )}

        {/* Student Profile Modal */}
        {selectedStudent && (
          <Modal
            visible={studentProfileVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setStudentProfileVisible(false)}
          >
            <View style={styles.profileOverlay}>
              <View style={[styles.profileContainer, { backgroundColor: theme.surface }]}>
                <View style={styles.profileHeader}>
                  <Text style={[styles.profileTitle, { color: theme.text }]}>
                    Student Profile
                  </Text>
                  <TouchableOpacity onPress={() => setStudentProfileVisible(false)}>
                    <Icon name="x" size={24} color={theme.text} />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.profileContent}>
                  <Image
                    source={{ uri: selectedStudent.photo }}
                    style={styles.profileImage}
                  />
                  <Text style={[styles.profileName, { color: theme.text }]}>
                    {selectedStudent.name}
                  </Text>
                  <Text style={[styles.profileRoll, { color: theme.textSecondary }]}>
                    {selectedStudent.rollNo}
                  </Text>
                  <View style={[styles.profileInfo, { borderTopColor: theme.border }]}>
                    <View style={styles.profileInfoRow}>
                      <Text style={[styles.profileInfoLabel, { color: theme.textSecondary }]}>
                        Email
                      </Text>
                      <Text style={[styles.profileInfoValue, { color: theme.text }]}>
                        {selectedStudent.email}
                      </Text>
                    </View>
                    <View style={styles.profileInfoRow}>
                      <Text style={[styles.profileInfoLabel, { color: theme.textSecondary }]}>
                        Attendance
                      </Text>
                      <Text style={[styles.profileInfoValue, { color: theme.primary }]}>
                        {selectedStudent.attendance}%
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    marginLeft: 12,
  },
  headerSpacer: {
    width: 40,
  },
  selectionSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectionRow: {
    gap: 12,
  },
  selectorContainer: {
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectorText: {
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  listCount: {
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  studentCard: {
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
  studentImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  studentRoll: {
    fontSize: 14,
  },
  studentRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  attendanceText: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 300,
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  pickerList: {
    maxHeight: 400,
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pickerItemText: {
    fontSize: 16,
  },
  profileOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileContent: {
    padding: 20,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  profileRoll: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  profileInfo: {
    borderTopWidth: 1,
    paddingTop: 20,
  },
  profileInfoRow: {
    marginBottom: 16,
  },
  profileInfoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileInfoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ViewRecords;
