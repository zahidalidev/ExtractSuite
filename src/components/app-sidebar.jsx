"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { useTourStore } from "@/stores/tour-store"
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
import Image from "next/image"
import { Button } from "./ui/button"

import { useRouter } from 'next/router'

export function AppSidebar(props) {
  const router = useRouter()
  const { items, activeItem, activeSubItem, handleItemSelect, currentStep } = useTourStore()

  const handleNavigation = (item) => {
    handleItemSelect(item)
    switch(item.title) {
      case 'CSV Merger':
        router.push('/csvmerger')
        break
      case 'File Converter':
        router.push('/fileconverter')
        break
      case 'URL Opener':
        router.push('/urlopener')
        break
      case 'Chat':
        router.push('/')
        break
    }
  }

  console.log('currentStep', currentStep)
  console.log('activeSubItem', activeSubItem)

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid flex-1 text-sm leading-tight justify-center items-center">
              <Image src={CodyLogo} alt="cody" width={150} />
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
                  className={`
                    flex items-center gap-3 px-4 py-2
                    ${activeItem.id === item.id
                      ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                      : ''
                    }
                  `}
                >
                  <Image alt="cody" className="size-4" src={item.icon} />
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
                Contact Sales
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
