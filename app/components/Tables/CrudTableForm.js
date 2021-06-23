import React from 'react';
import PropTypes from 'prop-types';
import Form from './tableParts/Form';
import MainTableForm from './tableParts/MainTableForm';
import FloatingPanel from '../Panel/FloatingPanel';

class CrudTableForm extends React.Component {
  
  componentDidMount() {
  }

  sendValues = (values) => {
    const { submit, branch } = this.props;
    setTimeout(() => {
      submit(values, branch);
    }, 500);
  }

  render() {
    const {
      title,
      editTitle,
      dataTable,
      openForm,
      closeForm,
      removeRow,
      addNew,
      editRow,
      downloadRow,
      anchor,
      children,
      branch,
      initialValues,
      rowsPerPage,
      totalCount,
      backHome,
      page,
      handleChangePage,
      handleChangeRowsPerPage,
      readonly
    } = this.props;
    return (
      <div>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} title={editTitle}>
          <Form onSubmit={this.sendValues} branch={branch} initialValues={initialValues} isSubmit={addNew != null || !readonly}>
            {children}
          </Form>
        </FloatingPanel>
        <MainTableForm
          title={title}
          items={dataTable}
          addNew={addNew}
          editRow={editRow}
          removeRow={removeRow}
          downloadRow={downloadRow}
          anchor={anchor}
          branch={branch}
          backHome={backHome}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

CrudTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  editTitle: PropTypes.string,
  anchor: PropTypes.array.isRequired,
  // dataInit: PropTypes.array.isRequired,
  dataTable: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object.isRequired,
  branch: PropTypes.string.isRequired,
  addNew: PropTypes.func,
  editRow: PropTypes.func,
  removeRow: PropTypes.func,
  readonly: PropTypes.bool,
  //back
  backHome: PropTypes.func,
  //download
  downloadRow: PropTypes.func,
  //category(for treeTable)
  category:PropTypes.number,
  //pagination
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

CrudTableForm.defaultProps = {
  readonly: false
};


export default CrudTableForm;
