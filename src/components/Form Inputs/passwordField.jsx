import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = styled.input`
  background-color: #eee;
  border: 1px solid #9e9ea4;
  padding: 12px 15px;
  margin: 8px 0;
  width: 400px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 120px;
  top: 55%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const PasswordInput = ({ placeholder, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <InputContainer>
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...props}
            />
            <ToggleButton type="button" onClick={handleTogglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </ToggleButton>
        </InputContainer>
    );
};

export default PasswordInput;
