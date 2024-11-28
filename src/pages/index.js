// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to My Next.js App</h1>
//       <p>Mera Platform Meri Marzi.</p>
//     </div>
//   )
// }




import { useEffect, useMemo, useRef } from 'react'
import { useTourStore } from '@/stores/tour-store'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Home() {
  const iframeRef = useRef(null);
  const { activeItem, items, completedItems, setCompletedItems, setItems, setActiveItem, setActiveSubItem, setCurrentStep } = useTourStore();

  useEffect(() => {
    const currentIframe = iframeRef.current;
    if (currentIframe) {
      const handleMessage = (event) => {
        if (event.data.payload?.event === 'step_view') {
          const step = event.data.payload?.step?.index;
          if (typeof step === 'number' && activeItem?.subItems[step - 1]) {
            setActiveSubItem(activeItem.subItems[step - 1]);
            setCurrentStep(step);
          }
        }

        if (event.data.payload?.event === 'flow_end') {
          const currentIndex = items.findIndex(item => item.id === activeItem.id);
          const newCompletedItems = [...completedItems];

          if (!newCompletedItems.includes(activeItem.id)) {
            newCompletedItems.push(activeItem.id);
            setCompletedItems(newCompletedItems);
          }

          if (currentIndex === items.length - 1) {
            const firstItem = items[0];
            setActiveItem(firstItem);
            setItems(items.map((item, idx) => ({
              ...item,
              isActive: idx === 0 || newCompletedItems.includes(item.id)
            })));
          } else if (currentIndex < items.length - 1) {
            const nextItem = items[currentIndex + 1];
            setActiveItem(nextItem);
            setItems(items.map((item, idx) => ({
              ...item,
              isActive: idx === currentIndex + 1 || newCompletedItems.includes(item.id)
            })));
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
        if (currentIframe) {
          currentIframe.src = 'about:blank';
        }
      };
    }
  }, [activeItem.id]);

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
                  <BreadcrumbLink href="#">
                    {activeItem.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-[95%] mx-auto justify-center">
          <div className="h-[85vh] rounded-xl bg-muted/50">
            {useMemo(() => (
              <iframe
                key={activeItem.id}
                ref={iframeRef}
                className="sl-demo"
                src={`https://app.storylane.io/demo/${activeItem.demoId}`}
                allow="fullscreen"
                allowFullScreen
                suppressHydrationWarning
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            ), [activeItem.id, activeItem.demoId])}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
