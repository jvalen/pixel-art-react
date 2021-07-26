import React from 'react';
import styled from 'styled-components';

const ValidationContainer = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const TitleContainer = styled.h3`
  display: block;
  text-align: center;
  font-size: 1.2rem;
  top: 0;
  color: white;
  background-color: red;
  margin: 0;
  padding: 0.5rem;
`;

const MessageContainer = styled.p`
  font-size: 1rem;
  color: red;
  font-weight: bold;
  padding: 0.5rem 0;
`;

const ValidationMessage = ({ value }) => (
  <ValidationContainer>
    <TitleContainer>{value.title}</TitleContainer>
    <MessageContainer>{value.message}</MessageContainer>
  </ValidationContainer>
);
export default ValidationMessage;
