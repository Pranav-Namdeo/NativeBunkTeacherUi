import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/teacherStyles';

const FilterButtons = ({ selectedFilter, onFilterChange, counts, isDark }) => {
  const theme = isDark ? colors.dark : colors.light;

  const filters = [
    {
      id: 'all',
      label: 'All',
      icon: 'users',
      count: counts.all,
    },
    {
      id: 'active',
      label: 'Active',
      icon: 'activity',
      count: counts.active,
    },
    {
      id: 'present',
      label: 'Present',
      icon: 'check-circle',
      count: counts.present,
    },
    {
      id: 'absent',
      label: 'Absent',
      icon: 'x-circle',
      count: counts.absent,
    },
    {
      id: 'left',
      label: 'Left Early',
      icon: 'log-out',
      count: counts.left,
    },
  ];

  const getButtonStyle = (filterId) => {
    const isSelected = selectedFilter === filterId;
    let backgroundColor = theme.surface;
    let borderColor = theme.border;

    if (isSelected) {
      switch (filterId) {
        case 'all':
          backgroundColor = '#3B82F6';
          break;
        case 'active':
          backgroundColor = '#10B981';
          break;
        case 'present':
          backgroundColor = '#3B82F6';
          break;
        case 'absent':
          backgroundColor = '#EF4444';
          break;
        case 'left':
          backgroundColor = '#F59E0B';
          break;
        default:
          backgroundColor = '#6B7280';
      }
    }

    return {
      ...styles.filterButton,
      backgroundColor: isSelected ? backgroundColor : theme.surface,
      borderColor: isSelected ? backgroundColor : borderColor,
    };
  };

  const getTextColor = (filterId) => {
    return selectedFilter === filterId ? '#FFFFFF' : theme.text;
  };

  const getCountStyle = (filterId) => {
    const isSelected = selectedFilter === filterId;
    return {
      ...styles.countBadge,
      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : theme.gray100,
    };
  };

  const getCountTextColor = (filterId) => {
    return selectedFilter === filterId ? '#FFFFFF' : theme.text;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={getButtonStyle(filter.id)}
            onPress={() => onFilterChange(filter.id)}
            activeOpacity={0.7}
          >
            <Icon name={filter.icon} size={16} color={getTextColor(filter.id)} />
            <Text
              style={[styles.buttonText, { color: getTextColor(filter.id) }]}
            >
              {filter.label}
            </Text>
            <View style={getCountStyle(filter.id)}>
              <Text
                style={[
                  styles.countText,
                  { color: getCountTextColor(filter.id) },
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FilterButtons;
