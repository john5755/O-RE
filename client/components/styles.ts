import styled from '@emotion/styled';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export const H1 = styled.h1`
  font-size: 35px;
  font-weight: bold;
  line-height: 1.5;
  margin: 0;
`;

export const H2 = styled.h2`
  font-size: 30px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
`;

export const H3 = styled.h3`
  font-size: 25px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
`;

export const H4 = styled.h4`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
`;

export const Input = styled.input`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  border: solid 1px rgba(0, 0, 0, 0.5);
  padding: 0 10px;
  font-size: 18px;
  &:focus {
    outline: none;
    border: solid 2px;
    border-color: var(--main-color);
  }
  ::placeholder {
    font-size: 16px;
    vertical-align: middle;
  }
`;

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  width?: string;
  height?: string;
  fontSize?: string;
}

export const Button = styled.button<ButtonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  background: var(--main-color);
  color: white;
  border-color: white;
  border-width: 0;
  font-size: ${({ fontSize }) => fontSize || '20px'};
`;

export const Label = styled.label`
  padding: 10px 0;
  font-weight: bold;
`;
