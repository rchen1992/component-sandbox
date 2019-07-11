import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Modal from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Modal', () => {
    testComponentCanHandleStyles(<Modal visible onClose={() => {}} />, true);

    test('should be able to pass ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Modal visible ref={ref} onClose={() => {}} />);
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    test('should be able to render as visible', () => {
        const { getByTestId } = render(<Modal visible onClose={() => {}} />);
        const modal = getByTestId('modal');
        expect(modal).toHaveStyleRule('display', 'block');
    });

    test('should be able to render as not visible', () => {
        const { getByTestId } = render(<Modal visible={false} onClose={() => {}} />);
        const modal = getByTestId('modal');
        expect(modal).toHaveStyleRule('display', 'none');
    });

    test('should not fire onClose when clicking on document when modal is not visible', () => {
        const onClose = jest.fn();
        render(<Modal visible={false} onClose={onClose} />);
        fireEvent.click(document.body);
        expect(onClose).not.toHaveBeenCalled();
    });

    test('should fire onClose when clicking on document when modal is visible', () => {
        const onClose = jest.fn();
        render(<Modal visible onClose={onClose} />);
        fireEvent.click(document.body);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('should be able to render modal title', () => {
        const title = 'hello world';
        const { queryByText } = render(<Modal title={title} visible onClose={() => {}} />);
        const modalTitle = queryByText(title);
        expect(modalTitle).toBeTruthy();
    });

    test('should be able to render modal body', () => {
        const body = 'hello world';
        const { queryByText } = render(
            <Modal visible onClose={() => {}}>
                <Modal.Body>{body}</Modal.Body>
            </Modal>
        );
        const modalBody = queryByText(body);
        expect(modalBody).toBeTruthy();
    });

    test('should be able to render modal footer', () => {
        const footer = 'hello world';
        const { queryByText } = render(
            <Modal visible onClose={() => {}}>
                <Modal.Footer>{footer}</Modal.Footer>
            </Modal>
        );
        const modalFooter = queryByText(footer);
        expect(modalFooter).toBeTruthy();
    });

    test('should render close button when showClose is true', () => {
        const { getByTestId } = render(<Modal visible showClose onClose={() => {}} />);
        const modal = getByTestId('modal');
        expect(modal.querySelector('i')).toBeTruthy();
    });

    test('should not render close button when showClose is false', () => {
        const { getByTestId } = render(<Modal visible onClose={() => {}} />);
        const modal = getByTestId('modal');
        expect(modal.querySelector('i')).toBeFalsy();
    });

    test('should render overlay when showOverlay is true', () => {
        const { queryByTestId } = render(<Modal visible showOverlay onClose={() => {}} />);
        const overlay = queryByTestId('modal-overlay');
        expect(overlay).toBeTruthy();
    });

    test('should not render overlay when showOverlay is false', () => {
        const { queryByTestId } = render(<Modal visible showOverlay={false} onClose={() => {}} />);
        const overlay = queryByTestId('modal-overlay');
        expect(overlay).toBeFalsy();
    });
});
