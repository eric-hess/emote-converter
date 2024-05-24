import React from 'react';
import {Autocomplete, Grid, TextField} from '@mui/material';

interface PropsInterface {
    sizes: SizeOption[];
    onChange: (sizes: SizeOption[]) => void;
}

interface Size {
    height: number;
    width: number;
}

export interface SizeOption {
    group: string;
    size: Size;
}

export const defaultSizes: SizeOption[] = [
    {group: 'twitch', size: {height: 112, width: 112} },
    {group: 'twitch', size: {height: 56, width: 56} },
    {group: 'twitch', size: {height: 28, width: 28} },
    {group: 'discord', size: {height: 128, width: 128} },
    {group: 'discord', size: {height: 32, width: 32} },
];

const SizeSelector = (props: PropsInterface) => {
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid
                item
                xs={12}
            >
                <Autocomplete
                    multiple
                    freeSolo
                    value={props.sizes}
                    options={defaultSizes}
                    getOptionLabel={option => typeof option === 'string' ? option : `${option.size.height}x${option.size.width}`}
                    groupBy={(option) => option.group}
                    onChange={(event, newValue, reason, details) => {
                        if (typeof details?.option === 'string' && /^\d+x\d+$/.test(details.option)) {
                            const [height, width] = (details.option as string).split('x');
                            props.onChange([
                                ...props.sizes,
                                {
                                    group: 'custom',
                                    size: {
                                        height: Number(height),
                                        width: Number(width)
                                    }
                                }
                            ]);
                        } else if (typeof details?.option !== 'string') {
                            props.onChange(newValue as SizeOption[]);
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label='Sizes' />}
                />
            </Grid>
            <Grid
                item
                xs={6}
            >

            </Grid>
        </Grid>
    );
};

export default SizeSelector;
