import React from 'react';

interface PropsInterface {
    type: string;
    accept: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HiddenInput = (props: PropsInterface) => {
    return (
        <input 
        style={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
        }}
        type={props.type}
        accept={props.accept}
        onChange={props.onChange}
        />
    );
};

export default HiddenInput;