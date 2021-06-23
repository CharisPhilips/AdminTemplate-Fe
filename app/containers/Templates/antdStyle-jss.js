import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;

const styles = theme => ({

  hideApp: {
    display: 'none'
  },
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 45px)',
    left: 'calc(50% - 45px)',
  },
  trigger: {
    fontSize: 16,
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  triggerMobile: {
    fontSize: 16,
    cursor: 'pointer',
    transition: 'color 0.3s',
    width: 80
  },  
  triggerOpen: {
    padding: '0 24px',
  },
  triggerClose: {
    padding: '0 12px',
  },
  icon: {
    color: theme.palette.type === 'dark' ? `${fade(theme.palette.common.white, 0.8)}` : `${fade(theme.palette.text.primary, 0.8)}`,
  },
  actionIcon: {
    fontSize: 18,
    marginLeft: 25,
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  logo: {
    width: 200,
    height: 67,
    margin: 0,
    padding: 24,
    background: theme.palette.common.white,
    position: 'fixed',
    zIndex: 1,
  },
  logoClose: {
    width: 80,
    '& img': {
      display: 'none'
    }
  },
   
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  
  siteSideNavbarMobile: {
    marginTop: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100vh',
    textLayout: 'right',
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${theme.palette.common.white} !important`,
  },


  siteSidebar: {
    position: 'fixed',
    top: 0,
    height: '100vh',
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)}` : `${theme.palette.common.white}`,
  },

  siteSideNavbar: {
    marginTop: 67,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100vh',
    textLayout: 'right',
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${theme.palette.common.white} !important`,
  },

  siteSideNavbarMenu: {
    borderRight: theme.palette.type === 'dark' ? `1px solid ${fade(theme.palette.common.white, 0.1)}` : `1px solid ${fade(theme.palette.primary.main, 0.1)}`,
    borderBottom: theme.palette.type === 'dark' ? `1px solid ${fade(theme.palette.common.white, 0.1)}` : `1px solid ${fade(theme.palette.primary.main, 0.1)}`,
  },

  sidebarOpenLeft: {
    width: 200,
  },

  sidebarCloseLeft: {
    width: 80,
  },

  sidebarCloseLeftMobile: {
    width: 0,
  },

  sidebarOpenRight: {
    marginLeft: 201,
  },

  sidebarCloseRight: {
    marginLeft: 81,
  },

  siteLayout: {
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${fade(theme.palette.common.white, 0.95)} !important`,
  },

  siteHeader: {
    padding: 0,
    position: 'fixed',
    height: 67,
    zIndex: 2,
    width: '100%',
    borderBottom: theme.palette.type === 'dark' ? `1px solid ${fade(theme.palette.common.white, 0.1)}` : `1px solid ${fade(theme.palette.primary.main, 0.1)}`,
  },

  siteHeaderAction: {
    marginLeft: 30,
    display: 'inline-block',
  },

  siteHeaderActionMobile: {
    marginLeft: 0,
    display: 'inline-block',
  },

  siteSideMenu: {
    border: 0,
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${theme.palette.common.white} !important`,
    '& > .ant-menu-submenu-selected > .ant-menu-submenu-title': {
      color: theme.palette.primary.main
    },
    '& > .ant-menu-dark > .ant-menu-sub > .ant-menu-item-selected': {
      color: theme.palette.primary.main
    },
  },

  siteSubMenu: {
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${theme.palette.common.white} !important`,
    '&.ant-menu-item': {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    '&.ant-menu-item.ant-menu-item-selected': {
      color: theme.palette.primary.main,
      '&:after': {
        borderRight: `3px solid ${theme.palette.primary.main}`
      },
    },
    
    '&.ant-menu-submenu.ant-menu-submenu-horizontal.ant-menu-submenu-active': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    '&.ant-menu-submenu.ant-menu-submenu-horizontal.ant-menu-submenu-selected': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    '& > .ant-menu-sub': {
      background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${theme.palette.common.white} !important`
    },
    '&.ant-menu-item.ant-menu-item-selected .anticon': {
      color: theme.palette.primary.main
    },
    '&.ant-menu-item.ant-menu-item-selected .anticon + span': {
      color: theme.palette.primary.main
    },
    '&.ant-menu-submenu > .ant-menu-submenu-title > .ant-menu-submenu-arrow': {
      background: theme.palette.primary.main,
      '&:before': {
        color: theme.palette.primary.main,
        background: `-webkit-gradient(linear, left top, right top, from(${fade(theme.palette.text.primary, 0.6)}), to(${fade(theme.palette.text.primary, 0.8)}))`,
        background: `linear-gradient(to right, ${fade(theme.palette.text.primary, 0.6)}, ${fade(theme.palette.text.primary, 0.8)})`,
      },
      '&:after': {
        color: theme.palette.primary.main,
        background: `-webkit-gradient(linear, left top, right top, from(${fade(theme.palette.text.primary, 0.8)}), to(${fade(theme.palette.text.primary, 0.6)}))`,
        background: `linear-gradient(to right, ${fade(theme.palette.text.primary, 0.8)}, ${fade(theme.palette.text.primary, 0.6)})`,
      }
    },
    '&.ant-menu-submenu-active': {
      color: theme.palette.primary.main,
      '&.ant-menu-submenu-open': {
        color: theme.palette.primary.main,
      },
    },
    '& > .ant-menu-submenu-title:hover': {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.main,
      }
    },
  },

  siteTopMenu: {
    width: 'calc(100vw - 470px)',
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingTop: 6,
    height: 64,
    // width: 'calc(100% - 1000px)',
    display: 'inline-block',
    border: 0,
    float: 'right',
    marginRight: 225,
    background: theme.palette.type === 'dark' ? `${fade(theme.palette.background.paper, 1)} !important` : `${theme.palette.common.white} !important`,
    '& > .ant-menu-submenu-selected > .ant-menu-submenu-title': {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    '& > .ant-menu-item a:hover': {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    '& .ant-menu-item-selected.ant-menu-item': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  },

  siteContent: {
    marginTop: 67,
    marginRight: 60,
    marginBottom: 60,
    padding: 12,
    minHeight: 280,
  },

  siteContentMobile: {
    width: 'calc(100vw - 20px)',
    minHeight: 280,
    marginTop: 67,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 12,
  },

  siteContentMedium: {
    width: 'calc(100vw - 80px)',
    minHeight: 280,
    marginTop: 67,
    marginBottom: 10,
    marginRight: 10,
    padding: 12,
  }
});

export default styles;
