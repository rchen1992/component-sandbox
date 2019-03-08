import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Tag from '../src/Tag';
import { wInfo } from '../src/utils';

const stories = storiesOf('Components/Tag', module) as any;

const styles = {
    marginRight: '10px',
};

/**
|--------------------------------------------------
| Types
|--------------------------------------------------
*/
stories.add(
    'Types',
    () => (
        <>
            <Tag style={styles}>Default</Tag>
            <Tag type="gray" style={styles}>
                Gray
            </Tag>
            <Tag type="primary" style={styles}>
                Primary
            </Tag>
            <Tag type="success" style={styles}>
                Success
            </Tag>
            <Tag type="warning" style={styles}>
                Warning
            </Tag>
            <Tag type="danger" style={styles}>
                Danger
            </Tag>
        </>
    ),
    wInfo(`
        ### Notes

        Tag types.

        ### Usage
        ~~~js
        <Tag>Default</Tag>
        <Tag type="gray">Gray</Tag>
        <Tag type="primary">Primary</Tag>
        <Tag type="success">Success</Tag>
        <Tag type="warning">Warning</Tag>
        <Tag type="danger">Danger</Tag>
        ~~~`)
);

/**
|--------------------------------------------------
| Removable
|--------------------------------------------------
*/
stories.add(
    'Removable',
    () => (
        <>
            <Tag closable style={styles}>
                Default
            </Tag>
            <Tag closable type="gray" style={styles}>
                Gray
            </Tag>
            <Tag closable type="primary" style={styles}>
                Primary
            </Tag>
            <Tag closable type="success" style={styles}>
                Success
            </Tag>
            <Tag closable type="warning" style={styles}>
                Warning
            </Tag>
            <Tag closable type="danger" style={styles}>
                Danger
            </Tag>
        </>
    ),
    wInfo(`
        ### Notes

        Tag types.

        ### Usage
        ~~~js
        <Tag>Default</Tag>
        <Tag type="gray">Gray</Tag>
        <Tag type="primary">Primary</Tag>
        <Tag type="success">Success</Tag>
        <Tag type="warning">Warning</Tag>
        <Tag type="danger">Danger</Tag>
        ~~~`)
);

export default stories;
