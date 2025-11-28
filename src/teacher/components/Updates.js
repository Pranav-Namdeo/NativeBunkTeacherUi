import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const Updates = ({ visible, onClose, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [updateAvailable] = useState(false); // Change to true to test update
  const currentVersion = '1.2.0';
  const latestVersion = '1.3.0';

  const updateFeatures = [
    'Enhanced attendance tracking with real-time sync',
    'New dark mode improvements',
    'Bug fixes and performance improvements',
    'Added semester-wise student records view',
    'Improved notification system',
  ];

  const handleUpdate = () => {
    // Handle update logic
    console.log('Update clicked');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Updates
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {updateAvailable ? (
            /* Update Available View */
            <View style={styles.updateContainer}>
              {/* Update Available Card */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: isDark
                          ? 'rgba(96, 165, 250, 0.2)'
                          : '#DBEAFE',
                      },
                    ]}
                  >
                    <Icon
                      name="download"
                      size={24}
                      color={isDark ? '#60A5FA' : '#3B82F6'}
                    />
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text
                      style={[styles.cardTitle, { color: theme.text }]}
                    >
                      New Update Available
                    </Text>
                    <Text
                      style={[
                        styles.cardDescription,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Version {latestVersion} is now available. You are currently
                      using version {currentVersion}.
                    </Text>
                  </View>
                </View>
              </View>

              {/* What's New */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text
                  style={[styles.sectionTitle, { color: theme.text }]}
                >
                  What's New
                </Text>
                <View style={styles.featureList}>
                  {updateFeatures.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Icon
                        name="check-circle"
                        size={20}
                        color={isDark ? '#34D399' : '#10B981'}
                        style={styles.featureIcon}
                      />
                      <Text
                        style={[
                          styles.featureText,
                          { color: theme.text },
                        ]}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Update Button */}
              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: isDark ? '#3B82F6' : '#2563EB' },
                ]}
                onPress={handleUpdate}
                activeOpacity={0.8}
              >
                <Icon name="download" size={20} color="#FFFFFF" />
                <Text style={styles.updateButtonText}>Update Now</Text>
              </TouchableOpacity>

              {/* Release Notes */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text
                  style={[styles.sectionTitle, { color: theme.text }]}
                >
                  Release Notes
                </Text>
                <Text
                  style={[
                    styles.releaseDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  This update includes several improvements to enhance your
                  experience with LetsBunk.
                </Text>
                <View style={styles.releaseGrid}>
                  <View style={styles.releaseItem}>
                    <Text
                      style={[
                        styles.releaseLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Current Version
                    </Text>
                    <Text style={[styles.releaseValue, { color: theme.text }]}>
                      {currentVersion}
                    </Text>
                  </View>
                  <View style={styles.releaseItem}>
                    <Text
                      style={[
                        styles.releaseLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Latest Version
                    </Text>
                    <Text style={[styles.releaseValue, { color: theme.text }]}>
                      {latestVersion}
                    </Text>
                  </View>
                  <View style={styles.releaseItem}>
                    <Text
                      style={[
                        styles.releaseLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Release Date
                    </Text>
                    <Text style={[styles.releaseValue, { color: theme.text }]}>
                      Nov 25, 2024
                    </Text>
                  </View>
                  <View style={styles.releaseItem}>
                    <Text
                      style={[
                        styles.releaseLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Size
                    </Text>
                    <Text style={[styles.releaseValue, { color: theme.text }]}>
                      12.5 MB
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            /* No Update Available View */
            <View style={styles.noUpdateContainer}>
              <View
                style={[
                  styles.largeIconCircle,
                  {
                    backgroundColor: isDark
                      ? 'rgba(52, 211, 153, 0.2)'
                      : '#D1FAE5',
                  },
                ]}
              >
                <Icon
                  name="check-circle"
                  size={48}
                  color={isDark ? '#34D399' : '#10B981'}
                />
              </View>

              <Text style={[styles.noUpdateTitle, { color: theme.text }]}>
                You're Up to Date!
              </Text>
              <Text
                style={[
                  styles.noUpdateDescription,
                  { color: theme.textSecondary },
                ]}
              >
                LetsBunk is currently running the latest version {currentVersion}.
                You will be notified when a new update is available.
              </Text>

              {/* Current Version Info */}
              <View
                style={[
                  styles.versionCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <View style={styles.versionRow}>
                  <Text
                    style={[
                      styles.versionLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Current Version
                  </Text>
                  <Text style={[styles.versionValue, { color: theme.text }]}>
                    {currentVersion}
                  </Text>
                </View>
                <View style={styles.versionRow}>
                  <Text
                    style={[
                      styles.versionLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Last Checked
                  </Text>
                  <Text style={[styles.versionValue, { color: theme.text }]}>
                    Just now
                  </Text>
                </View>
                <View style={styles.versionRow}>
                  <Text
                    style={[
                      styles.versionLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Status
                  </Text>
                  <View style={styles.statusRow}>
                    <Icon
                      name="check-circle"
                      size={16}
                      color={isDark ? '#34D399' : '#10B981'}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: isDark ? '#34D399' : '#10B981' },
                      ]}
                    >
                      Up to date
                    </Text>
                  </View>
                </View>
              </View>

              {/* Info Box */}
              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor: isDark
                      ? 'rgba(59, 130, 246, 0.1)'
                      : '#EFF6FF',
                    borderColor: isDark ? '#1E3A8A' : '#BFDBFE',
                  },
                ]}
              >
                <Icon
                  name="info"
                  size={20}
                  color={isDark ? '#60A5FA' : '#3B82F6'}
                  style={styles.infoIcon}
                />
                <View style={styles.infoTextContainer}>
                  <Text
                    style={[
                      styles.infoTitle,
                      { color: isDark ? '#93C5FD' : '#1E40AF' },
                    ]}
                  >
                    Automatic Updates
                  </Text>
                  <Text
                    style={[
                      styles.infoDescription,
                      { color: isDark ? '#60A5FA' : '#2563EB' },
                    ]}
                  >
                    We'll automatically notify you when new updates are available
                    for LetsBunk.
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  updateContainer: {
    gap: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
  },
  featureIcon: {
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  releaseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  releaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  releaseItem: {
    width: '47%',
  },
  releaseLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  releaseValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  noUpdateContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  largeIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  noUpdateTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  noUpdateDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 400,
  },
  versionCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  versionLabel: {
    fontSize: 14,
  },
  versionValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoBox: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Updates;
