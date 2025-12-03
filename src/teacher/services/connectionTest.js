// Connection Test Utility
// Tests connectivity to Azure server and validates all required endpoints

import apiService from './api';
import socketService from './socket';

class ConnectionTest {
  constructor() {
    this.results = {
      serverUrl: 'https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net',
      tests: [],
      passed: 0,
      failed: 0,
      timestamp: null,
    };
  }

  // Add test result
  addResult(name, passed, message, duration) {
    this.results.tests.push({
      name,
      passed,
      message,
      duration: `${duration}ms`,
    });
    if (passed) {
      this.results.passed++;
    } else {
      this.results.failed++;
    }
  }

  // Test health endpoint
  async testHealth() {
    const start = Date.now();
    try {
      const response = await apiService.healthCheck();
      const duration = Date.now() - start;
      
      if (response.status === 'ok') {
        this.addResult(
          'Health Check',
          true,
          `Server is healthy (${duration}ms)`,
          duration
        );
        return true;
      } else {
        this.addResult(
          'Health Check',
          false,
          'Server returned invalid status',
          duration
        );
        return false;
      }
    } catch (error) {
      const duration = Date.now() - start;
      this.addResult(
        'Health Check',
        false,
        `Failed: ${error.message}`,
        duration
      );
      return false;
    }
  }

  // Test server time endpoint
  async testServerTime() {
    const start = Date.now();
    try {
      const response = await apiService.getServerTime();
      const duration = Date.now() - start;
      
      if (response.success && response.serverTime) {
        const timeDiff = Math.abs(Date.now() - response.serverTime);
        this.addResult(
          'Server Time',
          true,
          `Time sync OK (diff: ${timeDiff}ms)`,
          duration
        );
        return true;
      } else {
        this.addResult(
          'Server Time',
          false,
          'Invalid server time response',
          duration
        );
        return false;
      }
    } catch (error) {
      const duration = Date.now() - start;
      this.addResult(
        'Server Time',
        false,
        `Failed: ${error.message}`,
        duration
      );
      return false;
    }
  }

  // Test current class students endpoint (CRITICAL)
  async testCurrentClassStudents() {
    const start = Date.now();
    try {
      // Use test teacher ID
      const response = await apiService.getCurrentClassStudents('EMP001');
      const duration = Date.now() - start;
      
      if (response.success !== undefined) {
        this.addResult(
          'Current Class Students',
          true,
          `Endpoint working (${response.hasActiveClass ? 'Active class found' : 'No active class'})`,
          duration
        );
        return true;
      } else {
        this.addResult(
          'Current Class Students',
          false,
          'Invalid response format',
          duration
        );
        return false;
      }
    } catch (error) {
      const duration = Date.now() - start;
      this.addResult(
        'Current Class Students',
        false,
        `Failed: ${error.message}`,
        duration
      );
      return false;
    }
  }

  // Test timetable endpoint
  async testTimetable() {
    const start = Date.now();
    try {
      const response = await apiService.getTimetable('3', 'CSE');
      const duration = Date.now() - start;
      
      if (response.success && response.timetable) {
        this.addResult(
          'Timetable API',
          true,
          `Timetable loaded successfully`,
          duration
        );
        return true;
      } else {
        this.addResult(
          'Timetable API',
          false,
          'Invalid timetable response',
          duration
        );
        return false;
      }
    } catch (error) {
      const duration = Date.now() - start;
      this.addResult(
        'Timetable API',
        false,
        `Failed: ${error.message}`,
        duration
      );
      return false;
    }
  }

  // Test Socket.IO connection
  async testSocketConnection() {
    const start = Date.now();
    
    return new Promise((resolve) => {
      try {
        const socket = socketService.connect();
        
        const timeout = setTimeout(() => {
          const duration = Date.now() - start;
          this.addResult(
            'Socket.IO Connection',
            false,
            'Connection timeout (10s)',
            duration
          );
          socketService.disconnect();
          resolve(false);
        }, 10000);

        socket.on('connect', () => {
          clearTimeout(timeout);
          const duration = Date.now() - start;
          this.addResult(
            'Socket.IO Connection',
            true,
            `Connected successfully (${duration}ms)`,
            duration
          );
          socketService.disconnect();
          resolve(true);
        });

        socket.on('connect_error', (error) => {
          clearTimeout(timeout);
          const duration = Date.now() - start;
          this.addResult(
            'Socket.IO Connection',
            false,
            `Connection error: ${error.message}`,
            duration
          );
          socketService.disconnect();
          resolve(false);
        });
      } catch (error) {
        const duration = Date.now() - start;
        this.addResult(
          'Socket.IO Connection',
          false,
          `Failed: ${error.message}`,
          duration
        );
        resolve(false);
      }
    });
  }

  // Run all tests
  async runAll() {
    console.log('🔍 Starting connectivity tests...');
    console.log(`📡 Server: ${this.results.serverUrl}`);
    console.log('');

    this.results.timestamp = new Date().toISOString();
    this.results.tests = [];
    this.results.passed = 0;
    this.results.failed = 0;

    // Run tests sequentially
    await this.testHealth();
    await this.testServerTime();
    await this.testCurrentClassStudents();
    await this.testTimetable();
    await this.testSocketConnection();

    // Print results
    console.log('');
    console.log('========================================');
    console.log('📊 Test Results');
    console.log('========================================');
    
    this.results.tests.forEach((test) => {
      const icon = test.passed ? '✅' : '❌';
      console.log(`${icon} ${test.name}`);
      console.log(`   ${test.message}`);
    });

    console.log('');
    console.log('========================================');
    console.log(`✅ Passed: ${this.results.passed}/${this.results.tests.length}`);
    console.log(`❌ Failed: ${this.results.failed}/${this.results.tests.length}`);
    console.log('========================================');

    return this.results;
  }

  // Get results as JSON
  getResults() {
    return this.results;
  }
}

// Export singleton instance
export default new ConnectionTest();
