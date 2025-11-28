import io from 'socket.io-client';

const SOCKET_URL = 'https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  // Connect to socket server
  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return this.socket;
  }

  // Disconnect from socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  // Emit events
  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  // Listen to events
  on(event, callback) {
    if (!this.socket) {
      this.connect();
    }

    // Store callback reference for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);

    this.socket.on(event, callback);

    // Return cleanup function
    return () => {
      this.off(event, callback);
    };
  }

  // Remove event listener
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }

    // Remove from listeners map
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
      if (callbacks.length === 0) {
        this.listeners.delete(event);
      }
    }
  }

  // ==================== Teacher Events ====================

  // Listen for student registration
  onStudentRegistered(callback) {
    return this.on('student_registered', callback);
  }

  // Listen for timer updates
  onTimerUpdated(callback) {
    return this.on('timer_updated', callback);
  }

  // Listen for student status changes
  onStudentStatusChange(callback) {
    return this.on('student_status_change', callback);
  }

  // Listen for timetable updates
  onTimetableUpdated(callback) {
    return this.on('timetable_updated', callback);
  }

  // Listen for period updates
  onPeriodsUpdated(callback) {
    return this.on('periods_updated', callback);
  }

  // Listen for random ring triggers
  onRandomRingTriggered(callback) {
    return this.on('random_ring_triggered', callback);
  }

  // Listen for attendance marked
  onAttendanceMarked(callback) {
    return this.on('attendance_marked', callback);
  }

  // ==================== Emit Events ====================

  // Emit timer update
  emitTimerUpdate(data) {
    this.emit('timer_update', data);
  }

  // Emit student status change
  emitStudentStatusChange(data) {
    this.emit('student_status_change', data);
  }

  // Emit attendance marked
  emitAttendanceMarked(data) {
    this.emit('attendance_marked', data);
  }
}

// Export singleton instance
export default new SocketService();
