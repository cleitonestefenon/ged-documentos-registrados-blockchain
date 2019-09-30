export default theme => ({
  root: {
    width: '100%',
    maxHeight: 450,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  footer: {
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center'
  },
  progressWrapper: {
    width: 360,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '48px',
    paddingBottom: '48px'
  },
  header: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'url("/images/connected_world.svg")',
    backgroundPositionX: 'right',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    paddingBottom: '34px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '34px'
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  content: {},
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  listItemIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: '10px',
    borderRadius: '50%',
    marginRight: theme.spacing(2)
  },
  listItemTextSecondary: {
    marignTop: '4px',
    color: theme.palette.text.secondary
  },
  empty: {
    textAlign: 'center',
    padding: theme.spacing(3)
  },
  emptyImageWrapper: {
    marginBottom: theme.spacing(3)
  },
  emptyImage: {
    width: '240px',
    maxWidth: '100%',
    height: 'auto'
  },
  arrowForward: {
    color: theme.palette.text.secondary,
    height: '16px',
    width: '16px'
  },
});
