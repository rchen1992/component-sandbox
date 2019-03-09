import * as React from 'react';
import Select from '../../src/Select';
import { wInfo } from '../../src/utils';
import { mockGroups } from './mockData';

const OptionGroup = (stories: any) => {
    stories.add(
        'Option Group',
        () => (
            <Select>
                {mockGroups.map(group => {
                    return (
                        <Select.OptionGroup key={group.label} label={group.label}>
                            {group.options.map(option => {
                                return (
                                    <Select.Option
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                    >
                                        <span style={{ float: 'left' }}>{option.label}</span>
                                        <span
                                            style={{
                                                float: 'right',
                                                color: '#8492a6',
                                                fontSize: 13,
                                            }}
                                        >
                                            {option.value}
                                        </span>
                                    </Select.Option>
                                );
                            })}
                        </Select.OptionGroup>
                    );
                })}
            </Select>
        ),
        wInfo(`
        ### Notes

        You can group options together with **\`Select.OptionGroup\`**.
        
        ### Usage
        ~~~js
        const groups = [
            {
                label: 'Group A',
                options: [
                    { value: 'Option1', label: 'Option1', },
                    { value: 'Option2', label: 'Option2', },
                ],
            },
            {
                label: 'Group B',
                options: [
                    { value: 'Option3', label: 'Option3', },
                    { value: 'Option4', label: 'Option4', },
                    { value: 'Option5', label: 'Option5', },
                    { value: 'Option6', label: 'Option6', },
                ],
            },
        ];
        
        <Select>
            {groups.map(group => {
                return (
                    <Select.OptionGroup key={group.label} label={group.label}>
                        {group.options.map(option => {
                            return (
                                <Select.Option
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                >
                                    <span style={{ float: 'left' }}>{option.label}</span>
                                    <span
                                        style={{ float: 'right', color: '#8492a6', fontSize: 13 }}
                                    >
                                        {option.value}
                                    </span>
                                </Select.Option>
                            );
                        })}
                    </Select.OptionGroup>
                );
            })}
        </Select>
        ~~~`)
    );
};

export default OptionGroup;
