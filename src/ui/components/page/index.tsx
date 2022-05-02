import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Keyboard, Platform } from 'react-native';

const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Pressable = styled.Pressable`
  flex: 1;
`
// background-color: ${({ theme }) => theme.colors.background};

const Page: React.FC = ({ children }) => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  useEffect(() => {
    const keyboardDidShow = () => setKeyboardShown(true);
    const keyboardDidHide = () => setKeyboardShown(false);
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);
  return (
    <Pressable
      disabled={!keyboardShown}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoiding behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoiding>
    </Pressable>
  );
};

export { Page };
