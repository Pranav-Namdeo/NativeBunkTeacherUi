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
import TeacherProfileDialog from './TeacherProfileDialog';

const TeacherHeader = ({ isDark, onToggleTheme, onMenuItemPress, onLogout, teacherData }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  const menuItems = [
    { id: 1, label: 'View Records', icon: 'file-text', action: 'viewRecords' },
    { id: 2, label: 'Notification', icon: 'bell', action: 'notification' },
    { id: 3, label: 'Updates', icon: 'refresh-cw', action: 'updates' },
    { id: 4, label: 'Help and Support', icon: 'help-circle', action: 'help' },
    { id: 5, label: 'Feedback', icon: 'message-circle', action: 'feedback' },
  ];

  const handleMenuItemPress = (action) => {
    setMenuVisible(false);
    if (onMenuItemPress) {
      onMenuItemPress(action);
    }
  };

  // Use teacherData from props or fallback to default
  const teacherInfo = teacherData ? {
    name: teacherData.name,
    email: teacherData.email,
    department: teacherData.department,
    employeeId: teacherData.employeeId,
    subjects: teacherData.subjects || [],
    photo: teacherData.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacherData.name}`,
  } : {
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@university.edu',
    department: 'Computer Science',
    employeeId: 'EMP001',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  };

  return (
    <View style={localStyles.container}>
      <View style={[localStyles.header, { backgroundColor: theme.surface }]}>
        {/* Profile Photo */}
        <TouchableOpacity onPress={() => setProfileVisible(true)}>
          <Image
            source={{ uri: teacherInfo.photo }}
            style={localStyles.profileImage}
          />
        </TouchableOpacity>

        {/* App Name */}
        <Text style={[localStyles.appName, { color: theme.text }]}>
          LetsBunk
        </Text>

        {/* Theme Toggle */}
        <TouchableOpacity
          onPress={onToggleTheme}
          style={localStyles.themeButton}
        >
          <Icon
            name={isDark ? 'sun' : 'moon'}
            size={20}
            color={theme.text}
          />
        </TouchableOpacity>

        {/* Menu Button */}
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Icon name="more-vertical" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={localStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[localStyles.menuContainer, { backgroundColor: theme.surface }]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  localStyles.menuItem,
                  index < menuItems.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}
                onPress={() => handleMenuItemPress(item.action)}
              >
                <Icon name={item.icon} size={20} color={theme.text} />
                <Text style={[localStyles.menuText, { color: theme.text }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Teacher Profile Dialog */}
      <TeacherProfileDialog
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
        isDark={isDark}
        teacherData={{
          name: teacherInfo.name,
          teacherId: teacherInfo.employeeId,
          email: teacherInfo.email,
          profileImage: teacherInfo.photo,
        }}
        onLogout={onLogout}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    marginLeft: 12,
  },
  themeButton: {
    padding: 8,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 100,
    right: 16,
    borderRadius: 12,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
  },
  profileModal: {
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  teacherName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  teacherDept: {
    fontSize: 16,
  },
  infoSection: {
    borderTopWidth: 1,
    paddingTop: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
  },
  subjectsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  subjectChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  subjectText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TeacherHeader;