import { Theme } from '@mui/material/styles';

const styles = () => ({
  width: '100%',
  height: 100,
  borderRadius: 1,
  bgcolor: (theme: Theme) => theme.palette.common.black,
  // '&:hover': {
  //   bgcolor: (theme: Theme) => '#ccc',
  // },
})

export { styles }