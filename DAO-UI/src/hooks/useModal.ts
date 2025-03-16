import { useState, useCallback } from 'react';

interface ModalState {
  isOpen: boolean;
  data?: any;
}

export const useModal = (initialState: boolean = false) => {
  const [state, setState] = useState<ModalState>({
    isOpen: initialState,
    data: null,
  });

  const openModal = useCallback((data?: any) => {
    setState({ isOpen: true, data });
  }, []);

  const closeModal = useCallback(() => {
    setState({ isOpen: false, data: null });
  }, []);

  const toggleModal = useCallback(() => {
    setState(prev => ({ isOpen: !prev.isOpen, data: prev.isOpen ? null : prev.data }));
  }, []);

  return {
    isOpen: state.isOpen,
    modalData: state.data,
    openModal,
    closeModal,
    toggleModal,
  };
};