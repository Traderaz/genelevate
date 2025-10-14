const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs } = require('firebase/firestore');

let testEnv;

// Test users with different roles
const testUsers = {
  admin: {
    uid: 'admin-user',
    token: {
      role: 'admin',
      permissions: ['users:read', 'users:write', 'system:admin'],
      isVerified: true
    }
  },
  institution: {
    uid: 'institution-user',
    token: {
      role: 'institution',
      institutionId: 'test-institution',
      permissions: ['users:read:own_institution', 'users:write:own_institution', 'referrals:create'],
      isVerified: true
    }
  },
  student: {
    uid: 'student-user',
    token: {
      role: 'student',
      institutionId: 'test-institution',
      cohortIds: ['cohort-1', 'cohort-2'],
      parentIds: ['parent-user'],
      permissions: ['profile:read:own', 'profile:write:own', 'progress:read:own'],
      isVerified: true
    }
  },
  parent: {
    uid: 'parent-user',
    token: {
      role: 'parent',
      institutionId: 'test-institution',
      studentIds: ['student-user'],
      permissions: ['profile:read:own', 'students:read:linked', 'progress:read:linked_students'],
      isVerified: true
    }
  },
  unverified: {
    uid: 'unverified-user',
    token: {
      role: 'student',
      institutionId: 'test-institution',
      permissions: ['profile:read:own'],
      isVerified: false
    }
  }
};

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'gen-elevate-test',
    firestore: {
      rules: require('fs').readFileSync('firestore.rules', 'utf8'),
      host: 'localhost',
      port: 8080
    }
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('User Collection Security Rules', () => {
  test('User can read their own profile', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    // First create the user document with GDPR consent
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'student-user'), {
        email: 'student@test.com',
        role: 'student',
        institutionId: 'test-institution',
        gdprConsent: true,
        createdAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'users', 'student-user')));
  });

  test('User cannot read another user\'s profile without permission', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'other-user'), {
        email: 'other@test.com',
        role: 'student',
        institutionId: 'other-institution',
        gdprConsent: true,
        createdAt: new Date().toISOString()
      });
    });

    await assertFails(getDoc(doc(db, 'users', 'other-user')));
  });

  test('Parent can read linked student\'s profile', async () => {
    const db = testEnv.authenticatedContext(testUsers.parent.uid, testUsers.parent.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'student-user'), {
        email: 'student@test.com',
        role: 'student',
        institutionId: 'test-institution',
        gdprConsent: true,
        createdAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'users', 'student-user')));
  });

  test('Institution admin can read users in their institution', async () => {
    const db = testEnv.authenticatedContext(testUsers.institution.uid, testUsers.institution.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'student-user'), {
        email: 'student@test.com',
        role: 'student',
        institutionId: 'test-institution',
        gdprConsent: true,
        createdAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'users', 'student-user')));
  });

  test('Unverified user cannot write data', async () => {
    const db = testEnv.authenticatedContext(testUsers.unverified.uid, testUsers.unverified.token).firestore();
    
    await assertFails(setDoc(doc(db, 'users', 'unverified-user'), {
      email: 'unverified@test.com',
      role: 'student'
    }));
  });

  test('User cannot read profile without GDPR consent', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'student-user'), {
        email: 'student@test.com',
        role: 'student',
        institutionId: 'test-institution',
        gdprConsent: false, // No consent
        createdAt: new Date().toISOString()
      });
    });

    await assertFails(getDoc(doc(db, 'users', 'student-user')));
  });
});

describe('Referral Links Security Rules', () => {
  test('Institution admin can create referral links', async () => {
    const db = testEnv.authenticatedContext(testUsers.institution.uid, testUsers.institution.token).firestore();
    
    await assertSucceeds(setDoc(doc(db, 'referralLinks', 'TEST123'), {
      code: 'TEST123',
      institutionId: 'test-institution',
      institutionName: 'Test Institution',
      createdBy: 'institution-user',
      createdAt: new Date().toISOString(),
      isActive: true
    }));
  });

  test('Student cannot create referral links', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await assertFails(setDoc(doc(db, 'referralLinks', 'TEST123'), {
      code: 'TEST123',
      institutionId: 'test-institution',
      createdBy: 'student-user',
      isActive: true
    }));
  });

  test('Institution admin can only read their own referral links', async () => {
    const db = testEnv.authenticatedContext(testUsers.institution.uid, testUsers.institution.token).firestore();
    
    // Create referral link for their institution
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'referralLinks', 'TEST123'), {
        code: 'TEST123',
        institutionId: 'test-institution',
        createdBy: 'institution-user',
        isActive: true
      });
      
      // Create referral link for another institution
      await setDoc(doc(context.firestore(), 'referralLinks', 'OTHER123'), {
        code: 'OTHER123',
        institutionId: 'other-institution',
        createdBy: 'other-user',
        isActive: true
      });
    });

    await assertSucceeds(getDoc(doc(db, 'referralLinks', 'TEST123')));
    await assertFails(getDoc(doc(db, 'referralLinks', 'OTHER123')));
  });
});

describe('Progress Collection Security Rules', () => {
  test('Student can read their own progress', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      // Create user with GDPR consent
      await setDoc(doc(context.firestore(), 'users', 'student-user'), {
        gdprConsent: true
      });
      
      // Create progress record
      await setDoc(doc(context.firestore(), 'progress', 'progress-1'), {
        userId: 'student-user',
        courseId: 'course-1',
        institutionId: 'test-institution',
        completionPercentage: 50,
        createdAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'progress', 'progress-1')));
  });

  test('Parent can read linked student\'s progress', async () => {
    const db = testEnv.authenticatedContext(testUsers.parent.uid, testUsers.parent.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      // Create user with GDPR consent
      await setDoc(doc(context.firestore(), 'users', 'student-user'), {
        gdprConsent: true
      });
      
      // Create progress record for linked student
      await setDoc(doc(context.firestore(), 'progress', 'progress-1'), {
        userId: 'student-user',
        courseId: 'course-1',
        institutionId: 'test-institution',
        completionPercentage: 50,
        createdAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'progress', 'progress-1')));
  });

  test('Student cannot read another student\'s progress', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'other-student'), {
        gdprConsent: true
      });
      
      await setDoc(doc(context.firestore(), 'progress', 'progress-1'), {
        userId: 'other-student',
        courseId: 'course-1',
        institutionId: 'test-institution',
        completionPercentage: 50,
        createdAt: new Date().toISOString()
      });
    });

    await assertFails(getDoc(doc(db, 'progress', 'progress-1')));
  });
});

describe('Audit Logs Security Rules', () => {
  test('User can read their own audit logs', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'auditLogs', 'log-1'), {
        userId: 'student-user',
        action: 'login',
        timestamp: new Date().toISOString(),
        success: true
      });
    });

    await assertSucceeds(getDoc(doc(db, 'auditLogs', 'log-1')));
  });

  test('User cannot write audit logs', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await assertFails(setDoc(doc(db, 'auditLogs', 'log-1'), {
      userId: 'student-user',
      action: 'login',
      timestamp: new Date().toISOString(),
      success: true
    }));
  });

  test('Admin can read all audit logs', async () => {
    const db = testEnv.authenticatedContext(testUsers.admin.uid, testUsers.admin.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'auditLogs', 'log-1'), {
        userId: 'other-user',
        action: 'login',
        timestamp: new Date().toISOString(),
        success: true
      });
    });

    await assertSucceeds(getDoc(doc(db, 'auditLogs', 'log-1')));
  });
});

describe('GDPR Requests Security Rules', () => {
  test('User can create GDPR request for themselves', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await assertSucceeds(setDoc(doc(db, 'gdprRequests', 'request-1'), {
      userId: 'student-user',
      type: 'data_export',
      status: 'pending',
      requestedAt: new Date().toISOString()
    }));
  });

  test('User cannot create GDPR request for another user', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await assertFails(setDoc(doc(db, 'gdprRequests', 'request-1'), {
      userId: 'other-user',
      type: 'data_export',
      status: 'pending',
      requestedAt: new Date().toISOString()
    }));
  });

  test('Admin can read all GDPR requests', async () => {
    const db = testEnv.authenticatedContext(testUsers.admin.uid, testUsers.admin.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'gdprRequests', 'request-1'), {
        userId: 'other-user',
        type: 'data_export',
        status: 'pending',
        requestedAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'gdprRequests', 'request-1')));
  });
});

describe('Multi-tenant Isolation', () => {
  test('Institution admin cannot access other institution\'s data', async () => {
    const db = testEnv.authenticatedContext(testUsers.institution.uid, testUsers.institution.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      // Create course for another institution
      await setDoc(doc(context.firestore(), 'courses', 'course-1'), {
        title: 'Other Institution Course',
        institutionId: 'other-institution',
        accessLevel: 'private',
        createdAt: new Date().toISOString()
      });
    });

    await assertFails(getDoc(doc(db, 'courses', 'course-1')));
  });

  test('Student can only access courses from their institution', async () => {
    const db = testEnv.authenticatedContext(testUsers.student.uid, testUsers.student.token).firestore();
    
    await testEnv.withSecurityRulesDisabled(async (context) => {
      // Create course for their institution
      await setDoc(doc(context.firestore(), 'courses', 'course-1'), {
        title: 'My Institution Course',
        institutionId: 'test-institution',
        accessLevel: 'public',
        cohortIds: ['cohort-1'],
        createdAt: new Date().toISOString()
      });
      
      // Create course for another institution
      await setDoc(doc(context.firestore(), 'courses', 'course-2'), {
        title: 'Other Institution Course',
        institutionId: 'other-institution',
        accessLevel: 'public',
        cohortIds: ['other-cohort'],
        createdAt: new Date().toISOString()
      });
    });

    await assertSucceeds(getDoc(doc(db, 'courses', 'course-1')));
    await assertFails(getDoc(doc(db, 'courses', 'course-2')));
  });
});
