import ReactDOM  from "react-dom";
import React, { ReactNode, RefObject, useRef } from 'react';
import styled from "styled-components";

interface AlertProps {
  children: ReactNode;
  confirmText: string;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertProps> = ({ children, confirmText, onConfirm }) => {
  const modalRef: RefObject<HTMLDivElement> = useRef(null);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContainer ref={modalRef}>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 80px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  height: 300px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalContent = styled.div`
  font-size: 32px;
  text-align: center;
  font-family: NotoSansBold;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  font-family: NotoSansBold;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default AlertModal;