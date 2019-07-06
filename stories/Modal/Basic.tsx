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
                <Modal visible={visible} title="Modal Title">
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
                        <Button buttonSize="mini" type="primary" onClick={onClose}>
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

        ### Usage
        ~~~js
        
        ~~~
        `)
    );
};

export default Basic;
