import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';
import apiService from '../services/api';

const LoginScreen = ({ onLoginSuccess, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validate inputs
    if (!employeeId.trim()) {
      Alert.alert('Error', 'Please enter your Employee ID');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Attempting login with:', employeeId);

      // Call login API
      const response = await apiService.login(employeeId, password);

      if (response.success && response.user) {
        console.log('✅ Login successful:', response.user.name);

        // Check if user is a teacher
        if (response.user.role !== 'teacher') {
          Alert.alert('Error', 'This app is for teachers only');
          setLoading(false);
          return;
        }

        // Pass user data to parent
        onLoginSuccess(response.user);
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('Login Failed', error.message || 'Unable to connect to server');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo/Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.primary + '20' },
            ]}
          >
            <Icon name="book-open" size={48} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            LetsBunk
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Teacher Portal
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          {/* Employee ID Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>
              Employee ID
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              <Icon
                name="user"
                size={20}
                color={theme.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter your Employee ID"
                placeholderTextColor={theme.textSecondary}
                value={employeeId}
                onChangeText={setEmployeeId}
                autoCapitalize="characters"
                autoCorrect={false}
                editable={!loading}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>
              Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              <Icon
                name="lock"
                size={20}
                color={theme.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: theme.primary },
              loading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Login</Text>
                <Icon name="log-in" size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          {/* Demo Credentials */}
          <View
            style={[
              styles.demoBox,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Icon name="info" size={16} color={theme.textSecondary} />
            <View style={styles.demoTextContainer}>
              <Text style={[styles.demoTitle, { color: theme.text }]}>
                Demo Credentials
              </Text>
              <Text style={[styles.demoText, { color: theme.textSecondary }]}>
                ID: TEACH001 / EMP001
              </Text>
              <Text style={[styles.demoText, { color: theme.textSecondary }]}>
                Password: aditya
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Attendance Management System
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            v2.0.0
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  demoBox: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginTop: 8,
  },
  demoTextContainer: {
    flex: 1,
    gap: 4,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 48,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
  },
});

export default LoginScreen;
