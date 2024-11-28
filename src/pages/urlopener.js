import { useState } from 'react';
import styles from '../styles/UrlOpener.module.css';

export default function BulkUrlOpener() {
  const [urls, setUrls] = useState('');
  const [status, setStatus] = useState('');
  const [foundWebsites, setFoundWebsites] = useState(0);

  const handleUrlsChange = (e) => {
    setUrls(e.target.value);
  };

  const handleOpenUrls = () => {
    const urlList = urls.split(/[\n,; ]+/).filter(url => url.trim());
    if (urlList.length === 0) {
      setStatus('Please enter valid URLs.');
      return;
    }

    setStatus('Opening websites...');
    setFoundWebsites(urlList.length);

    urlList.forEach((url) => {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank');
      } else {
        window.open(`https://${url}`, '_blank');
      }
    });
  };

  const handleClearUrls = () => {
    setUrls('');
    setStatus('');
    setFoundWebsites(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bulk URL Opener</h1>
        <p className={styles.subtitle}>
          Streamline your browsing by opening multiple URLs at once. Paste or enter URLs separated by commas, spaces, or new lines.
        </p>

        <div className={styles.urlInput}>
          <textarea
            value={urls}
            onChange={handleUrlsChange}
            placeholder="Paste/Enter URLs here..."
            rows="6"
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleOpenUrls} className={styles.button}>Open URLs</button>
          <button onClick={handleClearUrls} className={styles.clearButton}>Clear Input</button>
        </div>

        {status && <p className={styles.status}>{status}</p>}
        {foundWebsites > 0 && (
          <p className={styles.foundWebsites}>{foundWebsites} websites found!</p>
        )}

        <div className={styles.features}>
        <h2>Why Choose Our Bulk URL Opener?</h2>
        <ul>
            <li>• <strong>Unparalleled Efficiency:</strong> Open multiple links at once to save time.</li>
            <li>• <strong>Simplicity Redefined:</strong> Easy-to-use interface for everyone.</li>
            <li>• <strong>Customization at Your Fingertips:</strong> Reorder URLs and remove duplicates.</li>
            <li>• <strong>Time-Saving Bookmarks:</strong> Save frequently opened URLs for quick access.</li>
            <li>• <strong>Efficient Research and Workflows:</strong> Simplifies your research and workflows.</li>
        </ul>
        </div>
      </div>
    </div>
  );
}
