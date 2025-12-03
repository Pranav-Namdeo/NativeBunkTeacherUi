/**
 * Create Test Teacher Accounts
 * 
 * This script creates test teacher accounts in the Azure MongoDB database
 * Run this on the server to ensure test credentials work
 */

const API_URL = 'https://adioncode-e5gkh4grbqe4g8b7.centralindia-01.azurewebsites.net';

const testTeachers = [
  {
    employeeId: 'TEACH001',
    name: 'Dr. Aditya Sharma',
    email: 'aditya.sharma@letsbunk.edu',
    password: 'aditya',
    department: 'Computer Science',
    subject: 'Data Structures',
    dob: '1985-05-15',
    phone: '9876543210',
    semester: '3',
    canEditTimetable: true,
  },
  {
    employeeId: 'EMP001',
    name: 'Prof. Priya Verma',
    email: 'priya.verma@letsbunk.edu',
    password: 'aditya',
    department: 'Computer Science',
    subject: 'Algorithms',
    dob: '1982-08-20',
    phone: '9876543211',
    semester: '3',
    canEditTimetable: true,
  },
  {
    employeeId: 'TEACH002',
    name: 'Dr. Rahul Kumar',
    email: 'rahul.kumar@letsbunk.edu',
    password: 'password123',
    department: 'Electronics',
    subject: 'Digital Electronics',
    dob: '1980-03-10',
    phone: '9876543212',
    semester: '4',
    canEditTimetable: false,
  },
];

async function createTestAccounts() {
  console.log('🔧 Creating test teacher accounts...\n');

  for (const teacher of testTeachers) {
    try {
      const response = await fetch(`${API_URL}/api/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
      });

      const data = await response.json();

      if (data.success) {
        console.log(`✅ Created: ${teacher.employeeId} - ${teacher.name}`);
      } else {
        console.log(`⚠️  ${teacher.employeeId}: ${data.error || 'Already exists'}`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${teacher.employeeId}:`, error.message);
    }
  }

  console.log('\n✅ Test accounts setup complete!');
  console.log('\n📝 Test Credentials:');
  console.log('   Employee ID: TEACH001');
  console.log('   Password: aditya');
  console.log('\n   Employee ID: EMP001');
  console.log('   Password: aditya');
}

// Run if executed directly
if (require.main === module) {
  createTestAccounts();
}

module.exports = { createTestAccounts, testTeachers };
