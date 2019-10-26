import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles, ListItemSecondaryAction, Radio } from '@material-ui/core';

// Material components
import {
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';

// Component styles
import styles from './styles';

class SearchOptionsList extends Component {

	render() {
		const { className, classes, searchOptions, onSelect, filterSelected } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<List dense className={classes.listOptionsFilter}>
					{searchOptions.map((option, key) => {
						const labelId = `checkbox-list-secondary-label-${key}`;
						return (
							<ListItem
								onClick={() => onSelect(option)}
								key={key}
								button
								dense
							>
								<ListItemText id={labelId} primary={option.label} />

								<ListItemSecondaryAction>
									<Radio
										edge="end"
										name={option.label}
										onChange={() => onSelect(option)}
										checked={filterSelected.value === option.value ? true : false}
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</div>
		);
	}
}

SearchOptionsList.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	searchOptions: PropTypes.array.isRequired,
	onSelect: PropTypes.func
};

SearchOptionsList.defaultProps = {
	searchOptions: [],
	onSelect: () => { }
};

export default withStyles(styles)(SearchOptionsList);
