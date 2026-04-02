"use client";

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

// Context categories map to smart copy in the modal
export const ENQUIRY_CONTEXTS = {
  PLOT: 'plot',
  APARTMENT: 'apartment',
  TOWNSHIP: 'township',
  GENERAL: 'general'
};

export function ModalProvider({ children }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [enquiryContext, setEnquiryContext] = useState(ENQUIRY_CONTEXTS.GENERAL);

  const openEnquiry = (projectId = "", context = ENQUIRY_CONTEXTS.GENERAL) => {
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
