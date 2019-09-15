export default theme => ({
      root: {
            flexGrow: 1,
      },
      paper: {
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            height: '150px',
            cursor: 'pointer',
      },
      contentItem: {
            padding: theme.spacing(2),
            width: '100%',
            height: '100%',
            display: 'block'
      },
      image: {
            width: 64,
            height: 64,
      },
});