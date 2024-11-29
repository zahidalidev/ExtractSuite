import { useTourStore } from '@/stores/tour-store';
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from 'react';
import styles from '../styles/CsvMerger.module.css';

export default function Home() {
  const { activeItem } = useTourStore();
  const [selectedOption, setSelectedOption] = useState(null);
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
    <SidebarProvider className="dark">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-white">
                    {activeItem.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    Data Fetching
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center p-6 w-[100%] mx-auto">
          {/* Main header with background color for visibility */}
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold text-white">CSV MERGER</h1>
            <p className="text-gray-300 text-lg mt-2 mb-6">
              Merge multiple CSV files in just three simple steps!
            </p>
          </div>

          <div className="h-[90vh] w-[100%] max-w-7xl rounded-xl bg-muted/50 p-10 flex flex-col gap-4 text-white shadow-lg mt-4">
            <div className={styles.uploadSection}>
            <p className={`${styles.dragDropText} mb-4`}>Drag & Drop CSV files here</p>
              <div className={styles.dropZone}
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}>
                <input
                  type="file"
                  accept=".csv"
                  multiple
                  onChange={handleFileSelect}
                  className={styles.input}
                />
              </div>
            </div>
            {/* Rest of your existing CSV merger components */}
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
                  style={{ marginRight: '8px' }}
                />
                Keep header (index) in the first file only
              </label>
            </div>

            <button onClick={handleMerge} className={`${styles.button} bg-gray-700 hover:bg-gray-600`}>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
