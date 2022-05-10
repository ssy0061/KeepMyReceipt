import Typography from '@mui/material/Typography';

export default function LogoItem() {
  return (
    <Typography
      variant="h6"
      component="a"
      href="/"
      fontFamily="EastSeaDokdoRegular"
      sx={{
        mr: 2,
        p: 'auto',
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        fontWeight: 500,
        float: 'right',
        color: 'inherit',
        fontSize: 40,
        textDecoration: 'none',
      }}
    >
      영수증을 부탁해
    </Typography>
  );
}
