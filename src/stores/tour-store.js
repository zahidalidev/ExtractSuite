import { create } from 'zustand'

export const useTourStore = create((set) => ({
  activeItem: {},
  items: [],
  completedItems: [],
  currentStep: 1,
  activeSubItem: null,
  setActiveItem: (item) => set({ activeItem: item }),
  setItems: (items) => set({ items }),
  setCompletedItems: (items) => set({ completedItems: items }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setActiveSubItem: (subItem) => set({ activeSubItem: subItem })
}))
