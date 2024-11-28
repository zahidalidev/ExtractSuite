import React, { useState } from 'react';
import styles from '../styles/EmailFinder.module.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

const EmailFinder = () => {
  const [domainCount, setDomainCount] = useState(0);
  const [uniqueDomains, setUniqueDomains] = useState('');
  const [activeTab, setActiveTab] = useState('text');

  const handleDomainChange = (e) => {
    const domains = e.target.value.split('\n').filter(Boolean);
    setDomainCount(domains.length);
    setUniqueDomains(e.target.value);
  };

  const tabs = [
    { label: 'Text Input', value: 'text' },
    { label: 'Excel Input', value: 'excel' },
  ];

  const priorityEmails = [
    '@domain', 'info@', 'sales@', 'support@', 'contact@',
    'admin@', 'editor@', 'marketing@', 'feedback@',
    'hr@', 'team@', 'customerservice@', 'office@', 'mail@',
    'enquiries@', '@gmail', '@hotmail', '@yahoo',
  ];

  const extractionOptions = [
    { id: 'phoneNumbers', label: 'Extract Phone Numbers' },
    { id: 'socialProfiles', label: 'Extract Social Media Profiles' },
    { id: 'websiteCategory', label: 'Website Category' },
  ];

  const emailModes = [
    { value: 'single', label: 'Single Email ID' },
    { value: 'extract', label: 'Extract Emails' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>WEB EMAIL FINDER</h1>
        <p className={styles.subtitle}>
          Extract email addresses and phone numbers from any websites!
        </p>
      </div>

      <AppBar
        position="static"
        sx={{
          top: 0,
          height: '50px',
          maxWidth: '50%',
          marginLeft: 0,
          backgroundColor: '#1c1c1c',
          borderRadius: '10px',
          border: '1px solid #3a3a3a',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingY: '8px',
          }}
        >
          {tabs.map((tab) => (
            <Typography
              key={tab.value}
              variant="h6"
              component="div"
              onClick={() => setActiveTab(tab.value)}
              sx={{
                padding: '2px 13px',
                minWidth: activeTab === tab.value ? '100px' : 'auto',
                minHeight: '36px',
                backgroundColor: activeTab === tab.value ? '#282c34' : 'transparent',
                fontWeight: 'normal',
                borderRadius: activeTab === tab.value ? '12px' : '8px',
                color: activeTab === tab.value ? '#FFFFFF' : '#dcdcdc',
                transition: 'background-color 0.3s, color 0.3s',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </Typography>
          ))}
        </Toolbar>
      </AppBar>

      <div className={styles.innerCard}>
        {activeTab === 'text' ? (
          <div className={styles.textInputSection}>
            <label htmlFor="domainInput" className={styles.label}>
              <strong>Enter Domains/URLs</strong>
            </label>
            <textarea
              id="domainInput"
              className={styles.textArea}
              placeholder="Enter one domain/URL per line"
              value={uniqueDomains}
              onChange={handleDomainChange}
              maxLength={50}
            />
            <p className={styles.domainCount}>{domainCount}/50 Unique Websites entered</p>
          </div>
        ) : (
          <div className={styles.excelInputSection}>
            <label htmlFor="fileInput" className={styles.label}>
              <strong>Upload Excel File</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              className={styles.fileInput}
              accept=".xls,.xlsx"
            />
          </div>
        )}

        <label className={styles.label}><strong>Set/Arrange Email Priority</strong></label>
        <div className={styles.priorityList}>
          {priorityEmails.map((email, index) => (
            <span key={index} className={styles.priorityItem}>{email}</span>
          ))}
        </div>

        <label className={styles.label}><strong>Extraction Options</strong></label>
        <div className={styles.optionsList}>
          {extractionOptions.map((option) => (
            <div key={option.id} className={styles.option}>
              <input type="checkbox" id={option.id} />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>

        <label className={styles.label}><strong>Select Email Mode</strong></label>
        <div className={styles.radioGroup}>
          {emailModes.map((mode) => (
            <label key={mode.value} className={styles.radioLabel}>
              <input type="radio" name="emailMode" value={mode.value} />
              {mode.label}
            </label>
          ))}
        </div>

        <div className={styles.actionSection}>
          <button className={styles.actionButton}>Extract Emails</button>
          <button className={styles.resetButton}>Reset</button>
          <button className={styles.errorButton}>Report Error</button>
        </div>
      </div>
    </div>
  );
};

export default EmailFinder;
