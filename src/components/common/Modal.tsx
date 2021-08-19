import styled from "styled-components";

const ModalWrap = styled.div`
  display: flex;
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
  backdrop-filter: blur(10px);
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
};
const Modal = ({ children, handleClose }: Props) => {
  return (
    <ModalWrap onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrap>
  );
};

export default Modal;
