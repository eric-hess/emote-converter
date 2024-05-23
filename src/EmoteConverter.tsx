import React from 'react';
import {Button, Grid} from '@mui/material';

interface PropsInterface {
    image: string;
};

const EmoteConverter = (props: PropsInterface) => {
    const sizes = {
        twitch: [28, 56, 112],
        discrod: [32],
    };

    const downloadEmote = (size: number) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
      
        img.crossOrigin = 'Anonymous';
      
        img.onload = () => {
          canvas.width = size;
          canvas.height = size;
          ctx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, size, size);
      
          const downloadLink = document.createElement('a');
          downloadLink.href = canvas.toDataURL(`image/${props.image.split(';')[0].split('/')[1]}`);
          downloadLink.download = `emote_${size}.${props.image.split(';')[0].split('/')[1]}`;
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
            Object.entries(sizes).map(([key, value]) => (
                <React.Fragment
                    key={key}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        {key}
                    </Grid>
                    {
                        value.map((size) => (
                            <Grid
                                item
                                xs={4}
                                key={size}
                            >
                                <Button
                                    variant='contained'
                                    onClick={() => downloadEmote(size)}
                                >
                                    Download {size}px
                                </Button>
                                <img
                                    src={props.image}
                                    alt={`Emote ${size}`}
                                    style={{ width: `${size}px`, height: `${size}px` }}
                                />
                            </Grid>
                        ))
                    }
                </React.Fragment>
            ))
        }
    </Grid>
  );
};

export default EmoteConverter;