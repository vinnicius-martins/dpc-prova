import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import { useRef, useMemo } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmButtonColor?: 'red' | 'green' | 'blue';
}

export function ConfirmModal({ title, body, isOpen, onClose, onConfirm, cancelLabel, confirmLabel, confirmButtonColor }: ConfirmModalProps) {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(4px)'
        >
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            {body &&
              <AlertDialogBody>
                {body}
              </AlertDialogBody>
            }

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelLabel || 'Cancelar'}
              </Button>
              <Button colorScheme={confirmButtonColor} onClick={onConfirm} ml={3}>
                {confirmLabel || 'Confirmar'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
