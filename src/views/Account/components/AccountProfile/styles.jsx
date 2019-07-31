export default theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  info: {},
  locationText: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  dateText: {
    color: theme.palette.text.secondary
  },
  avatar: {
    marginLeft: 'auto',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0
  },
  progressWrapper: {
    marginTop: theme.spacing.unit * 2
  },
  profileButton: {
    width: '100%',
    marginRight: theme.spacing.unit * 2
  },
  inputFile: {
    display: 'none',
  },
});
