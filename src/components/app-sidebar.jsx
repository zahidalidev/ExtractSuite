"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { useTourStore } from "@/stores/tour-store"
import { useRouter } from 'next/router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import CodyLogo from '../assets/icons/cody.svg'
import { Button } from "./ui/button"


export function AppSidebar(props) {
  const router = useRouter()
  const { items, activeItem, activeSubItem, handleItemSelect, currentStep } = useTourStore()

  const handleNavigation = (item) => {
    handleItemSelect(item)
    switch(item.title) {
      case 'Email Extractor':
        router.push('/')
        break 
      case 'CSV Merger':
        router.push('/csvmerger')
        break
      case 'File Converter':
        router.push('/fileconverter')
        break
      case 'URL Opener':
        router.push('/urlopener')
        break
      case 'Web Builder':
        router.push('/webbuilder')
        break
    }
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid flex-1 text-sm leading-tight justify-center items-center">
              <CodyLogo alt="cody" width={500} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.id} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation(item)}
                  className={`${
                    activeItem?.id === item.id 
                      ? 'text-current hover:text-current bg-sidebar-accent hover:bg-sidebar-accent' 
                      : 'text-gray-400 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <item.icon style={{width: '20px', height: '20px'}}  />
                  <span className="flex-1 truncate text-sm">{item.title}</span>
                </SidebarMenuButton>
                {item.subItems?.length && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              className={`
                                  hover:bg-transparent ${activeSubItem?.id === subItem.id && activeItem.id === item.id
                                  ? 'text-current hover:text-current'
                                  : 'text-gray-400 hover:text-gray-400'}
                                `
                              }
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full mt-auto p-8 flex justify-center">
              <Button
                className="w-[180px] bg-[linear-gradient(92.92deg,_#ffffffe6,_#ffffffb3)] text-black hover:opacity-90 transition-opacity
          py-6 px-12 rounded-sm shadow-lg text-sm flex-grow flex items-center justify-center"
              >
                Contact Support
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
