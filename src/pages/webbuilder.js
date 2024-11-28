// ..... USELESS PAGEE .....

import { useState } from 'react';
import styles from '../styles/WebBuilder.module.css';

export default function WebOpener() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleOpenWebsite = () => {
    if (!url) {
      setStatus('Please enter a valid URL.');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setUrl(`https://${url}`);
    }

    window.open(url, '_blank');
    setStatus(`Opening ${url}...`);
  };

  const handleClearInput = () => {
    setUrl('');
    setStatus('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Web Opener</h1>
        <p className={styles.subtitle}>
          Quickly open any website with a simple click. Just enter the URL and we'll handle the rest.
        </p>

        <div className={styles.urlInput}>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter website URL"
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleOpenWebsite} className={styles.button}>Open Website</button>
          <button onClick={handleClearInput} className={styles.clearButton}>Clear Input</button>
        </div>

        {status && <p className={styles.status}>{status}</p>}
      </div>
    </div>
  );
}
