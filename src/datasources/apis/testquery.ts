import {gql} from '@apollo/client';
export const GET_SHIPS = gql`
query shipsquery {
  ships {
    id,
    name,
    active,
    imo,
    type,
  }
}`;

export const GET_LIMIT_SHIPS = gql`
query shipslimitquery($limit: Int) {
  ships(limit: $limit){
    id,
    name,
    active,
    imo,
    type
    roles
  }
}`;

export const GET_ROCKETS = gql`
query RocketsQuery {
  rockets {
    id
    name
    stages
    first_flight
    active
    engines {
      type
    }
  }
}`;