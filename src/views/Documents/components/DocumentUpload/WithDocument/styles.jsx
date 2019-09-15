export default theme => ({
      root: {
            flexGrow: 1,
      },
      paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
      },
      divider: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
      },
      image: {
            width: 128,
            height: 128,
      },
      img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
      },
      marginButton: {
            margin: theme.spacing(1),
      },
});