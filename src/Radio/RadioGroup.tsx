import * as React from 'react';
import { IChangeHandlerWithData } from '../types';
import Radio, { IRadioData, IRadioProps } from './Radio';
import { IWithStyles } from 'sc-utils';

export interface IRadioGroupProps extends IWithStyles {
    value?: string;
    onChange?: IChangeHandlerWithData<IRadioData>;
}

const RadioGroup: React.FunctionComponent<IRadioGroupProps> = props => {
    /**
     * We will be passing this to each of the individual Radio buttons in this group.
     *
     * When an onChange event occurs in one of the children, we will call the onChange
     * handler for the group with the same arguments.
     */
    function onChange(e: React.ChangeEvent, data: IRadioData) {
        if (props.onChange) {
            props.onChange(e, data);
        }
    }

    const children = React.Children.map(props.children, child => {
        if (!React.isValidElement(child) || child.type !== Radio) {
            throw new Error('The only valid child to a Radio Group element is a Radio element.');
        }

        let radio = child as React.ReactElement<IRadioProps>;

        return React.cloneElement(radio, {
            checked: props.value === radio.props.value,
            onChange,
        });
    });

    return (
        <div className={props.className} style={props.style}>
            {children}
        </div>
    );
};

export default RadioGroup;
