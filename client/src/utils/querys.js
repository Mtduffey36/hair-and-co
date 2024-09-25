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
export const GET_STYLIST_APPOINTMENTS_BY_EMAIL = gql`
  query StylistAppointmentsByEmail($email: String!) {
    stylistAppointmentsByEmail(email: $email) {
      email
      firstName
      lastName
      notes
      date
      time
      service {
        name
        duration
        price
      }
      stylist {
        name
        email
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

export const GET_USER_APPOINTMENTS = gql`
  query GetUserAppointments($email: String!) {
    userAppointments(email: $email) {
      _id
      date
      time
      stylist {
        name
      }
      service {
        name
        price
        duration
      }
      email
    }
  }
`;