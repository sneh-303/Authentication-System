import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploadButton({ onChange }) {
  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(event);
    } else {
      setFileName('');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
      <Button
        component="label"
        variant="outlined"
        size="small"
        startIcon={<CloudUploadIcon />}
        sx={{
          textTransform: 'none',
          paddingX: 1.5,
          paddingY: 0.5,
          fontWeight: 500,
        }}
      >
        Upload
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <Typography variant="caption" color={fileName ? "success.main" : "text.secondary"}>
        {fileName ? `✅ ${fileName}` : '❌ No file selected'}
      </Typography>
    </Box>
  );
}
