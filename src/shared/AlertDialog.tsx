import {
  Button,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  title: string;
  description: string;
  buttonTitle: string[];
  varient: string;
  onOkHandler: () => void;
  isLoading:boolean;
}

const CustomAlertDialog = ({
  isOpen,
  onClose,
  buttonTitle,
  description,
  title,
  varient,
  onOkHandler,
}: IProps) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {buttonTitle[0]}
            </Button>
            <Button
              variant={varient}
              colorScheme="red"
              ml={3}
              onClick={onOkHandler}
            >
              {buttonTitle[1]}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomAlertDialog;
