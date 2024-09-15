import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $lastName: String!, $email: String!, $password: String!, $phoneNumber: String, $role: Int) {
    addUser(name: $name, lastName: $lastName, email: $email, password: $password, phoneNumber: $phoneNumber, role: $role) {
      token
      user {
        _id
        name
        lastName
        email
        phoneNumber
        role
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;