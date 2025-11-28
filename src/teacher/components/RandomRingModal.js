import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyles, colors } from '../styles/teacherStyles';
import apiService from '../services/api';

const RandomRingModal = ({ visible, onClose, students, isDark, teacherId, currentClass }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  const handleRing = async () => {
    try {
      setLoading(true);
      
      let selected = [];
      
      if (selectedOption === 'all') {
        selected = [...students];
      } else {
        const num = parseInt(numberOfStudents) || 0;
        if (num <= 0 || num > students.length) {
          Alert.alert('Invalid Number', `Please enter a number between 1 and ${students.length}`);
          setLoading(false);
          return;
        }
        const shuffled = [...students].sort(() => Math.random() - 0.5);
        selected = shuffled.slice(0, Math.min(num, students.length));
      }
      
      // Call API to trigger random ring
      if (teacherId && currentClass) {
        const randomRingData = {
          teacherId,
          classId: currentClass._id || 'temp',
          type: selectedOption === 'all' ? 'all' : 'select',
          count: selectedOption === 'all' ? students.length : selected.length,
          semester: currentClass.semester,
          branch: currentClass.branch,
          studentIds: selected.map(s => s.id),
        };

        await apiService.triggerRandomRing(randomRingData);
      }
      
      setSelectedStudents(selected);
      setShowResults(true);
    } catch (error) {
      console.error('Error triggering random ring:', error);
      Alert.alert('Error', 'Failed to trigger random ring. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedOption('all');
    setNumberOfStudents('');
    setSelectedStudents([]);
    setShowResults(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={localStyles.modalOverlay}>
        <View style={[localStyles.modalContent, { backgroundColor: theme.surface }]}>
          <View style={localStyles.modalHeader}>
            <Text style={[localStyles.modalTitle, { color: theme.text }]}>
              Random Ring
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="x" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={localStyles.modalBody}>
            {!showResults ? (
              <>
                <Text style={[localStyles.description, { color: theme.textSecondary }]}>
                  Select students to randomly ring for attendance
                </Text>

                <TouchableOpacity
                  style={[
                    localStyles.optionCard,
                    { 
                      backgroundColor: selectedOption === 'all' ? theme.primary : theme.gray100,
                      borderColor: selectedOption === 'all' ? theme.primary : theme.border,
                    },
                  ]}
                  onPress={() => setSelectedOption('all')}
                >
                  <View style={localStyles.radio}>
                    {selectedOption === 'all' && (
                      <View style={[localStyles.radioInner, { backgroundColor: '#FFFFFF' }]} />
                    )}
                  </View>
                  <View style={localStyles.optionContent}>
                    <Text style={[
                      localStyles.optionTitle,
                      { color: selectedOption === 'all' ? '#FFFFFF' : theme.text }
                    ]}>
                      All Students
                    </Text>
                    <Text style={[
                      localStyles.optionDesc,
                      { color: selectedOption === 'all' ? '#FFFFFF' : theme.textSecondary }
                    ]}>
                      Ring all {students.length} students
                    </Text>
                  </View>
                  <Icon
                    name="users"
                    size={24}
                    color={selectedOption === 'all' ? '#FFFFFF' : theme.textSecondary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    localStyles.optionCard,
                    { 
                      backgroundColor: selectedOption === 'custom' ? theme.primary : theme.gray100,
                      borderColor: selectedOption === 'custom' ? theme.primary : theme.border,
                    },
                  ]}
                  onPress={() => setSelectedOption('custom')}
                >
                  <View style={localStyles.radio}>
                    {selectedOption === 'custom' && (
                      <View style={[localStyles.radioInner, { backgroundColor: '#FFFFFF' }]} />
                    )}
                  </View>
                  <View style={localStyles.optionContent}>
                    <Text style={[
                      localStyles.optionTitle,
                      { color: selectedOption === 'custom' ? '#FFFFFF' : theme.text }
                    ]}>
                      Select Number
                    </Text>
                    <Text style={[
                      localStyles.optionDesc,
                      { color: selectedOption === 'custom' ? '#FFFFFF' : theme.textSecondary }
                    ]}>
                      Choose how many students to ring
                    </Text>
                  </View>
                  <Icon
                    name="hash"
                    size={24}
                    color={selectedOption === 'custom' ? '#FFFFFF' : theme.textSecondary}
                  />
                </TouchableOpacity>

                {selectedOption === 'custom' && (
                  <View style={localStyles.inputContainer}>
                    <Text style={[localStyles.inputLabel, { color: theme.text }]}>
                      Number of Students
                    </Text>
                    <TextInput
                      style={[localStyles.input, { 
                        backgroundColor: theme.surface,
                        color: theme.text,
                        borderColor: theme.border,
                      }]}
                      placeholder="Enter number"
                      placeholderTextColor={theme.textSecondary}
                      keyboardType="number-pad"
                      value={numberOfStudents}
                      onChangeText={setNumberOfStudents}
                    />
                    <Text style={[localStyles.inputHint, { color: theme.textSecondary }]}>
                      Max: {students.length}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[localStyles.ringButton, { 
                    backgroundColor: loading ? theme.gray200 : theme.primary 
                  }]}
                  onPress={handleRing}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Icon name="bell" size={20} color="#FFFFFF" />
                      <Text style={localStyles.ringButtonText}>Ring Students</Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={localStyles.resultsHeader}>
                  <Icon name="bell" size={32} color={theme.primary} />
                  <Text style={[localStyles.resultsTitle, { color: theme.text }]}>
                    Ringing {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''}
                  </Text>
                </View>

                <View style={localStyles.studentsList}>
                  {selectedStudents.map((student, index) => (
                    <View
                      key={student.id}
                      style={[localStyles.studentItem, { 
                        backgroundColor: theme.gray100,
                        borderLeftColor: theme.primary,
                      }]}
                    >
                      <Text style={[localStyles.studentNumber, { color: theme.textSecondary }]}>
                        {index + 1}.
                      </Text>
                      <View style={localStyles.studentInfo}>
                        <Text style={[localStyles.studentName, { color: theme.text }]}>
                          {student.name}
                        </Text>
                        <Text style={[localStyles.studentRoll, { color: theme.textSecondary }]}>
                          {student.rollNumber}
                        </Text>
                      </View>
                      <Icon name="bell" size={18} color={theme.primary} />
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[localStyles.doneButton, { backgroundColor: theme.primary }]}
                  onPress={handleClose}
                >
                  <Text style={localStyles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
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
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 4,
  },
  inputHint: {
    fontSize: 12,
  },
  ringButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ringButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  studentsList: {
    marginBottom: 20,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  studentNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    width: 30,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  studentRoll: {
    fontSize: 14,
  },
  doneButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RandomRingModal;
