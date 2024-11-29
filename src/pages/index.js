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

export default function Home() {
  const { activeItem } = useTourStore();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
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
            <h1 className="text-5xl font-bold text-white">WEB EMAIL FINDER</h1>
            <p className="text-gray-300 text-lg mt-2 mb-6">
              Extract email addresses and phone numbers from any websites!
            </p>
          </div>

          {/* Compact Floating Bar */}
        <div className="relative z-10 bg-gray-700 shadow-md rounded-lg p-2 flex justify-between mt-2 w-[85%] max-w-7xl mx-auto">
          {['Text Input', 'Excel Input'].map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-1/2 px-4 py-2 rounded transition ${
                selectedOption === option
                  ? 'bg-gray-600 text-white hover:bg-gray-500'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-lg'
              }`}
            >
              {option}
            </button>
          ))}
        </div>



          <div className="h-[90vh] w-[100%] max-w-7xl rounded-xl bg-muted/50 p-10 flex flex-col gap-8 text-white shadow-lg mt-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {selectedOption === 'Text Input' ? (
                  <>
                    <label htmlFor="domainInput" className="font-bold text-lg">
                      Enter Domains/URLs
                    </label>
                    <textarea
                      id="domainInput"
                      className="resize-none rounded border p-6 bg-gray-700 text-white text-sm"
                      placeholder="Enter one domain/URL per line"
                      maxLength={50}
                    />
                    <p className="text-gray-400 text-xs mt-1 mb-3">0/50 Unique Websites entered</p>
                  </>
                ) : selectedOption === 'Excel Input' ? (
                  <>
                    <label htmlFor="fileInput" className="font-bold text-lg">
                      Upload Excel File
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="rounded border p-8 bg-gray-700 text-white text-sm"
                    />
                  </>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {[
                  '@domain',
                  'info@',
                  'sales@',
                  'support@',
                  'contact@',
                  'admin@',
                  'editor@',
                  'marketing@',
                  'feedback@',
                  'hr@',
                  'team@',
                  'customerservice@',
                  'office@',
                  'mail@',
                  'enquiries@',
                  '@gmail',
                  '@hotmail',
                  '@yahoo',
                ].map((email, index) => (
                  <button
                    key={index}
                    className="inline-block bg-gray-700 rounded px-5 py-3 text-white text-sm transition hover:bg-gray-600 mb-2"
                  >
                    {email}
                  </button>
                ))}
              </div>
              <div className="flex flex-row gap-8 mb-6">
                <div className="w-1/2">
                  <label className="font-bold text-lg">Extraction Options</label>
                  <div className="flex flex-col gap-3 mt-2">
                    {[
                      'Extract Phone Numbers',
                      'Extract Social Media Profiles',
                      'Website Category',
                    ].map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`option-${index}`}
                          className="accent-white"
                        />
                        <label
                          htmlFor={`option-${index}`}
                          className="text-white text-sm"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="font-bold text-lg">Select Email Mode</label>
                  <div className="flex flex-col gap-3 mt-2">
                    {['Single Email ID', 'Extract Emails'].map((mode, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="emailMode"
                          id={`mode-${index}`}
                          className="accent-white"
                        />
                        <label htmlFor={`mode-${index}`} className="text-white text-sm">
                          {mode}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button className="bg-blue-600 text-white h-12 w-40 rounded hover:bg-blue-700 transition">
                  Extract Emails
                </button>
                <button className="bg-gray-400 text-white h-12 w-40 rounded hover:bg-gray-500 transition">
                  Clear
                </button>
                <button className="bg-red-600 text-white h-12 w-40 rounded hover:bg-red-700 transition">
                  Report Error
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
