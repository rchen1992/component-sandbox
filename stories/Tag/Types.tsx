import * as React from 'react';
import Tag from '../../src/Tag/Tag';
import { wInfo } from '../../src/utils';
import { styles } from './util';

const Types = (stories: any) => {
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
};

export default Types;
