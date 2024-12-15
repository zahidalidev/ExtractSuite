// import AppBar from '../components/AppBar';
import '../styles/globals.css'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          <Component {...pageProps} />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
