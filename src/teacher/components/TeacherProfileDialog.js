import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const TeacherProfileDialog = ({ visible, onClose, isDark, teacherData, onLogout }) => {
  const theme = isDark ? colors.dark : colors.light;

  // Default teacher data if not provided
  const teacher = teacherData || {
    name: 'Dr. Sarah Johnson',
    teacherId: 'TCH-2024-001',
    email: 'sarah.johnson@school.edu',
    profileImage: 'https://images.unsplash.com/photo-1544972917-3529b113a469?w=400',
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    // TODO: Add change password functionality
    Alert.alert(
      'Change Password',
      'This feature will be available soon.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('✅ User confirmed logout');
            onClose();
            if (onLogout) {
              onLogout();
            }
          },
        },
      ]
    );
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
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Icon name="x" size={24} color={theme.text} />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Photo */}
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: teacher.profileImage }}
                style={[styles.photo, { borderColor: theme.border }]}
              />
            </View>

            {/* Teacher Information */}
            <View style={styles.infoSection}>
              <Text style={[styles.name, { color: theme.text }]}>
                {teacher.name}
              </Text>

              <View style={styles.detailsContainer}>
                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: theme.gray100 },
                  ]}
                >
                  <Text
                    style={[styles.detailLabel, { color: theme.textSecondary }]}
                  >
                    Teacher ID
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {teacher.teacherId}
                  </Text>
                </View>

                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: theme.gray100 },
                  ]}
                >
                  <Text
                    style={[styles.detailLabel, { color: theme.textSecondary }]}
                  >
                    Email
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {teacher.email}
                  </Text>
                </View>
              </View>
            </View>

            {/* Separator */}
            <View
              style={[styles.separator, { backgroundColor: theme.border }]}
            />

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { borderColor: theme.border }]}
                onPress={handleChangePassword}
              >
                <Icon name="key" size={20} color={theme.text} />
                <Text style={[styles.actionText, { color: theme.text }]}>
                  Change Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: '#EF4444' }]}
                onPress={handleLogout}
              >
                <Icon name="log-out" size={20} color="#FFFFFF" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
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
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  content: {
    paddingTop: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    gap: 12,
  },
  detailCard: {
    borderRadius: 12,
    padding: 12,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 24,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TeacherProfileDialog;
