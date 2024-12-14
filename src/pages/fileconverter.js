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
import styles from '../styles/FileConverter.module.css';

export default function Home() {
  const { activeItem } = useTourStore();
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputFile, setInputFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('XLS');
  const [conversionStatus, setConversionStatus] = useState('');
  const [convertedFile, setConvertedFile] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

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
                   {/* Data Fetching */} 
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center p-6 w-[100%] mx-auto">
  {/* Main header with background color for visibility */}
  <div className="relative z-10 text-center">
    <h1 className="text-5xl font-bold text-white">FILE CONVERTER</h1>
    <p className="text-gray-300 text-lg mt-2 mb-6">
      Convert files from one format to another with ease. We support a variety of formats!
    </p>
  </div>

  <div className="h-[90vh] w-[100%] max-w-7xl rounded-xl bg-muted/50 p-10 flex flex-col gap-8 text-white shadow-lg mt-4">
    {/* Place all your existing file converter content here */}
    <div className="flex flex-col gap-6">
      <div className="uploadSection">
      <p className="text-lg mb-3">
        <span className="font-bold">Step 1:</span> 
        <span className="text-m ml-2">Upload Your File</span>
      </p>
        <input
          type="file"
          accept=".xls,.xlsx,.csv,.pdf,.ods,.html,.jpg,.png,.jpeg,.txt"
          onChange={handleFileChange}
          className="rounded border p-8 bg-gray-700 text-white text-sm w-full"
        />
      </div>

      <div className="selectFormat">
      <p className="text-lg mb-3">
        <span className="font-bold">Step 2:</span> 
        <span className="text-m ml-2">Select Output Format</span>
      </p>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="rounded border p-4 bg-gray-700 text-white text-sm w-full"
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

      <div className="flex justify-center gap-4 mt-4">
        <button 
          onClick={handleConvert}
          className="bg-blue-600 text-white h-12 w-40 rounded hover:bg-blue-700 transition"
        >
          Convert File
        </button>
      </div>

      {conversionStatus && <p className="text-center">{conversionStatus}</p>}
      {convertedFile && (
        <div className="text-center">
          <p>Conversion Complete!</p>
          <p>Converted File: {convertedFile.name}</p>
          <a href="#" className="text-blue-00 hover:bg-gray-600">
            Download Converted File
          </a>
        </div>
      )}

<div className="flex justify-center items-start gap-12 mt-8">
  {/* Convert From XLS Section */}
  <div style={{ textAlign: 'center', flex: 1 }}>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
      Convert From XLS
    </h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to HTML</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to PDF</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to JPG</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to PNG</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to XPS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to CSV</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to ODS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLS to XLSX</li>
    </ul>
  </div>

  {/* Convert To XLS Section */}
  <div style={{ textAlign: 'center', flex: 1 }}>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
      Convert To XLS
    </h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>CSV to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>ET to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>KEY to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>NUMBERS to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>ODDS to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>PAGES to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>PDF to XLS</li>
      <li style={{ fontSize: '1 rem', marginBottom: '0.5rem' }}>XLSM to XLS</li>
    </ul>
  </div>
</div>

    </div>
  </div>
</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
