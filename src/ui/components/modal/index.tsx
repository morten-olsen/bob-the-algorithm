import { ReactNode } from 'react';
import Wrapper from './react-modal';
import { Popup } from '../popup';
type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => (
  <Wrapper 
    transparent
    visible={visible}
    animationType="slide"
    onRequestClose={onClose}
    onDismiss={onClose}
  >
    <Popup onClose={onClose}>
      {children}
    </Popup>
  </Wrapper>
);

export { Modal };
