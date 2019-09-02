export default theme => ({
	root: {
		borderBottom: `1px solid ${theme.palette.border}`,
		backgroundColor: theme.palette.common.white,
		display: 'flex',
		alignItems: 'center',
		height: '64px',
		zIndex: theme.zIndex.appBar
	},
	toolbar: {
		minHeight: 'auto',
		width: '100%'
	},
	title: {
		marginLeft: theme.spacing(1)
	},
	menuButton: {
		marginLeft: '-4px'
	},
	notificationsButton: {
		marginLeft: theme.spacing(1)
	},
	signOutButton: {
		marginLeft: theme.spacing(1)
	},
	searchContent: {
		marginLeft: 'auto',
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
	},
	inputSearch: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
});
