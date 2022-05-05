import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../../GraphQL/Queries";
import { Table, Button, Popconfirm, Modal } from "antd";
import Input from "../../stories/input/input";
import { useMutation } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from "../../GraphQL/Mutations";
import checkValidations, {
  emailValidation,
  reqiredValidation,
} from "../../utils/validator";
import { connect } from "react-redux";
import userDataAction from "../../redux/user/actions";
import ShowCount from "../showCount";

const StudentTable = (props) => {
  const { loading, data, refetch: userDataRefetch } = useQuery(LOAD_USERS);
  // const [users, setUsers] = useState([]);

  let { userData = [] } = props;

  const [CreateModalPopup, setCreateModalPopup] = useState(false);
  const [EditModalPopup, setEditModalPopup] = useState(false);
  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const [SelectedData, setSelectedData] = useState({});

  const [FirstName, setFirstName] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [LastName, setLastName] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [Email, setEmail] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [Address, setAddress] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });

  let reset = { error: false, errorMessage: "" };

  const showModal = () => {
    setCreateModalPopup(true);
  };

  const resetFormStates = () => {
    setFirstName((i) => ({ ...i, value: "", ...reset }));
    setLastName((i) => ({ ...i, value: "", ...reset }));
    setEmail((i) => ({ ...i, value: "", ...reset }));
    setAddress((i) => ({ ...i, value: "", ...reset }));
  };

  const handleOk = () => {
    if (
      checkValidations([
        reqiredValidation(FirstName, setFirstName),
        reqiredValidation(LastName, setLastName),
        emailValidation(Email, setEmail),
      ])
    ) {
      createUser({
        variables: {
          firstName: FirstName.value,
          lastName: LastName.value,
          email: Email.value,
          address: Address.value,
        },
      });
      if (error) {
        console.log(error);
      }
      setCreateModalPopup(false);
      userDataRefetch();
      resetFormStates();
    }
  };

  const HandleEditData = () => {
    if (
      checkValidations([
        reqiredValidation(FirstName, setFirstName),
        reqiredValidation(LastName, setLastName),
        emailValidation(Email, setEmail),
      ])
    ) {
      updateUser({
        variables: {
          id: SelectedData.id,
          firstName: FirstName.value,
          lastName: LastName.value,
          email: Email.value,
          address: Address.value,
        },
      });
      if (error) {
        console.log(error);
      }
      setEditModalPopup(false);
      userDataRefetch();
      resetFormStates();
    }
  };

  const handleCancel = () => {
    setCreateModalPopup(false);
    resetFormStates();
  };

  const handleCancelEdit = () => {
    setEditModalPopup(false);
    resetFormStates();
  };

  const confirm = (props) => {
    deleteUser({
      variables: {
        id: props.id,
      },
    });
    userDataRefetch();
  };

  const onClickEdit = (row) => {
    setEditModalPopup(true);
    setSelectedData(row);
    setFirstName((i) => ({ ...i, value: row.firstName, ...reset }));
    setLastName((i) => ({ ...i, value: row.lastName, ...reset }));
    setEmail((i) => ({ ...i, value: row.email, ...reset }));
    setAddress((i) => ({ ...i, value: row.address, ...reset }));
  };

  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email Id", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (row) => (
        <>
          <Button type="primary" onClick={() => onClickEdit(row)}>
            Edit
          </Button>
          <span style={{ marginLeft: "1rem" }}>
            <Popconfirm
              title="Are you sure to delete this?"
              onConfirm={() => confirm(row)}
              //   onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
            {/* <a>Delete</a> */}
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      props.dispatch(userDataAction(data.getAllStudents));
    }
  }, [data]);

  const handleFormChange = (event) => {
    let { name, value } = event.target;
    switch (name) {
      case "FirstName":
        return setFirstName((i) => ({ ...i, value, ...reset }));
      case "LastName":
        return setLastName((i) => ({ ...i, value, ...reset }));
      case "Email":
        return setEmail((i) => ({ ...i, value, ...reset }));
      case "Address":
        return setAddress((i) => ({ ...i, value, ...reset }));
      default:
        break;
    }
  };

  return (
    <div className="student-table-container">
      <div className="table-header">
        <h1>Student Data</h1>
        {/* <Button type="primary" data-testid='add-new-button' onClick={showModal}>
          + Add New
        </Button> */}
        <button data-testid='add-new-button' className="ant-btn ant-btn-primary" onClick={showModal}>
          + Add New
        </button>
      </div>
      <ShowCount
        count={!!userData && userData.length ? userData.length : 0}
      />
      <Modal
        title="Add student"
        visible={CreateModalPopup}
        onOk={handleOk}
        okText="Create"
        onCancel={handleCancel}
      >
        <Input
          onChange={handleFormChange}
          label={"First Name"}
          placeholder="Enter First Name"
          name={"FirstName"}
          value={FirstName.value}
          error={FirstName.error}
          errorMessage={FirstName.errorMessage}
        />
        <Input
          onChange={handleFormChange}
          label={"Last Name"}
          placeholder="Enter Last Name"
          name={"LastName"}
          value={LastName.value}
          error={LastName.error}
          errorMessage={LastName.errorMessage}
        />
        <Input
          onChange={handleFormChange}
          label={"Email"}
          placeholder="Enter Email"
          name={"Email"}
          value={Email.value}
          error={Email.error}
          errorMessage={Email.errorMessage}
        />
        <Input
          onChange={handleFormChange}
          label={"Address"}
          placeholder="Enter Address"
          name={"Address"}
          value={Address.value}
          error={Address.error}
          errorMessage={Address.errorMessage}
        />
      </Modal>
      <Modal
        title="Edit student"
        visible={EditModalPopup}
        onOk={HandleEditData}
        okText="Save"
        onCancel={handleCancelEdit}
      >
        <Input
          onChange={handleFormChange}
          label={"First Name"}
          placeholder="Enter First Name"
          name={"FirstName"}
          value={FirstName.value}
          error={FirstName.error}
          errorMessage={FirstName.errorMessage}
        />
        <Input
          onChange={handleFormChange}
          label={"Last Name"}
          placeholder="Enter Last Name"
          name={"LastName"}
          value={LastName.value}
          error={LastName.error}
          errorMessage={LastName.errorMessage}
        />
        <Input
          onChange={handleFormChange}
          label={"Email"}
          placeholder="Enter Email"
          name={"Email"}
          value={Email.value}
          error={Email.error}
          errorMessage={Email.errorMessage}
        />
        <Input
          onChange={handleFormChange}
          label={"Address"}
          placeholder="Enter Address"
          name={"Address"}
          value={Address.value}
          error={Address.error}
          errorMessage={Address.errorMessage}
        />
      </Modal>
      {!!userData && userData.length ? (
        <Table
          columns={columns}
          key={"id"}
          rowKey="id"
          dataSource={userData}
          bordered
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(StudentTable);
