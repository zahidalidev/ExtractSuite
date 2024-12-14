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
import styles from '../styles/UrlOpener.module.css';

export default function Home() {
  const { activeItem } = useTourStore();
  const [selectedOption, setSelectedOption] = useState(null);
  const [urls, setUrls] = useState('');
  const [status, setStatus] = useState('');
  const [foundWebsites, setFoundWebsites] = useState(0);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

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
    <h1 className="text-5xl font-bold text-white">BULK URL OPENER</h1>
    <p className="text-gray-300 text-lg mt-2 mb-6">
      Open multiple URLs at once with just one click!
    </p>
  </div>

  <div className="h-[90vh] w-[100%] max-w-7xl rounded-xl bg-muted/50 p-10 flex flex-col gap-8 text-white shadow-lg mt-4">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <textarea
          value={urls}
          onChange={handleUrlsChange}
          placeholder="Paste/Enter URLs here..."
          className="resize-none rounded border p-6 bg-gray-700 text-white text-sm"
        />
        {status && <p className="text-gray-400 text-sm">{status}</p>}
        {foundWebsites > 0 && (
          <p className="text-gray-400 text-sm">{foundWebsites} websites found!</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button 
          onClick={handleOpenUrls}
          className="bg-blue-600 text-white h-12 w-40 rounded hover:bg-blue-700 transition"
        >
          Open URLs
        </button>
        <button 
          onClick={handleClearUrls}
          className="bg-gray-400 text-white h-12 w-40 rounded hover:bg-gray-500 transition"
        >
          Clear
        </button>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-2xl mb-4">Why Choose Our Bulk URL Opener?</h2>
        <ul className="space-y-2 text-lg">
          <li>• <strong>Unparalleled Efficiency:</strong> Open multiple links at once to save time.</li>
          <li>• <strong>Simplicity Redefined:</strong> Easy-to-use interface for everyone.</li>
          <li>• <strong>Customization at Your Fingertips:</strong> Reorder URLs and remove duplicates.</li>
          <li>• <strong>Time-Saving Bookmarks:</strong> Save frequently opened URLs for quick access.</li>
          <li>• <strong>Efficient Research and Workflows:</strong> Simplifies your research and workflows.</li>
        </ul>
      </div>
    </div>
  </div>
</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
