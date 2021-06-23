import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Ionicon from 'react-ionicons';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
// import dataIcon from './ion-icon';
import dataIcon from 'kilcote-utils/icons/ion-icon';

import { PapperBlock } from 'kilcote-components';
import DetailIonIcon from './IconGallery/DetailIonIcon';
import SearchIcons from './IconGallery/SearchIcons';

const styles = theme => ({
  hide: {
    display: 'none'
  },
  iconsList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    overflow: 'auto',
    maxHeight: 1000,
    position: 'relative'
  },
  iconWrap: {
    position: 'relative',
    width: 120,
    margin: 20,
    [theme.breakpoints.down('xs')]: {
      margin: 10,
    },
    textAlign: 'center'
  },
  btn: {
    display: 'block',
    textAlign: 'center',
    margin: '0 auto',
    '& svg': {
      width: 36,
      height: 36
    }
  },
  icon: {
    fontSize: 48,
  },
  preloader: {
    width: '100%'
  },
});

class IonIcons extends React.Component {
  state = {
    loading: false,
    filterText: ''
    // iconName: '',
  };

  componentDidMount = () => {
    this.setState({ loading: true });
  }

  handleCloseDetail = () => {
    this.setState({ openDetail: false });
  };

  handleSearch = (event) => {
    event.persist();
    // Show result base on keyword
    this.setState({ filterText: event.target.value.toLowerCase() });
  }

  render() {
    const {
      loading,
      filterText
      // openDetail,
      // iconName,
    } = this.state;
    const { classes, selectMenuHandle } = this.props;
    return (
      <div>
        <div>
          {loading
            && <LinearProgress color="secondary" className={classes.preloader} />
          }
          <SearchIcons filterText={filterText} handleSearch={(event) => this.handleSearch(event)} />
          <div className={classes.iconsList}>
            {dataIcon.map((raw, index) => {
              if (raw.toLowerCase().indexOf(filterText) === -1) {
                return false;
              }
              return (
                <div className={classes.iconWrap} key={index.toString()}>
                  <IconButton title="Click to see detail" onClick={() => selectMenuHandle(raw)} className={classes.btn}>
                    <Ionicon icon={raw} />
                  </IconButton>
                  <Typography gutterBottom noWrap>{raw}</Typography>
                </div>
              );
            })}
            {/* <DetailIonIcon closeDetail={this.handleCloseDetail} isOpenDetail={openDetail} iconName={iconName} /> */}
          </div>
        </div>
      </div>
    );
  }
}

IonIcons.propTypes = {
  classes: PropTypes.object.isRequired,
  selectMenuHandle: PropTypes.func.isRequired,
};

export default withStyles(styles)(IonIcons);
