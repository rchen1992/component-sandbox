export const darkGray = 'hsl(215, 23%, 67%)';
export const gray = 'hsl(212, 28%, 86%)';
export const lightGray = 'hsl(222, 33%, 92%)';

export const getColStyle = (bgColor: string) => {
    return {
        style: {
            backgroundColor: bgColor,
            borderRadius: '4px',
            height: '40px',
        },
    };
};

export const getRowStyle = () => {
    return {
        style: {
            marginBottom: '20px',
        },
    };
};
