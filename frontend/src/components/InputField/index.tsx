import { Box, Container, FormLabel, forwardRef, Input, InputProps, Select } from '@chakra-ui/react';

export interface InputFieldProps extends InputProps {
  flex?: number;
  label: string;
  inputType?: 'text' | 'select' | 'date' | 'switch';
  disabled?: boolean;
  maxWidth?: string;
  containerWidth?: string;
  value: string;
  setValue?: (newValue: string) => void;
}

export const InputField = forwardRef(
  function ({
    flex,
    label,
    inputType,
    disabled,
    maxWidth,
    containerWidth,
    value,
    setValue,
    ...rest
  }: InputFieldProps, ref) {
    return (
      <Container
        flex={flex}
        margin={0}
        marginInlineStart={0}
        marginInlineEnd={0}
        paddingStart={0}
        paddingEnd={0}
        width={containerWidth || '-webkit-fit-content'}
      >
        <FormLabel fontSize="15px">{label}</FormLabel>
        {(!inputType || ['text', 'date'].includes(inputType)) && (
          <Input
            height="32px"
            fontSize="15px"
            width={maxWidth}
            maxWidth={maxWidth}
            readOnly={disabled}
            disabled={disabled}
            ref={ref}
            _disabled={{ color: 'black', fontWeight: 'medium', bg: '#e0e0e02b' }}
            type={inputType}
            autoFocus
            value={value}
            onChange={setValue ? e => setValue(e.target.value) : undefined}
            {...rest}
          />
        )}
        {inputType === 'date' && <Box bg='blackAlpha.800' zIndex={999} position='absolute' top={0} left={0} width='50%' />}

        {inputType === 'select' && (
          <Select _placeholder={{color: '#666'}} defaultValue={undefined} placeholder='Selecione o sistema' ref={ref} height="32px" fontSize="15px" maxWidth={maxWidth} value={value} onChange={setValue ? e => setValue(e.target.value) : undefined}>
            <option value="1">ERP FINANCEIRO</option>
            <option value="2">ERP CONTÁBIL</option>
            <option value="3">ERP FISCAL</option>
            <option value="4">ERP DP</option>
          </Select>
        )}
      </Container>
    );
  }
);
