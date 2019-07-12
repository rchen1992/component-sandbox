import * as React from 'react';
import Modal from '../../src/Modal/Modal';
import Button from '../../src/Button/Button';
import { wInfo } from '../../src/utils';

const Size = (stories: any) => {
    const ModalSize = () => {
        const [visible, setVisible] = React.useState(false);

        function open() {
            setVisible(true);
        }

        function onClose() {
            setVisible(false);
        }

        return (
            <>
                <Button onClick={open} buttonSize="mini">
                    Open Modal
                </Button>
                <Modal
                    visible={visible}
                    title="Full screen modal"
                    onClose={onClose}
                    showClose
                    size="full"
                >
                    <Modal.Body>Full Modal Body</Modal.Body>
                </Modal>
            </>
        );
    };

    stories.add(
        'Size',
        () => <ModalSize />,
        wInfo(`
        ### Notes

        Modal Size.
        
        Use **\`size\`** prop to control modal width.

        Available sizes are **\`small\`**, **\`medium\`**, **\`large\`** and **\`full\`**.

        **\`full\`** sized modal takes up the entire screen.

        ### Usage
        ~~~js
        const ModalSize = () => {
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
                    <Modal
                        visible={visible}
                        title="Full screen modal"
                        onClose={onClose}
                        showClose
                        size="full"
                    >
                        <Modal.Body>Full Modal Body</Modal.Body>
                    </Modal>
                </>
            );
        };
        ~~~
        `)
    );
};

export default Size;
