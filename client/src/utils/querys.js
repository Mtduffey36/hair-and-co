import { gql } from '@apollo/client';

// Get Services query
export const GET_SERVICES = gql`
  query getServices {
    services {
      _id
      name
      description
      price
      duration
    }
  }
`;

// Get Stylists query
export const GET_STYLISTS = gql`
  query getStylists {
    stylists {
      _id
      name
      lastName
      email
      createdAt
      phoneNumber
    }
  }
`;
//Get stylist appointments
export const GET_STYLIST_APPOINTMENTS = gql`
query StylistAppointments($stylistId: ID!, $date: String!) {
  stylistAppointments(stylistId: $stylistId, date: $date) {
    _id
    date
    time
    service {
      _id
      name
      duration
    }
  }
}
`;
//Get users
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      email
      isDefaultPassword
      isStylist
      lastName
      name
      phoneNumber
    }
  }
`;