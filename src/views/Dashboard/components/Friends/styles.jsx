export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  details: {},
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  value: {
    marginTop: theme.spacing(1)
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'inline-flex',
    height: '3rem',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '3rem'
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: '1.5rem',
    height: '1.5rem',
    width: '1.5rem'
  },
  footer: {
    marginTop: theme.spacing(3)
  },
  caption: {
    marginTop: theme.spacing(2),
  }
});
