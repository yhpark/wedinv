import { useState } from "react";
import styled, { css } from "styled-components";

const ModalWrap = styled.div<{ shown: boolean }>`
  ${({ shown }) =>
    shown
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  flex-direction: column;
  justify-content: center;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

type Props = {
  children: React.ReactNode;
  shown: boolean;
  handleClose: () => void;
};
const Modal = ({ children, shown, handleClose }: Props) => {
  return (
    <ModalWrap shown={shown} onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>{children}</ModalContent>
    </ModalWrap>
  );
};

export default Modal;
