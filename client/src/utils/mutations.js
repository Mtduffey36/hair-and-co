import { gql } from '@apollo/client';

// Signup mutation
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

//Login mutation
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
//Add appointment mutation
export const ADD_APPOINTMENT = gql`
  mutation AddAppointment($firstName: String!, $lastName: String!, $email: String!, $phoneNumber: String!, $stylistId: ID!, $serviceId: ID!, $date: String!, $time: String!, $notes: String) {
    addAppointment(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, stylistId: $stylistId, serviceId: $serviceId, date: $date, time: $time, notes: $notes) {
      _id
      firstName
      lastName
      email
      phoneNumber
      stylist {
        _id
        user {
          name
        }
      }
      service {
        _id
        name
      }
      date
      time
      notes
    }
  }
`;


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
      user {
        _id
        name
        lastName
      }
      specialties
      experience
      rating
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