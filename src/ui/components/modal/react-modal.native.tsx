import ReactDOM from 'react-dom';
import React, { useMemo, useEffect, ReactNode } from 'react';

interface Props {
  visible: boolean;
  children: ReactNode;
}

const Modal: React.FC<Props> = ({ visible, children }) => {
  const elm = useMemo(() => {
    const newElm = document.createElement('div');
    newElm.style.position = 'fixed';
    newElm.style.display = 'flex';
    newElm.style.flexDirection = 'column';
    newElm.style.left = '0px';
    newElm.style.top = '0px';
    newElm.style.width = '100%';
    newElm.style.height = '100%';
    newElm.style.transition = 'transform 0.3s';
    newElm.style.transform = 'translateY(100%)';
    return newElm;
  }, []);
  useEffect(() => {
    document.body.appendChild(elm);
    return () => {
      document.body.removeChild(elm);
    };
  }, [elm]);
  useEffect(() => {
    if (visible) {
      elm.style.transform = 'translateY(0)';
    } else {
      elm.style.transform = 'translateY(100%)';
    }
  }, [elm, visible]);

  return ReactDOM.createPortal(
    <>{children}</>,
    elm,
  );
};

export default Modal;
