import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import connectionTest from '../services/connectionTest';
import { colors } from '../styles/teacherStyles';

const ConnectionTestScreen = ({ onClose, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);

  const runTests = async () => {
    setTesting(true);
    setResults(null);
    
    try {
      const testResults = await connectionTest.runAll();
      setResults(testResults);
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Server Connection Test
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="x" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Server Info */}
        <View
          style={[
            styles.serverInfo,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Icon name="server" size={24} color={theme.primary} />
          <Text style={[styles.serverUrl, { color: theme.text }]}>
            adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net
          </Text>
        </View>

        {/* Run Test Button */}
        <TouchableOpacity
          style={[
            styles.testButton,
            { backgroundColor: theme.primary },
            testing && styles.testButtonDisabled,
          ]}
          onPress={runTests}
          disabled={testing}
        >
          {testing ? (
            <>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.testButtonText}>Running Tests...</Text>
            </>
          ) : (
            <>
              <Icon name="zap" size={20} color="#FFFFFF" />
              <Text style={styles.testButtonText}>Run Connection Tests</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Results */}
        {results && (
          <View style={styles.resultsContainer}>
            {/* Summary */}
            <View
              style={[
                styles.summary,
                {
                  backgroundColor:
                    results.failed === 0
                      ? isDark
                        ? 'rgba(52, 211, 153, 0.2)'
                        : '#D1FAE5'
                      : isDark
                      ? 'rgba(248, 113, 113, 0.2)'
                      : '#FEE2E2',
                  borderColor:
                    results.failed === 0
                      ? isDark
                        ? '#34D399'
                        : '#10B981'
                      : isDark
                      ? '#F87171'
                      : '#EF4444',
                },
              ]}
            >
              <Icon
                name={results.failed === 0 ? 'check-circle' : 'alert-circle'}
                size={48}
                color={
                  results.failed === 0
                    ? isDark
                      ? '#34D399'
                      : '#10B981'
                    : isDark
                    ? '#F87171'
                    : '#EF4444'
                }
              />
              <Text
                style={[
                  styles.summaryText,
                  {
                    color:
                      results.failed === 0
                        ? isDark
                          ? '#34D399'
                          : '#10B981'
                        : isDark
                        ? '#F87171'
                        : '#EF4444',
                  },
                ]}
              >
                {results.failed === 0
                  ? '✅ All Tests Passed!'
                  : `⚠️ ${results.failed} Test${results.failed > 1 ? 's' : ''} Failed`}
              </Text>
              <Text style={[styles.summarySubtext, { color: theme.text }]}>
                {results.passed} / {results.tests.length} tests passed
              </Text>
            </View>

            {/* Individual Test Results */}
            <View style={styles.testsList}>
              {results.tests.map((test, index) => (
                <View
                  key={index}
                  style={[
                    styles.testItem,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <View style={styles.testHeader}>
                    <Icon
                      name={test.passed ? 'check-circle' : 'x-circle'}
                      size={20}
                      color={
                        test.passed
                          ? isDark
                            ? '#34D399'
                            : '#10B981'
                          : isDark
                          ? '#F87171'
                          : '#EF4444'
                      }
                    />
                    <Text
                      style={[styles.testName, { color: theme.text }]}
                    >
                      {test.name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.testMessage,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {test.message}
                  </Text>
                  <Text
                    style={[
                      styles.testDuration,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Duration: {test.duration}
                  </Text>
                </View>
              ))}
            </View>

            {/* Timestamp */}
            <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
              Tested at: {new Date(results.timestamp).toLocaleString()}
            </Text>
          </View>
        )}

        {/* Instructions */}
        {!results && !testing && (
          <View
            style={[
              styles.instructions,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Icon name="info" size={24} color={theme.primary} />
            <Text style={[styles.instructionsTitle, { color: theme.text }]}>
              About This Test
            </Text>
            <Text
              style={[
                styles.instructionsText,
                { color: theme.textSecondary },
              ]}
            >
              This tool will test the following:
            </Text>
            <View style={styles.checklistItem}>
              <Text style={styles.bullet}>•</Text>
              <Text
                style={[styles.checklistText, { color: theme.textSecondary }]}
              >
                Server health check
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.bullet}>•</Text>
              <Text
                style={[styles.checklistText, { color: theme.textSecondary }]}
              >
                Server time synchronization
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.bullet}>•</Text>
              <Text
                style={[styles.checklistText, { color: theme.textSecondary }]}
              >
                Current class students API
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.bullet}>•</Text>
              <Text
                style={[styles.checklistText, { color: theme.textSecondary }]}
              >
                Timetable API
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.bullet}>•</Text>
              <Text
                style={[styles.checklistText, { color: theme.textSecondary }]}
              >
                Socket.IO real-time connection
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12,
  },
  serverUrl: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  testButtonDisabled: {
    opacity: 0.6,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    gap: 16,
  },
  summary: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: '700',
  },
  summarySubtext: {
    fontSize: 14,
  },
  testsList: {
    gap: 12,
  },
  testItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
  },
  testMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  testDuration: {
    fontSize: 12,
  },
  timestamp: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  instructions: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#6B7280',
  },
  checklistText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ConnectionTestScreen;
