import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const TimetableSelector = ({ onSelect, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);

  const branches = [
    { id: 'cse', name: 'Computer Science Engineering', icon: '💻' },
    { id: 'ece', name: 'Electronics & Communication', icon: '📡' },
    { id: 'me', name: 'Mechanical Engineering', icon: '⚙️' },
    { id: 'ce', name: 'Civil Engineering', icon: '🏗️' },
    { id: 'ee', name: 'Electrical Engineering', icon: '⚡' },
    { id: 'it', name: 'Information Technology', icon: '🖥️' },
  ];

  const semesters = [
    { id: '1', name: '1st Semester' },
    { id: '2', name: '2nd Semester' },
    { id: '3', name: '3rd Semester' },
    { id: '4', name: '4th Semester' },
    { id: '5', name: '5th Semester' },
    { id: '6', name: '6th Semester' },
    { id: '7', name: '7th Semester' },
    { id: '8', name: '8th Semester' },
  ];

  const handleBranchSelect = (branchId) => {
    setSelectedBranch(branchId);
    setBranchDropdownOpen(false);
  };

  const handleSemesterSelect = (semesterId) => {
    setSelectedSemester(semesterId);
    setSemesterDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      onSelect(selectedBranch, selectedSemester);
    }
  };

  const getSelectedBranchName = () => {
    const branch = branches.find((b) => b.id === selectedBranch);
    return branch ? `${branch.icon} ${branch.name}` : 'Select Branch';
  };

  const getSelectedSemesterName = () => {
    const semester = semesters.find((s) => s.id === selectedSemester);
    return semester ? semester.name : 'Select Semester';
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>🎓</Text>
          <Text style={styles.headerTitle}>Select Timetable</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Choose your branch and semester to view the timetable
        </Text>
      </View>

      {/* Branch Selection */}
      <View style={styles.section}>
        <View style={styles.labelContainer}>
          <Icon name="book-open" size={16} color={theme.primary} />
          <Text style={[styles.label, { color: theme.text }]}>Branch</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.dropdown,
            {
              borderColor: selectedBranch ? theme.primary : theme.border,
              backgroundColor: selectedBranch
                ? isDark
                  ? 'rgba(59, 130, 246, 0.2)'
                  : '#EFF6FF'
                : theme.surface,
            },
          ]}
          onPress={() => {
            setBranchDropdownOpen(!branchDropdownOpen);
            setSemesterDropdownOpen(false);
          }}
        >
          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedBranch ? theme.primary : theme.textSecondary,
              },
            ]}
          >
            {getSelectedBranchName()}
          </Text>
          <Icon
            name="chevron-down"
            size={20}
            color={selectedBranch ? theme.primary : theme.textSecondary}
            style={{
              transform: [
                { rotate: branchDropdownOpen ? '180deg' : '0deg' },
              ],
            }}
          />
        </TouchableOpacity>

        {/* Branch Dropdown */}
        {branchDropdownOpen && (
          <View
            style={[
              styles.dropdownList,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {branches.map((branch, index) => (
                <TouchableOpacity
                  key={branch.id}
                  style={[
                    styles.dropdownItem,
                    index < branches.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
                  ]}
                  onPress={() => handleBranchSelect(branch.id)}
                >
                  <Text style={styles.branchIcon}>{branch.icon}</Text>
                  <View style={styles.branchInfo}>
                    <Text style={[styles.branchName, { color: theme.text }]}>
                      {branch.name}
                    </Text>
                    <Text
                      style={[styles.branchCode, { color: theme.textSecondary }]}
                    >
                      {branch.id.toUpperCase()}
                    </Text>
                  </View>
                  {selectedBranch === branch.id && (
                    <Icon name="check" size={20} color={theme.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Semester Selection */}
      <View style={styles.section}>
        <View style={styles.labelContainer}>
          <Icon name="award" size={16} color={theme.primary} />
          <Text style={[styles.label, { color: theme.text }]}>Semester</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.dropdown,
            {
              borderColor: selectedSemester ? theme.primary : theme.border,
              backgroundColor: selectedSemester
                ? isDark
                  ? 'rgba(59, 130, 246, 0.2)'
                  : '#EFF6FF'
                : theme.surface,
            },
          ]}
          onPress={() => {
            setSemesterDropdownOpen(!semesterDropdownOpen);
            setBranchDropdownOpen(false);
          }}
        >
          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedSemester ? theme.primary : theme.textSecondary,
              },
            ]}
          >
            {getSelectedSemesterName()}
          </Text>
          <Icon
            name="chevron-down"
            size={20}
            color={selectedSemester ? theme.primary : theme.textSecondary}
            style={{
              transform: [
                { rotate: semesterDropdownOpen ? '180deg' : '0deg' },
              ],
            }}
          />
        </TouchableOpacity>

        {/* Semester Dropdown */}
        {semesterDropdownOpen && (
          <View
            style={[
              styles.dropdownList,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {semesters.map((semester, index) => (
                <TouchableOpacity
                  key={semester.id}
                  style={[
                    styles.dropdownItem,
                    index < semesters.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
                  ]}
                  onPress={() => handleSemesterSelect(semester.id)}
                >
                  <Text
                    style={[styles.semesterName, { color: theme.text }]}
                  >
                    {semester.name}
                  </Text>
                  {selectedSemester === semester.id && (
                    <Icon name="check" size={20} color={theme.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor:
              selectedBranch && selectedSemester
                ? isDark
                  ? '#3B82F6'
                  : '#2563EB'
                : theme.gray200,
          },
        ]}
        onPress={handleSubmit}
        disabled={!selectedBranch || !selectedSemester}
      >
        <Text style={styles.submitButtonText}>View Timetable</Text>
        <Icon name="arrow-right" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {(!selectedBranch || !selectedSemester) && (
        <Text
          style={[styles.helperText, { color: theme.textSecondary }]}
        >
          Please select both branch and semester to continue
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  dropdownList: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownScroll: {
    maxHeight: 320,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  branchIcon: {
    fontSize: 28,
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: 16,
    fontWeight: '500',
  },
  branchCode: {
    fontSize: 12,
    marginTop: 2,
  },
  semesterName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default TimetableSelector;
