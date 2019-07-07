import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { ITheme } from '../sc-utils';
import { StyledComponent } from 'styled-components';

interface IModalProps {
    visible?: boolean;
    title?: string;
}

interface IModalWrapperProps extends IModalProps {
    children?: React.ReactNode;
}

interface IModalHeaderProps {}

type ModalWithRef = React.ForwardRefExoticComponent<
    IModalWrapperProps & React.RefAttributes<HTMLDivElement>
>;

const Modal = styled.div<IModalWrapperProps>`
    position: absolute;
    top: 15%;
    left: 50%;
    width: 30%;
    border-radius: 2px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px;
    transform: translateX(-50%);
    z-index: ${({ theme }) => theme.zIndexModal};
`;

const ModalHeader = styled.div<IModalHeaderProps>`
    padding: 20px 20px 0px 20px;
`;

const ModalBody = styled.div`
    padding: 30px 20px;
`;

const ModalFooter = styled.div`
    padding: 10px 20px 20px;
    text-align: right;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: black;
    z-index: ${({ theme }) => theme.zIndexOverlay};
`;

const ModalWrapper = React.forwardRef<HTMLDivElement, IModalProps>((props, ref) => {
    const documentBodyRef = React.useRef(document.querySelector('body'));

    return props.visible
        ? ReactDOM.createPortal(
              <div>
                  <Modal ref={ref}>
                      <ModalHeader>{props.title}</ModalHeader>
                      {props.children}
                  </Modal>
                  <Overlay />
              </div>,
              documentBodyRef.current as HTMLBodyElement
          )
        : null;
});

const ModalWithCompoundComponents = ModalWrapper as ModalWithRef & {
    Body: StyledComponent<'div', ITheme>;
    Footer: StyledComponent<'div', ITheme>;
};

ModalWithCompoundComponents.Body = ModalBody;
ModalWithCompoundComponents.Footer = ModalFooter;

export default ModalWithCompoundComponents;
