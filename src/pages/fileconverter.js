import { useState } from 'react';
import styles from '../styles/FileConverter.module.css';

export default function FileConverter() {
  const [inputFile, setInputFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('XLS');
  const [conversionStatus, setConversionStatus] = useState('');
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputFile(file);
  };

  const handleConvert = () => {
    if (!inputFile) {
      alert('Please select a file to convert.');
      return;
    }

    setConversionStatus('Converting...');
    
    setTimeout(() => {
      setConversionStatus('Conversion complete!');
      setConvertedFile({
        name: `${inputFile.name.split('.')[0]}.${outputFormat.toLowerCase()}`,
        format: outputFormat,
        data: 'converted file data here...',
      });
    }, 2000); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>File Converter</h1>
        <p className={styles.subtitle}>
          Convert files from one format to another with ease. We support a variety of formats such as XLS, PDF, CSV, and more.
        </p>

        <div className={styles.uploadSection}>
          <p>Step 1: Upload Your File</p>
          <input
            type="file"
            accept=".xls,.xlsx,.csv,.pdf,.ods,.html,.jpg,.png,.jpeg,.txt"
            onChange={handleFileChange}
            className={styles.input}
          />
        </div>

        <div className={styles.selectFormat}>
          <p>Step 2: Select Output Format</p>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className={styles.input}
          >
            <option value="XLS">XLS</option>
            <option value="CSV">CSV</option>
            <option value="PDF">PDF</option>
            <option value="HTML">HTML</option>
            <option value="PNG">PNG</option>
            <option value="JPG">JPG</option>
            <option value="XLSX">XLSX</option>
            <option value="ODS">ODS</option>
          </select>
        </div>

        <div className={styles.convertButton}>
          <button onClick={handleConvert} className={styles.button}>
            Convert File
          </button>
        </div>

        {conversionStatus && <p className={styles.status}>{conversionStatus}</p>}
        {convertedFile && (
          <div className={styles.result}>
            <p>Conversion Complete!</p>
            <p>Converted File: {convertedFile.name}</p>
            <a href="#" className={styles.downloadLink}>
              Download Converted File
            </a>
          </div>
        )}

        <div className={styles.formatInfo}>
          <div className={styles.formatSection}>
            <div>
              <h3>Convert From XLS</h3>
              <ul>
                <li>XLS to HTML</li>
                <li>XLS to PDF</li>
                <li>XLS to JPG</li>
                <li>XLS to PNG</li>
                <li>XLS to XPS</li>
                <li>XLS to CSV</li>
                <li>XLS to ODS</li>
                <li>XLS to XLSX</li>
              </ul>
            </div>

            <div>
              <h3>Convert To XLS</h3>
              <ul>
                <li>CSV to XLS</li>
                <li>ET to XLS</li>
                <li>KEY to XLS</li>
                <li>NUMBERS to XLS</li>
                <li>ODS to XLS</li>
                <li>PAGES to XLS</li>
                <li>PDF to XLS</li>
                <li>XLSM to XLS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
