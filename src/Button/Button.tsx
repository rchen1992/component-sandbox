import * as React from 'react';
import './Button.css';
import sc from 'styled-components';
import { styledComponentWithProps } from '../sc-utils';

interface TestProps {
    color: string;
}

const styled = {
    button: styledComponentWithProps<TestProps, HTMLButtonElement>(sc.button),
};

const Test = styled.button`
    background-color: ${({ theme }) => theme.warningColor};
    color: ${props => props.color};
`;

export interface Props {
    /** this dictates what the button will say  */
    label: string;
    /** this dictates what the button will do  */
    onClick: () => void;
    /**
     * Disables onclick
     *
     * @default false
     **/
    disabled?: boolean;
}
const noop = () => {};
const Button = (props: Props) => {
    const { label, onClick, disabled = false } = props;
    const disabledclass = disabled ? 'Button_disabled' : '';
    return (
        <div className={`Button ${disabledclass}`} onClick={!disabled ? onClick : noop}>
            <Test color="blue">{label}</Test>
        </div>
    );
};

export default Button;
