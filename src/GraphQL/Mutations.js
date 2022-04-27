import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
    ) {
      id
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
    ) {
      id
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// mutation deleteUser(
//   $id : Int!
// ) {
//   deleteUser(
//     id: $id
//   ) {
//     id
//   }
// }
