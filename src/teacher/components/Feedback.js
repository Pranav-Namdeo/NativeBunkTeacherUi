import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const Feedback = ({ visible, onClose, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', emoji: '🐛' },
    { id: 'feature', label: 'Feature Request', emoji: '💡' },
    { id: 'improvement', label: 'Improvement', emoji: '⚡' },
    { id: 'compliment', label: 'Compliment', emoji: '❤️' },
    { id: 'other', label: 'Other', emoji: '💬' },
  ];

  const handleSubmit = () => {
    // TODO: Submit to API
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setFeedbackType('');
      setSubject('');
      setMessage('');
      setEmail('');
      onClose();
    }, 3000);
  };

  const isFormValid = rating > 0 && feedbackType && subject && message;

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1:
        return "Poor - We'll work to improve";
      case 2:
        return "Fair - There's room for improvement";
      case 3:
        return "Good - We're getting there";
      case 4:
        return 'Very Good - Glad you like it!';
      case 5:
        return 'Excellent - Thank you!';
      default:
        return '';
    }
  };

  if (isSubmitted) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: theme.surface }]}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Feedback
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Success Message */}
          <View style={styles.successContainer}>
            <View
              style={[
                styles.successIcon,
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
            <Text style={[styles.successTitle, { color: theme.text }]}>
              Thank You!
            </Text>
            <Text
              style={[styles.successMessage, { color: theme.textSecondary }]}
            >
              Your feedback has been submitted successfully. We appreciate your
              input and will review it shortly.
            </Text>
            <TouchableOpacity
              style={[
                styles.successButton,
                { backgroundColor: isDark ? '#3B82F6' : '#2563EB' },
              ]}
              onPress={onClose}
            >
              <Text style={styles.successButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Feedback
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Introduction */}
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>We'd Love Your Feedback!</Text>
            <Text style={styles.introSubtitle}>
              Help us improve LetsBunk by sharing your thoughts, reporting
              bugs, or suggesting new features.
            </Text>
          </View>

          {/* Rating Section */}
          <View
            style={[
              styles.formSection,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.formLabel, { color: theme.text }]}>
              How would you rate your experience?
            </Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  style={styles.star}
                >
                  <Text style={styles.starIcon}>
                    {star <= rating ? '⭐' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <Text
                style={[styles.ratingLabel, { color: theme.textSecondary }]}
              >
                {getRatingLabel(rating)}
              </Text>
            )}
          </View>

          {/* Feedback Type */}
          <View
            style={[
              styles.formSection,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.formLabel, { color: theme.text }]}>
              What type of feedback is this?
            </Text>
            <View style={styles.typeGrid}>
              {feedbackTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    {
                      borderColor:
                        feedbackType === type.id
                          ? theme.primary
                          : theme.border,
                      backgroundColor:
                        feedbackType === type.id
                          ? isDark
                            ? 'rgba(59, 130, 246, 0.2)'
                            : '#EFF6FF'
                          : 'transparent',
                    },
                  ]}
                  onPress={() => setFeedbackType(type.id)}
                >
                  <Text style={styles.typeEmoji}>{type.emoji}</Text>
                  <Text
                    style={[
                      styles.typeLabel,
                      {
                        color:
                          feedbackType === type.id
                            ? theme.primary
                            : theme.text,
                      },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Subject */}
          <View
            style={[
              styles.formSection,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.formLabel, { color: theme.text }]}>
              Subject
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Brief summary of your feedback"
              placeholderTextColor={theme.textSecondary}
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          {/* Message */}
          <View
            style={[
              styles.formSection,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.formLabel, { color: theme.text }]}>
              Your Feedback
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Please provide detailed feedback. The more information you share, the better we can help!"
              placeholderTextColor={theme.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text
              style={[styles.charCount, { color: theme.textSecondary }]}
            >
              {message.length} / 500 characters
            </Text>
          </View>

          {/* Email (Optional) */}
          <View
            style={[
              styles.formSection,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.formLabel, { color: theme.text }]}>
              Email Address{' '}
              <Text style={{ color: theme.textSecondary }}>(Optional)</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="your.email@example.com"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text
              style={[styles.inputHint, { color: theme.textSecondary }]}
            >
              We'll only use this to follow up on your feedback if needed
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: isFormValid
                  ? isDark
                    ? '#3B82F6'
                    : '#2563EB'
                  : theme.gray200,
              },
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Icon name="send" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>

          {!isFormValid && (
            <Text
              style={[
                styles.validationText,
                { color: theme.textSecondary },
              ]}
            >
              Please complete all required fields to submit
            </Text>
          )}

          {/* Privacy Note */}
          <Text
            style={[styles.privacyNote, { color: theme.textSecondary }]}
          >
            Your feedback is valuable to us. We respect your privacy and will
            never share your information with third parties.
          </Text>
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
  introSection: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
    lineHeight: 20,
  },
  formSection: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    padding: 4,
  },
  starIcon: {
    fontSize: 40,
  },
  ratingLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  typeEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    marginTop: 8,
  },
  inputHint: {
    fontSize: 12,
    marginTop: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  validationText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  privacyNote: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 24,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  successButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Feedback;
