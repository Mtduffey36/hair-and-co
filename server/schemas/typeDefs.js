const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    phoneNumber: String
    role: Int
    createdAt: String
  }

  type Service {
    _id: ID
    name: String
    description: String
    price: Float
    duration: Int
  }

  type Stylist {
    _id: ID
    user: User
    specialties: [String]
    experience: String
    rating: Float
  }

  type Appointment {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    stylist: Stylist
    service: Service
    date: String
    time: String
    status: String
    notes: String
  }

  type Review {
    _id: ID
    customer: User
    stylist: Stylist
    appointment: Appointment
    calification: Int
    comment: String
    date: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    services: [Service]
    service(serviceId: ID!): Service
    stylists: [Stylist]
    stylist(stylistId: ID!): Stylist
    stylistAppointments(stylistId: ID!, date: String!): [Appointment]
    appointments: [Appointment]
    appointment(appointmentId: ID!): Appointment
    reviews: [Review]
    review(reviewId: ID!): Review
  }

 

  type Mutation {
    addUser(name: String!, lastName: String!, email: String!, password: String!, phoneNumber: String, role: Int): Auth
    login(email: String!, password: String!): Auth
    addService(name: String!, description: String!, price: Float!, duration: Int!): Service
    updateService(serviceId: ID!, name: String, description: String, price: Float, duration: Int): Service
    deleteService(serviceId: ID!): Service
    addStylist(userId: ID!, specialties: [String], experience: String): Stylist
    addAppointment(firstName: String!, lastName: String!, email: String!, phoneNumber: String!, stylistId: ID!, serviceId: ID!, date: String!, time: String!, notes: String): Appointment
    updateAppointmentStatus(appointmentId: ID!, status: String!): Appointment
    addReview(customerId: ID!, stylistId: ID!, appointmentId: ID!, calification: Int!, comment: String): Review
  }
`;

module.exports = typeDefs;