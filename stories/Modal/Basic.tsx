import * as React from 'react';
import Modal from '../../src/Modal/Modal';
import Button from '../../src/Button/Button';
import { wInfo } from '../../src/utils';

const Basic = (stories: any) => {
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
                <Button onClick={open}>Open Modal</Button>
                <Modal visible={visible} title="Modal Title" onClose={onClose}>
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
            </>
        );
    };

    stories.add(
        'Basic',
        () => <BasicModal />,
        wInfo(`
        ### Notes

        Basic modal.
        
        Use **\`visible\`** prop to control modal open/close.

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
                    <Button onClick={open}>Open Modal</Button>
                    <Modal visible={visible} title="Modal Title" onClose={onClose}>
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
