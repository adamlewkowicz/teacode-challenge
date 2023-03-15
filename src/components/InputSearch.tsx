import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';

interface InputSearchProps {
  value: string;
  onTextChange: (value: string) => void;
  isSearching: boolean;
}

export const InputSearch = ({
  value,
  onTextChange,
  isSearching,
}: InputSearchProps) => (
  <InputGroup position="sticky" top="8px" marginBottom="24px">
    <Input
      placeholder="Search user by first or last name"
      value={value}
      onChange={(event) => onTextChange(event.target.value)}
      backgroundColor="whiteAlpha.100"
    />
    <InputRightElement
      pointerEvents="none"
      children={<Spinner style={{ opacity: isSearching ? '1' : '0' }} />}
    />
  </InputGroup>
);
