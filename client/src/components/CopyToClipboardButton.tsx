

import { IconButton, Snackbar } from '@mui/material';
import { useState } from 'react'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
type Props = {
  copiedText: string;
};

const CopyToClipboardButton = (props: Props) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(props.copiedText)
  }
  return (
    <div>
      <IconButton aria-label="copy" onClick={handleClick} style={{color: '#0bbfef', padding: '.25rem'}}>
        <ContentPasteIcon />
      </IconButton>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </div>
  )
}


export default CopyToClipboardButton
