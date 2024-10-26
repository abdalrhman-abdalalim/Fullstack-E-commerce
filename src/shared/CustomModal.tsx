import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

interface IProps {
  title: string;
  okText: string;
  closeText: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isLoading:boolean;
  onOkClick: (event: React.FormEvent<HTMLFormElement>) => void; // Expecting form event
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  closeText,
  okText,
  onOkClick,
  isLoading,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg={"blackAlpha.500"} backdropFilter={"blur(5px) "} />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onOkClick}>
            {children}
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                {closeText}
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
              >
                {okText}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
