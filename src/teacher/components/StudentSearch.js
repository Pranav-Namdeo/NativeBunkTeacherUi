import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStyles, colors } from '../styles/teacherStyles';

const StudentSearch = ({ searchQuery, onSearchChange, isDark }) => {
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={[localStyles.container, { backgroundColor: theme.background }]}>
      <View style={localStyles.searchWrapper}>
        <Icon
          name="search"
          size={20}
          color={theme.textSecondary}
          style={localStyles.searchIcon}
        />
        <TextInput
          style={[localStyles.searchInput, { 
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          }]}
          placeholder="Search by name or roll number..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <Icon
            name="x"
            size={20}
            color={theme.textSecondary}
            style={localStyles.clearIcon}
            onPress={() => onSearchChange('')}
          />
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchWrapper: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 16,
  },
  clearIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
});

export default StudentSearch;
