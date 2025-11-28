// API Service for Teacher App
const BASE_URL = 'https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net';

class ApiService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  // Generic fetch wrapper
  async fetch(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ==================== Teacher Endpoints ====================

  // Get all teachers
  async getAllTeachers() {
    return this.fetch('/api/teachers');
  }

  // Create teacher
  async createTeacher(teacherData) {
    return this.fetch('/api/teachers', {
      method: 'POST',
      body: JSON.stringify(teacherData),
    });
  }

  // Update teacher
  async updateTeacher(teacherId, teacherData) {
    return this.fetch(`/api/teachers/${teacherId}`, {
      method: 'PUT',
      body: JSON.stringify(teacherData),
    });
  }

  // Delete teacher
  async deleteTeacher(teacherId) {
    return this.fetch(`/api/teachers/${teacherId}`, {
      method: 'DELETE',
    });
  }

  // ==================== Teacher Schedule ====================

  // Get teacher schedule for a day
  async getTeacherSchedule(teacherId, day) {
    return this.fetch(`/api/teacher-schedule/${teacherId}/${day}`);
  }

  // Get current class students (CRITICAL)
  async getCurrentClassStudents(teacherId) {
    return this.fetch(`/api/teacher/current-class-students/${teacherId}`);
  }

  // ==================== Student Endpoints ====================

  // Get all students
  async getAllStudents() {
    return this.fetch('/api/students');
  }

  // Get students by semester/branch
  async getStudentsBySemesterBranch(semester, course) {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester);
    if (course) params.append('course', course);
    return this.fetch(`/api/students?${params.toString()}`);
  }

  // Update student status
  async updateStudentStatus(studentId, statusData) {
    return this.fetch(`/api/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  // ==================== Attendance Endpoints ====================

  // Get attendance records
  async getAttendanceRecords(filters = {}) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return this.fetch(`/api/attendance/records?${params.toString()}`);
  }

  // Mark attendance
  async markAttendance(attendanceData) {
    return this.fetch('/api/attendance/mark', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    });
  }

  // Get student attendance summary
  async getStudentAttendanceSummary(studentId) {
    return this.fetch(`/api/attendance/summary/${studentId}`);
  }

  // ==================== Timetable Endpoints ====================

  // Get timetable
  async getTimetable(semester, branch) {
    return this.fetch(`/api/timetable/${semester}/${branch}`);
  }

  // Update timetable
  async updateTimetable(semester, branch, timetableData) {
    return this.fetch(`/api/timetable/${semester}/${branch}`, {
      method: 'PUT',
      body: JSON.stringify(timetableData),
    });
  }

  // Update periods for all timetables
  async updateAllPeriods(periods) {
    return this.fetch('/api/periods/update-all', {
      method: 'POST',
      body: JSON.stringify({ periods }),
    });
  }

  // ==================== Classroom Endpoints ====================

  // Get all classrooms
  async getAllClassrooms() {
    return this.fetch('/api/classrooms');
  }

  // Create classroom
  async createClassroom(classroomData) {
    return this.fetch('/api/classrooms', {
      method: 'POST',
      body: JSON.stringify(classroomData),
    });
  }

  // Update classroom
  async updateClassroom(classroomId, classroomData) {
    return this.fetch(`/api/classrooms/${classroomId}`, {
      method: 'PUT',
      body: JSON.stringify(classroomData),
    });
  }

  // ==================== Random Ring ====================

  // Trigger random ring
  async triggerRandomRing(randomRingData) {
    return this.fetch('/api/random-ring', {
      method: 'POST',
      body: JSON.stringify(randomRingData),
    });
  }

  // Get random ring history
  async getRandomRingHistory(teacherId) {
    return this.fetch(`/api/random-ring/history/${teacherId}`);
  }

  // ==================== Configuration ====================

  // Get app configuration
  async getAppConfig() {
    return this.fetch('/api/config');
  }

  // Get server time
  async getServerTime() {
    return this.fetch('/api/time');
  }

  // Health check
  async healthCheck() {
    return this.fetch('/api/health');
  }
}

// Export singleton instance
export default new ApiService();
