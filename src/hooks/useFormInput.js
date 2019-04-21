import { useState } from 'react';

const useFormInput = () => {
  const [inputValue, setInputValue] = useState(``);

  const handleInputChange = e => setInputValue(e.target.value);

  const clearInput = () => setInputValue(``);

  return [inputValue, handleInputChange, clearInput];
};

export default useFormInput;
