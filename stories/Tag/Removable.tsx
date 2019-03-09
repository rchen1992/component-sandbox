import * as React from 'react';
import Tag from '../../src/Tag/Tag';
import { wInfo } from '../../src/utils';
import { styles } from './util';
import { TagType } from '../../src/Tag/tagTypes';

const Removable = (stories: any) => {
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
};

export default Removable;
