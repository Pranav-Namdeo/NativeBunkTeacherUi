import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const HelpAndSupport = ({ visible, onClose, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const quickHelpCards = [
    {
      icon: 'book',
      title: 'User Guide',
      description: 'Learn how to use all features',
      color: 'blue',
    },
    {
      icon: 'video',
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      color: 'purple',
    },
    {
      icon: 'file-text',
      title: 'Documentation',
      description: 'Browse technical docs',
      color: 'green',
    },
    {
      icon: 'help-circle',
      title: 'FAQs',
      description: 'Find quick answers',
      color: 'orange',
    },
  ];

  const faqs = [
    {
      question: 'How do I mark attendance for students?',
      answer:
        'You can mark attendance by viewing the student list on the home tab. Each student card shows their current status (Active, Present, Absent, or Left Early). Click on any student to view their detailed profile and attendance history.',
    },
    {
      question: 'How does the Random Ring feature work?',
      answer:
        'The Random Ring feature (bell icon) allows you to randomly select a student from your class. Click the floating bell button on the home screen, and the system will randomly pick a student for you to call upon.',
    },
    {
      question: 'Can I view attendance records by semester and branch?',
      answer:
        "Yes! Click on the three-dot menu and select 'View Records'. You can then filter students by selecting a specific semester and branch from the dropdown menus.",
    },
    {
      question: 'How do I switch between light and dark mode?',
      answer:
        'Click the theme toggle button (sun/moon icon) located in the header next to the three-dot menu. The app will instantly switch between light and dark themes.',
    },
    {
      question: 'What do the different student status badges mean?',
      answer:
        'Active (Green): Student is currently in class. Present (Blue): Student has been marked present. Absent (Red): Student has not joined the class. Left Early (Orange): Student left before the class ended.',
    },
    {
      question: 'How can I search for a specific student?',
      answer:
        'Use the search bar below the header on the home tab. You can search for students by their name or roll number.',
    },
    {
      question: 'Can I see how long a student has been in class?',
      answer:
        'Yes, each student card displays a timer showing how long they have been in the class since they joined.',
    },
    {
      question: 'How do I update my teacher profile?',
      answer:
        'Click on your profile picture in the top-left corner of the header to view and edit your profile information.',
    },
  ];

  const contactOptions = [
    {
      icon: 'mail',
      title: 'Email Support',
      value: 'support@letsbunk.edu',
      action: 'Send Email',
      color: 'blue',
      onPress: () => Linking.openURL('mailto:support@letsbunk.edu'),
    },
    {
      icon: 'phone',
      title: 'Phone Support',
      value: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'green',
      onPress: () => Linking.openURL('tel:+15551234567'),
    },
    {
      icon: 'message-circle',
      title: 'Live Chat',
      value: 'Available 24/7',
      action: 'Start Chat',
      color: 'purple',
      onPress: () => console.log('Start chat'),
    },
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'blue':
        return isDark ? '#60A5FA' : '#3B82F6';
      case 'purple':
        return isDark ? '#A78BFA' : '#8B5CF6';
      case 'green':
        return isDark ? '#34D399' : '#10B981';
      case 'orange':
        return isDark ? '#FBBF24' : '#F59E0B';
      default:
        return theme.textSecondary;
    }
  };

  const getBackgroundColor = (color) => {
    switch (color) {
      case 'blue':
        return isDark ? 'rgba(96, 165, 250, 0.2)' : '#DBEAFE';
      case 'purple':
        return isDark ? 'rgba(167, 139, 250, 0.2)' : '#EDE9FE';
      case 'green':
        return isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5';
      case 'orange':
        return isDark ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7';
      default:
        return theme.gray100;
    }
  };

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Help & Support
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>How can we help you?</Text>
            <Text style={styles.welcomeSubtitle}>
              Search our knowledge base or contact our support team
            </Text>
            <View
              style={[
                styles.searchContainer,
                { backgroundColor: '#FFFFFF', borderColor: theme.border },
              ]}
            >
              <Icon name="search" size={20} color="#6B7280" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for help..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Quick Help Cards */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Quick Help
            </Text>
            <View style={styles.quickHelpGrid}>
              {quickHelpCards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.quickHelpCard,
                    { backgroundColor: theme.surface, borderColor: theme.border },
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.quickHelpIcon,
                      { backgroundColor: getBackgroundColor(card.color) },
                    ]}
                  >
                    <Icon
                      name={card.icon}
                      size={24}
                      color={getIconColor(card.color)}
                    />
                  </View>
                  <Text
                    style={[styles.quickHelpTitle, { color: theme.text }]}
                  >
                    {card.title}
                  </Text>
                  <Text
                    style={[
                      styles.quickHelpDescription,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {card.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* FAQs Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Frequently Asked Questions
            </Text>
            {filteredFaqs.length > 0 ? (
              <View
                style={[
                  styles.faqContainer,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                {filteredFaqs.map((faq, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={[
                        styles.faqItem,
                        index < filteredFaqs.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: theme.border,
                        },
                      ]}
                      onPress={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                    >
                      <Text
                        style={[styles.faqQuestion, { color: theme.text }]}
                      >
                        {faq.question}
                      </Text>
                      <Icon
                        name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={theme.textSecondary}
                      />
                    </TouchableOpacity>
                    {expandedFaq === index && (
                      <View style={styles.faqAnswer}>
                        <Text
                          style={[
                            styles.faqAnswerText,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {faq.answer}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={[
                  styles.noResults,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.noResultsText, { color: theme.textSecondary }]}>
                  No results found for "{searchQuery}"
                </Text>
              </View>
            )}
          </View>

          {/* Contact Support */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Contact Support
            </Text>
            {contactOptions.map((option, index) => (
              <View
                key={index}
                style={[
                  styles.contactCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <View
                  style={[
                    styles.contactIcon,
                    { backgroundColor: getBackgroundColor(option.color) },
                  ]}
                >
                  <Icon
                    name={option.icon}
                    size={24}
                    color={getIconColor(option.color)}
                  />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactTitle, { color: theme.text }]}>
                    {option.title}
                  </Text>
                  <Text
                    style={[
                      styles.contactValue,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {option.value}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.contactButton, { borderColor: theme.border }]}
                  onPress={option.onPress}
                >
                  <Text
                    style={[styles.contactButtonText, { color: theme.text }]}
                  >
                    {option.action}
                  </Text>
                  <Icon name="chevron-right" size={16} color={theme.text} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Additional Resources */}
          <View style={styles.section}>
            <View
              style={[
                styles.resourcesContainer,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Additional Resources
              </Text>
              {[
                'Terms of Service',
                'Privacy Policy',
                'Community Guidelines',
                'Report a Bug',
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.resourceItem}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.resourceText, { color: theme.text }]}>
                    {item}
                  </Text>
                  <Icon name="chevron-right" size={20} color={theme.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* App Version */}
          <View style={styles.versionSection}>
            <Text
              style={[styles.versionText, { color: theme.textSecondary }]}
            >
              LetsBunk Teacher Panel v1.2.0
            </Text>
            <Text
              style={[styles.copyrightText, { color: theme.textSecondary }]}
            >
              © 2024 LetsBunk. All rights reserved.
            </Text>
          </View>
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
  welcomeSection: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickHelpCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickHelpIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickHelpTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  quickHelpDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  faqContainer: {
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  faqAnswerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  noResults: {
    borderRadius: 12,
    padding: 32,
    borderWidth: 1,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resourcesContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resourceText: {
    fontSize: 16,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
  },
});

export default HelpAndSupport;
