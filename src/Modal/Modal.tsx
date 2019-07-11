import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { ITheme, css, IWithStyles } from '../sc-utils';
import { StyledComponent } from 'styled-components';
import { fadeSlide, fadeSlideRev, ANIMATION_DURATION } from './animations';
import { halfFade, halfFadeRev } from '../style/animations/halfFade';
import usePreviousProp from '../hooks/usePreviousProp';
import useCloseOnClickAway from '../hooks/useCloseOnClickAway';
import getIcon from '../icons';

interface IModalProps {
    visible: boolean;
    title?: string;
    showOverlay?: boolean;
    showClose?: boolean;
}

interface IModalWrapperProps extends IModalProps, IWithStyles {
    children?: React.ReactNode;
    onClose: Function;
}

interface IModalHeaderProps {}

interface IOverlayProps {
    visible?: boolean;
}

type ModalWithRef = React.ForwardRefExoticComponent<
    IModalWrapperProps & React.RefAttributes<HTMLDivElement>
>;

const Wrapper = styled.div<IModalProps>`
    display: ${props => (props.visible ? 'block' : 'none')};
`;

const Modal = styled.div<IModalProps>`
    position: absolute;
    top: 15%;
    left: 50%;
    width: 30%;
    border-radius: 2px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px;
    transform: translateX(-50%);
    z-index: ${({ theme }) => theme.zIndexModal};
    animation: ${props =>
        props.visible
            ? css`
                  ${fadeSlide} ${ANIMATION_DURATION}ms
              `
            : css`
                  ${fadeSlideRev} ${ANIMATION_DURATION}ms
              `};
    animation-fill-mode: forwards;
`;

const ModalHeader = styled.div<IModalHeaderProps>`
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0px 20px;
`;

const ModalBody = styled.div`
    padding: 30px 20px;
`;

const ModalFooter = styled.div`
    padding: 10px 20px 20px;
    text-align: right;
`;

const Overlay = styled.div<IOverlayProps>`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: black;
    z-index: ${({ theme }) => theme.zIndexOverlay};
    animation: ${props =>
        props.visible
            ? css`
                  ${halfFade} ${ANIMATION_DURATION}ms
              `
            : css`
                  ${halfFadeRev} ${ANIMATION_DURATION}ms
              `};
    animation-fill-mode: forwards;
`;

const CloseButton = styled.button`
    border: none;
    cursor: pointer;

    :focus {
        outline: none;
    }

    :hover i {
        color: ${({ theme }) => theme.primaryColor};
    }

    i {
        color: ${({ theme }) => theme.defaultBorderColor};
    }
`;

const ModalWrapper = React.forwardRef<HTMLDivElement, IModalWrapperProps>((props, ref) => {
    const {
        showOverlay = true,
        showClose = false,
        visible,
        onClose,
        title,
        children,
        style,
        className,
    } = props;

    const [shouldRender, setShouldRender] = React.useState(false);
    const prevVisible = usePreviousProp(!!visible);
    const documentBodyRef = React.useRef(document.querySelector('body'));

    const ownRef = React.useRef(null);
    const modalRef = ref || ownRef;

    const CloseIcon = showClose ? getIcon('close') : null;

    useCloseOnClickAway((modalRef as any).current, visible, onClose);

    React.useEffect(() => {
        if (prevVisible && !visible) {
            setTimeout(() => {
                setShouldRender(false);
            }, ANIMATION_DURATION);
        } else if (!prevVisible && visible) {
            setShouldRender(true);
        }
    });

    return ReactDOM.createPortal(
        <Wrapper visible={shouldRender} data-testid="modal">
            <Modal visible={visible} ref={modalRef} style={style} className={className}>
                <ModalHeader>
                    {title}
                    {showClose && (
                        <CloseButton onClick={() => onClose()}>
                            <CloseIcon />
                        </CloseButton>
                    )}
                </ModalHeader>
                {children}
            </Modal>
            {showOverlay && <Overlay visible={visible} data-testid="modal-overlay" />}
        </Wrapper>,
        documentBodyRef.current as HTMLBodyElement
    );
});

const ModalWithCompoundComponents = ModalWrapper as ModalWithRef & {
    Body: StyledComponent<'div', ITheme>;
    Footer: StyledComponent<'div', ITheme>;
};

ModalWithCompoundComponents.Body = ModalBody;
ModalWithCompoundComponents.Footer = ModalFooter;

export default ModalWithCompoundComponents;
