import * as React from 'react';
import Modal from '../../src/Modal/Modal';
import Button from '../../src/Button/Button';
import { wInfo } from '../../src/utils';

const ModalSize = (props: any) => {
    const [visible, setVisible] = React.useState(false);

    function open() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <span>
            <Button onClick={open} buttonSize="mini" style={{ marginLeft: '10px' }}>
                {props.size}
            </Button>

            <Modal
                visible={visible}
                title="Modal Title"
                onClose={onClose}
                showClose
                size={props.size}
            >
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

const Full = () => {
    const [visible, setVisible] = React.useState(false);

    function open() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <>
            <Button onClick={open} buttonSize="mini" style={{ marginLeft: '10px' }}>
                full
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

const Size = (stories: any) => {
    stories.add(
        'Size',
        () => (
            <>
                <ModalSize size="small" />
                <ModalSize size="medium" />
                <ModalSize size="large" />
                <Full />
            </>
        ),
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
