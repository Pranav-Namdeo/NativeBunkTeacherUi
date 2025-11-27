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

const TeacherHeader = ({ isDark, onToggleTheme }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  const menuItems = [
    { id: 1, label: 'View Records', icon: 'file-text' },
    { id: 2, label: 'Notification', icon: 'bell' },
    { id: 3, label: 'Updates', icon: 'refresh-cw' },
    { id: 4, label: 'Help and Support', icon: 'help-circle' },
    { id: 5, label: 'FAQs', icon: 'message-circle' },
  ];

  const teacherInfo = {
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
                onPress={() => setMenuVisible(false)}
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

      {/* Profile Modal */}
      <Modal
        visible={profileVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProfileVisible(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View style={[localStyles.profileModal, { backgroundColor: theme.surface }]}>
            <View style={localStyles.profileHeader}>
              <Text style={[localStyles.profileTitle, { color: theme.text }]}>
                Teacher Profile
              </Text>
              <TouchableOpacity onPress={() => setProfileVisible(false)}>
                <Icon name="x" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={localStyles.profileContent}>
              <View style={localStyles.profileImageContainer}>
                <Image
                  source={{ uri: teacherInfo.photo }}
                  style={localStyles.profileImageLarge}
                />
              </View>

              <View style={localStyles.profileInfo}>
                <Text style={[localStyles.teacherName, { color: theme.text }]}>
                  {teacherInfo.name}
                </Text>
                <Text style={[localStyles.teacherDept, { color: theme.textSecondary }]}>
                  {teacherInfo.department}
                </Text>
              </View>

              <View style={[localStyles.infoSection, { borderTopColor: theme.border }]}>
                <View style={localStyles.infoRow}>
                  <Icon name="mail" size={18} color={theme.textSecondary} />
                  <Text style={[localStyles.infoText, { color: theme.text }]}>
                    {teacherInfo.email}
                  </Text>
                </View>
                <View style={localStyles.infoRow}>
                  <Icon name="credit-card" size={18} color={theme.textSecondary} />
                  <Text style={[localStyles.infoText, { color: theme.text }]}>
                    {teacherInfo.employeeId}
                  </Text>
                </View>
              </View>

              <View style={localStyles.subjectsSection}>
                <Text style={[localStyles.sectionTitle, { color: theme.text }]}>
                  Subjects Teaching
                </Text>
                {teacherInfo.subjects.map((subject, index) => (
                  <View
                    key={index}
                    style={[localStyles.subjectChip, { backgroundColor: theme.gray100 }]}
                  >
                    <Text style={[localStyles.subjectText, { color: theme.text }]}>
                      {subject}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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