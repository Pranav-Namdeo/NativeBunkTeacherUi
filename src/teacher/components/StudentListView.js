import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import StudentCard from './StudentCard';
import { getStyles } from '../styles/teacherStyles';

const StudentListView = ({ students, onToggleAttendance, isDark }) => {
  const styles = getStyles(isDark);

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
});

export default StudentListView;
