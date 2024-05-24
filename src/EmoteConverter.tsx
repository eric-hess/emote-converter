import React from 'react';
import {Button, Grid} from '@mui/material';
import Pica from 'pica';
import {SizeOption} from './SizeSelector';

interface PropsInterface {
    image: string;
    sizes: SizeOption[];
}

const EmoteConverter = (props: PropsInterface) => {
    const downloadEmote = (height: number, width: number) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const pica = new Pica();

        img.crossOrigin = 'Anonymous';

        img.onload = async () => {
            canvas.height = height;
            canvas.width = width;
            ctx!.imageSmoothingEnabled = false;

            const resizedImage = await pica.resize(img, canvas, {
                filter: 'mks2013'
            });

            ctx!.drawImage(resizedImage, 0, 0, width, height);

            const downloadLink = document.createElement('a');
            downloadLink.href = canvas.toDataURL(`image/${props.image.split(';')[0].split('/')[1]}`);
            downloadLink.download = `emote_${height}_${width}.${props.image.split(';')[0].split('/')[1]}`;
            downloadLink.click();
        };

        img.src = props.image;
    };

    return (
    <Grid
        container
        spacing={2}
    >
        {
            props.sizes.map(entry => (
                <Grid
                    item
                    xs={4}
                    key={`${entry.size.height}x${entry.size.width}`}
                >
                    <Button
                        variant='contained'
                        onClick={() => downloadEmote(entry.size.height, entry.size.width)}
                    >
                        Download {entry.group} {entry.size.height}x{entry.size.width}
                    </Button>
                    <img
                        src={props.image}
                        alt={`Emote ${entry.size.height}x${entry.size.width}`}
                        style={{ height: `${entry.size.height}px`, width: `${entry.size.width}px` }}
                    />
                </Grid>
            ))
        }
    </Grid>
  );
};

export default EmoteConverter;
