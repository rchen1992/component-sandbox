import * as React from 'react';
import Checkbox from '../../src/Checkbox';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const CheckAll = (stories: any) => {
    const CheckAll = () => {
        const [fruits] = React.useState(['Apple', 'Orange', 'Pear', 'Mango']);
        const [checkAll, setCheckAll] = React.useState(false);
        const [checkedFruits, setCheckedFruits] = React.useState(['Apple', 'Orange']);
        const [isIndeterminate, setIsIndeterminate] = React.useState(true);

        function onCheckAllChange(e: React.ChangeEvent, data: any) {
            const checkedFruits = !data.prevChecked ? fruits : [];

            setIsIndeterminate(false);
            setCheckAll(!data.prevChecked);
            setCheckedFruits(checkedFruits);
        }

        function onCheckboxGroupChange(value: string[]) {
            const checkedCount = value.length;

            setCheckedFruits(value);
            setCheckAll(checkedCount === fruits.length);
            setIsIndeterminate(checkedCount > 0 && checkedCount < fruits.length);
        }

        return (
            <>
                <Checkbox
                    checked={checkAll}
                    indeterminate={isIndeterminate}
                    onChange={onCheckAllChange}
                    style={{ marginBottom: '10px' }}
                >
                    Check all
                </Checkbox>
                <Checkbox.Group value={checkedFruits} onChange={onCheckboxGroupChange}>
                    {fruits.map((fruit: string) => (
                        <Checkbox key={fruit} value={fruit} style={formatStyles}>
                            {fruit}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </>
        );
    };

    stories.add(
        'Check all',
        () => <CheckAll />,
        wInfo(`
        ### Notes

        Example of implementing "check all" functionality.
        
        ### Usage
        ~~~js
        const CheckAll = () => {
            const [fruits] = React.useState(['Apple', 'Orange', 'Pear', 'Mango']);
            const [checkAll, setCheckAll] = React.useState(false);
            const [checkedFruits, setCheckedFruits] = React.useState(['Apple', 'Orange']);
            const [isIndeterminate, setIsIndeterminate] = React.useState(true);

            function onCheckAllChange(e, data) {
                const checkedFruits = !data.prevChecked ? fruits : [];

                setIsIndeterminate(false);
                setCheckAll(!data.prevChecked);
                setCheckedFruits(checkedFruits);
            }

            function onCheckboxGroupChange(value) {
                const checkedCount = value.length;

                setCheckedFruits(value);
                setCheckAll(checkedCount === fruits.length);
                setIsIndeterminate(checkedCount > 0 && checkedCount < fruits.length);
            }

            return (
                <>
                    <Checkbox
                        checked={checkAll}
                        indeterminate={isIndeterminate}
                        onChange={onCheckAllChange}
                    >
                        Check all
                    </Checkbox>
                    <Checkbox.Group value={checkedFruits} onChange={onCheckboxGroupChange}>
                        {fruits.map((fruit) => (
                            <Checkbox key={fruit} value={fruit}>
                                {fruit}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </>
            );
        };
        ~~~`)
    );
};

export default CheckAll;
