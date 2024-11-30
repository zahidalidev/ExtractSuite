import { create } from 'zustand'
import { useRouter } from 'next/router'
import EmailIcon from '../assets/icons/email.svg'
import AutocompleteIcon from '../assets/icons/autocomplete.svg'
import ContextIcon from '../assets/icons/context.svg'
import PromptsIcon from '../assets/icons/prompts.svg'


export const sidebarItems = [
  {
    id: 1,
    title: 'Email Extractor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: EmailIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
  {
    id: 2,
    title: 'CSV Merger',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: AutocompleteIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
  {
    id: 3,
    title: 'File Converter',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: ContextIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
  {
    id: 4,
    title: 'URL Opener',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: PromptsIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
  {
    id: 5,
    title: 'Web Builder',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: PromptsIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
]
export const useTourStore = create((set) => ({
  items: sidebarItems,
  activeItem: sidebarItems[0],
  currentStep: 0,
  completedItems: [],
  setCurrentStep: (step) => set({ currentStep: step }),
  setActiveItem: (item) => {
    if (typeof window !== 'undefined') {
      const router = useRouter()
      switch(item.title) {
        case 'CSV Merger':
          router.push('/csvmerger')
          break
        case 'File Converter':
          router.push('/fileconverter')
          break
      }
    }
    
    set({ 
      activeItem: item,
      currentStep: 0
    })
  },
  setCompletedItems: (ids) => set({ completedItems: ids }),
  setItems: (items) => set({ items }),
  handleItemSelect: (item) => {
    set((state) => {
      return {
        activeItem: item,
        items: state.items.map((menuItem) => ({
          ...menuItem,
          isActive: menuItem.id === item.id || state.completedItems.includes(menuItem.id),
        })),
      }
    })
  },
}))









// import { create } from 'zustand'
// import { useRouter } from 'next/router'
// import ChatIcon from '@/assets/icons/chat.svg'
// import AutocompleteIcon from '@/assets/icons/autocomplete.svg'
// import ContextIcon from '@/assets/icons/context.svg'
// import PromptsIcon from '@/assets/icons/prompts.svg'

// export const sidebarItems = [
//   {
//     id: 1,
//     title: 'Chat',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     icon: ChatIcon,
//     demoId: '6ly0v9tfnmsr',
//     isActive: true,
//     subItems: [
//       { id: '1-1', title: 'LLM Selection', description: 'Choose your preferred language model' },
//       { id: '1-2', title: 'Inline Edits', description: 'Make quick code modifications directly' },
//       { id: '1-3', title: 'Inline Bug Fix', description: 'Fix bugs without leaving your editor' },
//       {
//         id: '1-4',
//         title: 'Smart Apply/Execute',
//         description: 'Intelligent code execution and application',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: 'CSV Merger',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     icon: AutocompleteIcon,
//     demoId: '6ly0v9tfnmsr',
//     isActive: true,
//     subItems: [
//       { id: '2-1', title: 'Smart Predictions', description: 'AI-powered code suggestions' },
//       {
//         id: '2-2',
//         title: 'Natural Language Code Generation',
//         description: 'Generate code from plain English',
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: 'File Converter',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     icon: ContextIcon,
//     demoId: '6ly0v9tfnmsr',
//     isActive: true,
//     subItems: [
//       { id: '3-1', title: 'Multi-Repo Context', description: 'Access code across repositories' },
//       { id: '3-2', title: '@-mention', description: 'Reference code and developers easily' },
//       { id: '3-3', title: 'OpenCTX', description: 'Open context integration' },
//     ],
//   },
//   {
//     id: 4,
//     title: 'URL Opener',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     icon: PromptsIcon,
//     demoId: '6ly0v9tfnmsr',
//     isActive: true,
//     subItems: [
//       {
//         id: '4-1',
//         title: 'Prompts & Props Library',
//         description: 'Access pre-built prompts and properties',
//       },
//       { id: '4-2', title: 'Prompt Library', description: 'Browse and use community prompts' },
//     ],
//   },
//   {
//     id: 5,
//     title: 'Web Builder',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     icon: PromptsIcon,
//     demoId: '6ly0v9tfnmsr',
//     isActive: true,
//     subItems: [
//       {
//         id: '4-1',
//         title: 'Prompts & Props Library',
//         description: 'Access pre-built prompts and properties',
//       },
//       { id: '4-2', title: 'Prompt Library', description: 'Browse and use community prompts' },
//     ],
//   },
// ]


// export const useTourStore = create((set) => ({
//   items: sidebarItems,
//   activeItem: sidebarItems[0],
//   activeSubItem: sidebarItems[0].subItems[0],
//   currentStep: 0,
//   completedItems: [],
//   setCurrentStep: (step) => set({ currentStep: step }),
//   setActiveItem: (item) => {
//     // Handle navigation based on item title
//     if (typeof window !== 'undefined') {
//       const router = useRouter()
//       switch(item.title) {
//         case 'CSV Merger':
//           router.push('/csvmerger')
//           break
//         case 'File Converter':
//           router.push('/fileconverter')
//           break
//         // Add other cases as needed
//       }
//     }
    
//     set({ 
//       activeItem: item,
//       activeSubItem: item.subItems[0],
//       currentStep: 0
//     })
//   },
//   setActiveSubItem: (subItem) => set({ activeSubItem: subItem }),
//   setCompletedItems: (ids) => set({ completedItems: ids }),
//   setItems: (items) => set({ items }),
//   handleItemSelect: (item) => {
//     set((state) => {
//       return {
//         activeItem: item,
//         items: state.items.map((menuItem) => ({
//           ...menuItem,
//           isActive: menuItem.id === item.id || state.completedItems.includes(menuItem.id),
//         })),
//       }
//     })
//   },
// }))

