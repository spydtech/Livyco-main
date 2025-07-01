import React, { useState } from 'react';

const RoleActivityForm = () => {
  const [performedByOtherOrgs, setPerformedByOtherOrgs] = useState('');
  const [activityOrgs, setActivityOrgs] = useState([
    "1 Subjected",
    "Business Banking Segments"
  ]);
  const [selectedOrg, setSelectedOrg] = useState('');

  const handleOrgChange = (e) => {
    setPerformedByOtherOrgs(e.target.value);
    if (e.target.value !== 'yes') {
      setSelectedOrg(''); // Clear selection if not "Yes"
    }
  };

  const handleActivityOrgChange = (e) => {
    setSelectedOrg(e.target.value);
  };

  return (
    <div className="form-container" style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        Add/Edit Other Pc
      </h2>
      
      <div style={{ marginBottom: '30px' }}>
        <a href="bankofamerica.com/browse/PARCC-14584" style={{ color: '#0066cc', textDecoration: 'none' }}>
          POP - Change Requests
        </a>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '15px' }}>Primary Role</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
            Is this Activity Performed by Other Performing Org(s)?<span style={{ color: 'red' }}>*</span>
          </label>
          
          <select
            value={performedByOtherOrgs}
            onChange={handleOrgChange}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '200px',
              fontSize: '14px'
            }}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px',
          marginTop: '15px',
          opacity: performedByOtherOrgs === 'yes' ? 1 : 0.6
        }}>
          <h4 style={{ marginBottom: '15px' }}>Activity Other Performing Org(s)</h4>
          <select
            value={selectedOrg}
            onChange={handleActivityOrgChange}
            disabled={performedByOtherOrgs !== 'yes'}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100%',
              fontSize: '14px',
              backgroundColor: performedByOtherOrgs === 'yes' ? '#fff' : '#f5f5f5'
            }}
          >
            <option value="">Select an organization</option>
            {activityOrgs.map((org, index) => (
              <option key={index} value={org}>{org}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RoleActivityForm;