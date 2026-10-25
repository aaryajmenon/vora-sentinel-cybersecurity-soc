// VORA Platform - Authentication & User State Management
// Official Organization: VORA - Verification of Recruitments and Offers
// Official Contact: vorageneration@gmail.com

const VORA_AUTH = (function() {
  const USERS_STORAGE_KEY = 'vora_registered_users';
  const CURRENT_USER_KEY = 'vora_active_session';
  const SAVED_JOBS_KEY = 'vora_user_saved_jobs';
  const VERIFY_HISTORY_KEY = 'vora_verification_history';
  const USER_POSTED_JOBS_KEY = 'vora_user_posted_jobs';

  // Age Calculation Helper
  function calculateAge(dobString) {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Seed default demo user if not present
  function initDefaults() {
    let users = getUsers();
    if (!users || users.length === 0) {
      const demoUser = {
        id: 'usr-default-01',
        name: 'Alex Vance',
        email: 'alex.vance@example.com',
        password: 'Password@2026',
        dob: '1998-04-12',
        age: 28,
        isAdult: true,
        eligibilityStatus: '18+ Verified Adult Candidate',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Verified Candidate (18+)',
        joinedDate: 'Jan 2026',
        phone: '+91 98765 43210'
      };
      saveUsers([demoUser]);
    } else {
      // Ensure existing demo users have adult eligibility
      let modified = false;
      users.forEach(u => {
        if (!u.dob) {
          u.dob = '1998-04-12';
          u.age = calculateAge(u.dob) || 28;
          u.isAdult = true;
          u.eligibilityStatus = '18+ Verified Adult Candidate';
          modified = true;
        }
      });
      if (modified) saveUsers(users);
    }
  }

  function getUsers() {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch(e) {
      console.error(e);
    }
  }

  function getCurrentUser() {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch(e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    window.dispatchEvent(new CustomEvent('vora:auth_state_changed', { detail: { user } }));
  }

  function validatePassword(password) {
    const errors = [];
    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number (0-9).');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*...).');
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }

  function signup(name, email, password, confirmPassword, dob, ageConfirmed) {
    if (!name || name.trim().length < 2) {
      return { success: false, message: 'Please enter a valid full name.' };
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      return { success: false, message: 'Please enter a valid corporate or personal email address.' };
    }
    
    // AGE ELIGIBILITY CRITERIA VALIDATION (MUST BE 18+)
    if (!dob) {
      return { success: false, message: 'Date of Birth is required. Candidates must meet the 18+ age eligibility criteria.' };
    }
    const calculatedAge = calculateAge(dob);
    if (calculatedAge === null || isNaN(calculatedAge) || calculatedAge < 0) {
      return { success: false, message: 'Please enter a valid Date of Birth.' };
    }
    if (calculatedAge < 18) {
      return {
        success: false,
        message: `Eligibility Criteria Failed: You must be at least 18 years of age to register on VORA and apply for employment or internships. Your current calculated age is ${calculatedAge} years.`
      };
    }
    if (!ageConfirmed) {
      return {
        success: false,
        message: 'You must confirm that you are at least 18 years of age and legally eligible for employment.'
      };
    }

    const pwdCheck = validatePassword(password);
    if (!pwdCheck.valid) {
      return { success: false, message: pwdCheck.errors.join(' ') };
    }
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }

    const users = getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      dob: dob,
      age: calculatedAge,
      isAdult: true,
      eligibilityStatus: '18+ Verified Adult Candidate',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'Verified Member (18+)',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      phone: ''
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  function login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, message: 'Invalid email or password. Please verify your credentials.' };
    }

    // Strict Age Eligibility Verification on Login
    const currentAge = user.dob ? calculateAge(user.dob) : user.age;
    if (currentAge !== undefined && currentAge !== null && currentAge < 18) {
      return {
        success: false,
        message: `Access Denied: Account holder does not meet legal eligibility criteria (Current age: ${currentAge} years old). VORA employment and recruitment verification services require users to be at least 18 years old.`
      };
    }

    setCurrentUser(user);
    return { success: true, user };
  }

  function ssoLogin(provider, email, name, avatar, dob) {
    let users = getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    const userDob = dob || '1998-06-20';
    const calculatedAge = calculateAge(userDob) || 28;

    if (calculatedAge < 18) {
      return {
        success: false,
        message: `Access Restricted: This ${provider} account indicates age ${calculatedAge}, which does not meet VORA's 18+ employment eligibility requirement.`
      };
    }

    if (!user) {
      user = {
        id: 'usr_sso_' + Date.now(),
        name: name,
        email: email.toLowerCase(),
        password: 'SSO_AUTH_' + Math.random().toString(36),
        dob: userDob,
        age: calculatedAge,
        isAdult: true,
        eligibilityStatus: '18+ Verified Adult Candidate',
        avatar: avatar,
        role: `${provider} Authenticated Candidate (18+)`,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        phone: '',
        authProvider: provider
      };
      users.push(user);
      saveUsers(users);
    } else {
      user.dob = user.dob || userDob;
      user.age = calculateAge(user.dob) || calculatedAge;
      user.isAdult = true;
    }
    setCurrentUser(user);
    return { success: true, user };
  }

  function resetPassword(email, newPassword) {
    const pwdCheck = validatePassword(newPassword);
    if (!pwdCheck.valid) {
      return { success: false, message: pwdCheck.errors.join(' ') };
    }
    let users = getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index === -1) {
      // Create user if not present during reset test
      const newUser = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0],
        email: email.toLowerCase(),
        password: newPassword,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'Verified Member',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        phone: ''
      };
      users.push(newUser);
      saveUsers(users);
      return { success: true };
    }
    users[index].password = newPassword;
    saveUsers(users);
    return { success: true };
  }

  function updateProfile(updatedData) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;

    let users = getUsers();
    const index = users.findIndex(u => u.id === currentUser.id);
    const updated = { ...currentUser, ...updatedData };
    if (index !== -1) {
      users[index] = updated;
      saveUsers(users);
    }
    setCurrentUser(updated);
    return true;
  }

  function logout() {
    setCurrentUser(null);
  }

  // Verification history
  function getVerificationHistory() {
    try {
      const data = localStorage.getItem(VERIFY_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  function addVerificationRecord(record) {
    const history = getVerificationHistory();
    history.unshift({
      id: 'ver_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...record
    });
    // Keep last 50
    const trimmed = history.slice(0, 50);
    localStorage.setItem(VERIFY_HISTORY_KEY, JSON.stringify(trimmed));
    window.dispatchEvent(new CustomEvent('vora:verification_recorded'));
  }

  // Applied jobs
  function getAppliedJobs() {
    try {
      const data = localStorage.getItem(SAVED_JOBS_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  function addAppliedJob(job) {
    const applied = getAppliedJobs();
    if (!applied.find(j => j.id === job.id)) {
      applied.unshift({
        ...job,
        appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(applied));
      window.dispatchEvent(new CustomEvent('vora:jobs_updated'));
    }
  }

  // User posted jobs
  function getUserPostedJobs() {
    try {
      const data = localStorage.getItem(USER_POSTED_JOBS_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  function addUserPostedJob(job) {
    const posted = getUserPostedJobs();
    posted.unshift({
      id: 'usr-job-' + Date.now(),
      postedDate: 'Just now',
      verified: true,
      ...job
    });
    localStorage.setItem(USER_POSTED_JOBS_KEY, JSON.stringify(posted));
    window.dispatchEvent(new CustomEvent('vora:jobs_updated'));
    return posted[0];
  }

  initDefaults();

  return {
    calculateAge,
    getCurrentUser,
    getUsers,
    validatePassword,
    signup,
    login,
    ssoLogin,
    resetPassword,
    updateProfile,
    logout,
    getVerificationHistory,
    addVerificationRecord,
    getAppliedJobs,
    addAppliedJob,
    getUserPostedJobs,
    addUserPostedJob
  };
})();

if (typeof window !== 'undefined') {
  window.VORA_AUTH = VORA_AUTH;
}
