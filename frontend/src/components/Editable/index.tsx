import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput as EditableInputBase,
  EditablePreview,
  Flex,
  Tooltip,
  useColorModeValue,
  useEditableControls,
} from '@chakra-ui/react';
import { FiCheck as CheckIcon, FiX as CloseIcon } from 'react-icons/fi';
import { InputField } from '../InputField';

interface EditableInputProps {
  flex: number;
  label: string;
  value: string;
  setValue: (newValue: string) => void;
}

export function EditableInput({ flex, label, value, setValue }: EditableInputProps) {
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return isEditing ? (
      <Flex marginTop="5px">
        <ButtonGroup
          width="full"
          display="flex"
          justifyContent="end"
          alignItems="end"
        >
          <Button
            colorScheme='blue'
            bg='blue.400'
            h="-webkit-fit-content"
            padding="1px"
            minW="-webkit-fit-content"
            borderRadius="3px"
            {...getSubmitButtonProps()}
          >
            <CheckIcon size="16px" />
          </Button>
          <Button
            colorScheme='red'
            bg='red.400'
            h="-webkit-fit-content"
            padding="1px"
            minW="-webkit-fit-content"
            borderRadius="3px"
            {...getCancelButtonProps()}
          >
            <CloseIcon size="16px" />
          </Button>
        </ButtonGroup>
      </Flex>
    ) : null;
  }

  return (
    <Editable
      isPreviewFocusable
      selectAllOnFocus={false}
      flex={flex}
      value={value}
      onChange={(nextValue) => setValue(nextValue)}
    >
      <EditableInputBase
        as={InputField}
        containerWidth="100%"
        label={label}
        setValue={setValue}
      />
      <Tooltip label="Clique para editar">
        <EditablePreview
          marginInlineStart={0}
          marginInlineEnd={0}
          paddingInline="1rem"
          height="32px"
          fontSize="16px"
          border="1px solid #E2E8F0"
          overflow="hidden"
          width="100%"
          _hover={{
            background: useColorModeValue('gray.100', 'gray.700'),
          }}
        />
      </Tooltip>
      <EditableControls />
    </Editable>
  );
}
