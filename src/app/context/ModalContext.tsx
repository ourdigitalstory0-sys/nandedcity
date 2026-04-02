"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context categories map to smart copy in the modal
export type EnquiryContextType = 'plot' | 'apartment' | 'township' | 'general';

export const ENQUIRY_CONTEXTS = {
  PLOT: 'plot',
  APARTMENT: 'apartment',
  TOWNSHIP: 'township',
  GENERAL: 'general'
} as const;

interface ModalContextType {
  isEnquiryOpen: boolean;
  selectedProject: string;
  enquiryContext: EnquiryContextType;
  openEnquiry: (projectId?: string, context?: EnquiryContextType) => void;
  closeEnquiry: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [enquiryContext, setEnquiryContext] = useState<EnquiryContextType>(ENQUIRY_CONTEXTS.GENERAL);

  const openEnquiry = (projectId = "", context: EnquiryContextType = ENQUIRY_CONTEXTS.GENERAL) => {
    setSelectedProject(projectId);
    setEnquiryContext(context);
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isEnquiryOpen, selectedProject, enquiryContext, openEnquiry, closeEnquiry }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within a ModalProvider');
  }
  return context;
}
