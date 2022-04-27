import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getAllStudents {
      id
      firstName
      lastName
      email
      address
    }
  }
`;
