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
        role
      }
    }
  }
`;
//Add appointment 
export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $firstName: String!, 
    $lastName: String!, 
    $email: String!, 
    $phoneNumber: String!, 
    $stylistId: ID!, 
    $serviceId: ID!, 
    $date: String!, 
    $time: String!, 
    $notes: String
  ) {
    addAppointment(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      phoneNumber: $phoneNumber, 
      stylistId: $stylistId, 
      serviceId: $serviceId, 
      date: $date, 
      time: $time, 
      notes: $notes
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
      stylist {
        _id
        name
        lastName
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

// Add Service 
export const ADD_SERVICE = gql`
 mutation AddService($name: String!, $description: String!, $price: Float!, $duration: Int!) {
    addService(name: $name, description: $description, price: $price, duration: $duration) {
      name
      price
      duration
      description
    }
  }
`;

//Add Stylist
export const ADD_STYLIST = gql`
mutation AddStylist($name: String!, $lastName: String!, $email: String!, $phoneNumber: String!) {
  addStylist(name: $name, lastName: $lastName, email: $email, phoneNumber: $phoneNumber) {
    name
    lastName
    email
    phoneNumber
  }
}
`;


// Delete Service 
export const DELETE_SERVICE = gql`
  mutation DeleteService($serviceId: ID!) {
    deleteService(serviceId: $serviceId) {
      _id
    }
  }
`;


//Delete Stylist
export const DELETE_STYLIST = gql`
mutation DeleteStylist($stylistId: ID!) {
  deleteStylist(stylistId: $stylistId) {
    _id
  }
}
`
export const UPDATE_STYLIST_PASSWORD = gql`
  mutation UpdateStylistPassword($email: String!, $password: String!) {
    updateStylistPassword(email: $email, password: $password) {
      token
      stylist {
        _id
        email
        isDefaultPassword
      }
    }
  }
`;
