import * as React from 'react';
import Modal from '../../src/Modal/Modal';
import { wInfo } from '../../src/utils';

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => (
            <Modal visible title="Modal Title">
                <Modal.Body>Modal Body</Modal.Body>
                <Modal.Footer>Modal Footer</Modal.Footer>
            </Modal>
        ),
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
