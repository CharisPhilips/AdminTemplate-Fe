import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { NavLink } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './search-jss';

const menu = [];

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputHeader,
          input: classes.inputHeaderText,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem button selected={isHighlighted} component={NavLink} to={suggestion.link}>
      <div>
        {parts.map((part, index) => (
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps}>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0 ? [] : menu.filter(suggestion => {
    const keep = (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class SearchUi extends React.Component {
  state = {
    value: '',
    suggestions: [],
  };

  componentDidMount() {

    const { routes } = this.props.authUser;
    if (routes != null) {
      routes.map(item => {
        if (item.child) {
          item.child.map(itemChild => {
            if (itemChild.link) {
              menu.push(itemChild);
            }
            return menu;
          });
        }
        return false;
      });
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  handleSuggestionSelected = (event, { suggestion, method }) => {
    const { history } = this.props;
    if (method === 'enter') {
      history.push(suggestion.link);
    }
  }

  render() {
    const { classes , intl} = this.props;
    const { suggestions, value } = this.state;

    return (
      <Autosuggest
        theme={{
          container: classes.containerSearch,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestion={renderSuggestion}
        className={classes.autocomplete}
        inputProps={{
          classes,
          placeholder: intl.formatMessage({id: 'app.search_placeholder', defaultMessage: "Search Ui"}),
          value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

SearchUi.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.getIn(['auth', 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const SearchUiMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUi);

export default withStyles(styles)(injectIntl(SearchUiMapped));
