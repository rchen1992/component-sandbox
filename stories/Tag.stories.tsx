import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Tag from '../src/Tag/Tag';
import { wInfo } from '../src/utils';
import { TagType } from '../src/Tag/tagTypes';

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
const Removable = () => {
    const [tags, setTags] = React.useState([
        {
            content: 'Default',
            type: undefined,
        },
        {
            content: 'Gray',
            type: TagType.gray,
        },
        {
            content: 'Primary',
            type: TagType.primary,
        },
        {
            content: 'Success',
            type: TagType.success,
        },
        {
            content: 'Warning',
            type: TagType.warning,
        },
        {
            content: 'Danger',
            type: TagType.danger,
        },
    ]);

    function onTagClose(index: number) {
        setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    }

    const tagList = tags.map(({ content, type }, index) => (
        <Tag
            key={content}
            closable
            onClose={onTagClose.bind(undefined, index)}
            type={type}
            style={styles}
        >
            {content}
        </Tag>
    ));

    return <>{tagList}</>;
};

stories.add(
    'Removable',
    () => <Removable />,
    wInfo(`
        ### Notes

        Removable tags.
        
        Add **\`closable\`** prop to add a close icon to tag.
        
        Add **\`onClose\`** prop to handle the close event.

        ### Usage
        ~~~js
        const Removable = () => {
            const [tags, setTags] = React.useState([
                { content: 'Default', type: undefined, },
                { content: 'Gray', type: 'gray', },
                { content: 'Primary', type: 'primary', },
                { content: 'Success', type: 'success', },
                { content: 'Warning', type: 'warning', },
                { content: 'Danger', type: 'danger', },
            ]);

            function onTagClose(index) {
                setTags([
                    ...tags.slice(0, index),
                    ...tags.slice(index + 1)
                ]);
            }

            const tagList = tags.map(({ content, type }, index) => (
                <Tag
                    key={content}
                    closable
                    onClose={onTagClose.bind(undefined, index)}
                    type={type}
                >
                    {content}
                </Tag>
            ));

            return <>{tagList}</>;
        };
        ~~~
        `)
);

export default stories;
