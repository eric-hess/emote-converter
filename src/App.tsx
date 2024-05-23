import React from 'react';
import {Button, Container, Grid} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmoteConverter from './EmoteConverter';
import HiddenInput from './HiddenInput';

const App = () => {
    const [originalImage, setOriginalImage] = React.useState<string| undefined>(undefined);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file =event.target.files?.item(0);

        const reader = new FileReader();

        reader.onload = () => {
            setOriginalImage(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
      };

    return (
        <Container
            maxWidth='sm'
        >
            <Grid
                container
                spacing={2}
                alignContent='center'
                alignItems='center'
            >
                <Grid
                    item
                    xs={12}
                    alignContent='center'
                    alignItems='center'
                >
                    <Button
                        component='label'
                        variant='contained'
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        select file
                        <HiddenInput
                            type='file'
                            accept="image/*" 
                            onChange={(event) => handleImageUpload(event)}
                        />
                    </Button>
                </Grid>
                {
                    originalImage ? (
                        <Grid
                            item
                            xs={12}
                        >
                            <img
                                src={originalImage}
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                        </Grid>
                    ) : null
                }
                {
                    originalImage ? (
                        <Grid
                            item
                            xs={12}
                        >
                            <EmoteConverter 
                                image={originalImage}
                            />
                        </Grid>
                    ) : null
                }
            </Grid>
        </Container>
    );
};

export default App;
