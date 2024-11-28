import { useState } from 'react';
import styles from '../styles/CsvMerger.module.css';

export default function CsvMerger() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  const [mergedData, setMergedData] = useState(null);
  const [headerOption, setHeaderOption] = useState(true); 
  const [fileOrder, setFileOrder] = useState([]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    if (newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFileOrder((prevOrder) => [...prevOrder, ...newFiles.map((_, index) => prevOrder.length + index)]);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setFileOrder((prevOrder) => [...prevOrder, ...selectedFiles.map((_, index) => prevOrder.length + index)]);
  };

  const simulateProgress = (fileIndex) => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        if (newProgress[fileIndex] < 100) {
          newProgress[fileIndex] += 10;
          return newProgress;
        } else {
          clearInterval(interval);
          return newProgress;
        }
      });
    }, 500);
  };

  const handleMerge = () => {
    if (files.length < 2) {
      alert('Please upload at least two CSV files.');
      return;
    }

    setMergedData(`Merged content of ${files.map(file => file.name).join(', ')}`);
  };

  const handleReorder = (fromIndex, toIndex) => {
    const reorderedFiles = [...files];
    const reorderedFileOrder = [...fileOrder];
    const [removedFile] = reorderedFiles.splice(fromIndex, 1);
    reorderedFiles.splice(toIndex, 0, removedFile);
    
    const [removedOrder] = reorderedFileOrder.splice(fromIndex, 1);
    reorderedFileOrder.splice(toIndex, 0, removedOrder);

    setFiles(reorderedFiles);
    setFileOrder(reorderedFileOrder);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>CSV Merger</h1>
        <p className={styles.subtitle}>
          Merge multiple CSV files in just three simple steps.
        </p>

        <div
          className={styles.dropZone}
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drag & Drop CSV files here</p>
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileSelect}
            className={styles.input}
          />
        </div>

        <div className={styles.uploadInfo}>
        <p><strong>Step 1:</strong> Upload your CSV files</p>
          {files.length > 0 && (
            <div>
              {files.map((file, index) => (
                <div key={file.name} className={styles.fileItem}>
                  <span>{file.name}</span>
                  <div className={styles.progressBar}>
                    <div
                      style={{ width: `${progress[index] || 0}%` }}
                      className={styles.progress}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.reorderSection}>
        <p><strong>Step 2:</strong> Reorder the files (Optional)</p>
          {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((file, index) => (
                <div key={file.name} className={styles.reorderItem}>
                  <button onClick={() => handleReorder(index, index - 1)} disabled={index === 0}>↑</button>
                  <span>{file.name}</span>
                  <button onClick={() => handleReorder(index, index + 1)} disabled={index === files.length - 1}>↓</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.headerOption}>
          <label>
            <input
              type="checkbox"
              checked={headerOption}
              onChange={() => setHeaderOption(!headerOption)}
            />
            Keep header (index) in the first file only
          </label>
        </div>

        <button onClick={handleMerge} className={styles.button}>
          Merge CSV Files
        </button>

        {mergedData && (
          <div className={styles.result}>
            <p>Merge Result:</p>
            <pre>{mergedData}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
