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
import { scrapeWebsites } from '@/services/api';
import { domains, extractOptions, emailOptions } from '@/constants/generic';

export default function Home() {
  const { activeItem } = useTourStore();
  const [selectedOption, setSelectedOption] = useState('Text Input');
  const [websites, setWebsites] = useState('');
  const [scrapingResults, setScrapingResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedExtractionOptions, setSelectedExtractionOptions] = useState([]);

  const handleSelect = (option) => {
    console.log('Option selected:', option);
    setSelectedOption(selectedOption === option ? null : option);
  };

  const handleWebsitesInput = (e) => {
    console.log('Websites input changed', e.target.value);
    setWebsites(e.target.value);
  };


  console.log('selectedExtractionOptions', selectedExtractionOptions)

  const handleExtractEmails = async () => {
    if (!websites.trim()) {
      alert('Please enter at least one website');
      return;
    }

    setIsLoading(true);

    try {
      const links = websites.split(',').map(site => site.trim()).filter(Boolean);

      const extractOptionsPayload = extractOptions.reduce((acc, option) => {
        acc[option.name] = selectedExtractionOptions.includes(option.name);
        return acc;
      }, {});

      const payload = {
        links: links.join(','),
        domains: selectedDomains,
        extractOptions: extractOptionsPayload,
      };

      const results = await scrapeWebsites(payload);
      // Convert results to array if it's not already
      setScrapingResults(Array.isArray(results) ? results : [results]);
    } catch (error) {
      console.error('Scraping error:', error);
      alert('Failed to extract emails. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtractOptionChange = (option) => {
    let copySelectedExtractionOptions = [...selectedExtractionOptions]

    if (selectedExtractionOptions.includes(option.name)) {
      copySelectedExtractionOptions = copySelectedExtractionOptions.filter(item => item !== option.name)
    } else {
      copySelectedExtractionOptions.push(option.name);
    }

    setSelectedExtractionOptions(copySelectedExtractionOptions)
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
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold text-white">WEB EMAIL FINDER</h1>
            <p className="text-gray-300 text-lg mt-2 mb-6">
              Extract email addresses and phone numbers from any websites!
            </p>
          </div>

          <div className="relative z-10 bg-gray-700 shadow-md rounded-lg p-2 flex justify-between mt-2 w-[85%] max-w-7xl mx-auto">
            {['Text Input', 'Excel Input'].map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-1/2 px-4 py-2 rounded transition ${selectedOption === option
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
                      className="resize rounded border p-6 bg-gray-700 text-white text-sm"
                      placeholder="Enter comma separated domains/URLs (e.g: https://www.examplelink1.pk/,https://examplelink2.com/)"
                      value={websites}
                      onChange={handleWebsitesInput}
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
              <div className="flex flex-col gap-3 mb-4 w-full">
                <label className="font-bold text-lg">Domain Selection</label>
                <div className="bg-black-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex flex-wrap gap-3">
                    {domains.map((domain, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedDomains(prev =>
                            prev.includes(domain)
                              ? prev.filter(d => d !== domain)
                              : [...prev, domain]
                          );
                        }}
                        className={`inline-block rounded px-5 py-3 text-white text-sm transition
                            ${selectedDomains.includes(domain)
                            ? 'bg-gray-700'
                            : 'bg-gray-600 shadow-lg scale-105'}`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-8 mb-6">
                <div className="w-full">
                  <label className="font-bold text-lg">Extraction Options</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {extractOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`option-${index}`}
                          className="accent-white"
                          checked={selectedExtractionOptions.includes(option.name)}
                          onChange={() => handleExtractOptionChange(option)}
                        />
                        <label
                          htmlFor={`option-${index}`}
                          className="text-white text-sm whitespace-nowrap"
                        >
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="w-1/2">
                  <label className="font-bold text-lg">Select Email Mode</label>
                  <div className="flex flex-col gap-3 mt-2">
                    {emailOptions.map((mode, index) => (
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
                </div> */}
              </div>
              <div className="flex justify-center gap-4 my-0">
                <button
                  onClick={handleExtractEmails}
                  className="bg-blue-600 text-white h-12 w-40 rounded hover:bg-blue-700 transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Extracting...' : 'Extract Emails'}
                </button>

                <button className="bg-gray-400 text-white h-12 w-40 rounded hover:bg-gray-500 transition">
                  Clear
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-0">
                <h2 className="font-bold text-lg">Scrapped Data</h2>
                <div className="resize-none rounded border p-6 bg-gray-700 text-white text-sm h-[300px] overflow-y-auto">
                  {/* {scrapingResults ? (
                  <div className="space-y-4">
                    {Object.entries(scrapingResults).map(([key, value], index) => {
                      if (key === 'socialLinks') {
                        return (
                          <div key={key} className="mb-4">
                            <h3 className="font-semibold text-white">Social Links:</h3>
                            <ul className="list-disc pl-4 mt-2">
                              {value.map((link, idx) => (
                                <li key={idx}>{link}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                      if (key === 'phoneNumbers') {
                        return (
                          <div key={key} className="mb-4">
                            <h3 className="font-semibold text-white">Phone Numbers:</h3>
                            <ul className="list-disc pl-4 mt-2">
                              {value.map((phone, idx) => (
                                <li key={idx}>{phone}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                      if (key === 'description') {
                        return (
                          <div key={key} className="mb-4">
                            <h3 className="font-semibold text-white">Description:</h3>
                            <p className="pl-4 mt-2">{value}</p>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                ) : (
                  <span className="text-gray-400">Results will appear here...</span>
                )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}