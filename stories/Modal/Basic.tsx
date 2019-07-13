import * as React from 'react';
import Modal from '../../src/Modal/Modal';
import Button from '../../src/Button/Button';
import { wInfo } from '../../src/utils';

const BasicModal = () => {
    const [visible, setVisible] = React.useState(false);

    function open() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <span>
            <Button onClick={open} buttonSize="mini">
                Open Modal
            </Button>

            <Modal visible={visible} title="Modal Title" onClose={onClose} showClose>
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ marginRight: '10px' }}
                        buttonSize="mini"
                        plain
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button buttonSize="mini" buttonType="primary" onClick={onClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

const ShowOverlay = () => {
    const [visible, setVisible] = React.useState(false);

    function open() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <span style={{ marginLeft: '10px' }}>
            <Button onClick={open} buttonSize="mini">
                Without Overlay
            </Button>

            <Modal visible={visible} title="Modal Title" onClose={onClose} showOverlay={false}>
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ marginRight: '10px' }}
                        buttonSize="mini"
                        plain
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button buttonSize="mini" buttonType="primary" onClick={onClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

const LockScroll = () => {
    const [visible, setVisible] = React.useState(false);

    function open() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <span style={{ marginLeft: '10px' }}>
            <Button onClick={open} buttonSize="mini">
                With Scroll Lock
            </Button>

            <Modal visible={visible} title="Modal Title" onClose={onClose} lockScroll>
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ marginRight: '10px' }}
                        buttonSize="mini"
                        plain
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button buttonSize="mini" buttonType="primary" onClick={onClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

const CloseWithEsc = () => {
    const [visible, setVisible] = React.useState(false);

    function open() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <span style={{ marginLeft: '10px' }}>
            <Button onClick={open} buttonSize="mini">
                Close with Esc
            </Button>

            <Modal visible={visible} title="Modal Title" onClose={onClose} closeOnPressEscape>
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ marginRight: '10px' }}
                        buttonSize="mini"
                        plain
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button buttonSize="mini" buttonType="primary" onClick={onClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => (
            <>
                <BasicModal />
                <ShowOverlay />
                <LockScroll />
                <CloseWithEsc />
            </>
        ),
        wInfo(`
        ### Notes

        Basic modal.
        
        Use **\`visible\`** prop to control modal open/close.

        Use **\`showClose\`** prop to add close button.
        
        Use **\`showOverlay\`** prop to control whether or not background overlay should appear. By default it always shows.
        
        Use **\`lockScroll\`** prop to prevent scrolling the background while modal is open.

        Use **\`closeOnPressEscape\`** prop to allow closing the modal with Esc key.

        Provide an **\`onClose\`** prop to control what should happen when modal closes.
        This is required, because modal visibility is controlled by the consuming comopnent.

        ### Usage
        ~~~js
        const BasicModal = () => {
            const [visible, setVisible] = React.useState(false);

            function open() {
                setVisible(true);
            }

            function onClose() {
                setVisible(false);
            }

            return (
                <>
                    <Button onClick={open} buttonSize="mini">Open Modal</Button>
                    <Modal visible={visible} title="Modal Title" onClose={onClose} showClose>
                        <Modal.Body>Modal Body</Modal.Body>
                        <Modal.Footer>
                            <Button
                                buttonSize="mini"
                                plain
                                onClick={onClose}
                                style={{ marginRight: '10px' }}
                            >
                                Cancel
                            </Button>
                            <Button buttonSize="mini" buttonType="primary" onClick={onClose}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        };
        ~~~
        `)
    );
};

export default Basic;
