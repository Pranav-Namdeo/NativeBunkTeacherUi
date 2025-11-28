import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
import StudentCard from './StudentCard';
import { getStyles, colors } from '../styles/teacherStyles';

const StudentListView = ({ 
  students, 
  onToggleAttendance, 
  isDark,
  refreshing = false,
  onRefresh,
}) => {
  const styles = getStyles(isDark);
  const theme = isDark ? colors.dark : colors.light;

  if (students.length === 0) {
    return (
      <View style={localStyles.emptyContainer}>
        <Text style={[localStyles.emptyText, { color: theme.textSecondary }]}>
          No students found
        </Text>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onToggleAttendance={onToggleAttendance}
            isDark={isDark}
          />
        )}
        contentContainerStyle={localStyles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          ) : undefined
        }
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
  },
});

export default StudentListView;
