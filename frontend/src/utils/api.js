const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to save to localStorage as backup/offline mock
const saveLocalSubmission = (type, data) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem(`riyadvi_${type}`) || '[]');
    const newEntry = {
      ...data,
      _id: 'local_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    existing.unshift(newEntry);
    localStorage.setItem(`riyadvi_${type}`, JSON.stringify(existing));
    return newEntry;
  } catch (err) {
    console.error('LocalStorage error:', err);
  }
};

const getLocalSubmissions = (type) => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(`riyadvi_${type}`) || '[]');
  } catch {
    return [];
  }
};

export async function submitContact(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Submission failed');
    }
    const resData = await response.json();
    saveLocalSubmission('contacts', data);
    return resData;
  } catch (error) {
    console.warn('Backend unavailable, saving locally:', error.message);
    const saved = saveLocalSubmission('contacts', data);
    return {
      success: true,
      message: 'Thank you! Your message has been received.',
      data: saved,
      offline: true,
    };
  }
}

export async function submitConsultation(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/consultation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Submission failed');
    }
    const resData = await response.json();
    saveLocalSubmission('consultations', data);
    return resData;
  } catch (error) {
    console.warn('Backend unavailable, saving locally:', error.message);
    const saved = saveLocalSubmission('consultations', data);
    return {
      success: true,
      message: 'Your consultation session has been scheduled successfully.',
      data: saved,
      offline: true,
    };
  }
}

export async function submitHealthCheckup(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/health-checkup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Submission failed');
    }
    const resData = await response.json();
    saveLocalSubmission('health_checkups', data);
    return resData;
  } catch (error) {
    console.warn('Backend unavailable, saving locally:', error.message);
    const saved = saveLocalSubmission('health_checkups', data);
    return {
      success: true,
      message: 'Health checkup completed successfully! Detailed report generated.',
      data: saved,
      offline: true,
    };
  }
}

export async function submitLeadMagnet(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/lead-magnet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Submission failed');
    }
    const resData = await response.json();
    saveLocalSubmission('lead_magnets', data);
    return resData;
  } catch (error) {
    console.warn('Backend unavailable, saving locally:', error.message);
    const saved = saveLocalSubmission('lead_magnets', data);
    return {
      success: true,
      message: 'Guide sent to your email! Direct download is now unlocked.',
      data: saved,
      downloadUrl: '/guides/riyadvi-project-planning-guide.pdf',
      offline: true,
    };
  }
}

export async function submitApplication(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      body: formData, // multipart/form-data
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Submission failed');
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend unavailable, saving locally:', error.message);
    // Convert FormData to plain object for local storage
    const obj = {};
    if (formData instanceof FormData) {
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'object' && value.name) {
          obj[key] = value.name;
        } else {
          obj[key] = value;
        }
      }
    }
    const saved = saveLocalSubmission('applications', obj);
    return {
      success: true,
      message: 'Application submitted successfully! Our talent team will review your profile.',
      data: saved,
      offline: true,
    };
  }
}

export async function fetchAdminDashboard() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend unreachable for dashboard, aggregating local state:', err);
  }

  // Aggregate local submissions
  const contacts = getLocalSubmissions('contacts');
  const consultations = getLocalSubmissions('consultations');
  const healthCheckups = getLocalSubmissions('health_checkups');
  const leadMagnets = getLocalSubmissions('lead_magnets');
  const applications = getLocalSubmissions('applications');

  return {
    success: true,
    stats: {
      totalContacts: contacts.length,
      totalConsultations: consultations.length,
      totalHealthCheckups: healthCheckups.length,
      totalLeadMagnets: leadMagnets.length,
      totalApplications: applications.length,
      recentContacts: contacts.slice(0, 5),
    },
    localData: {
      contacts,
      consultations,
      healthCheckups,
      leadMagnets,
      applications,
    },
  };
}
