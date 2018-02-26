import moment from 'moment';

export const ObjectList = [
  {
    id: 0,
    name: "ABCD Magazine's Restaurants Event",
    subtitle: "national Arts Centre, Ottawa",
    date: moment().format('YYYY-MM-DD'),
    photo: 'assets/img/faces/face-0.jpg',
    places: { lat: 45.444424, lng: -75.722101},
    
  },
  {
    id: 1,
    name: "Ottawa Magazine's Restaurants Event",
    subtitle: "national Arts Centre, Ottawa",
    date: moment().subtract(1, "days").format('YYYY-MM-DD'),
    photo: 'assets/img/faces/face-0.jpg',
    places: { lat: 45.43224, lng: -75.4322101},
  },
  {
    id: 2,
    name: "EFGH Magazine's Restaurants Event",
    subtitle: "national Arts Centre, Ottawa",
    date: moment().subtract(2, "days").format('YYYY-MM-DD'),
    photo: 'assets/img/faces/face-0.jpg',
    places: { lat: 45.34324, lng: -75.2652101},
  },
  {
    id: 3,
    name: "IJKL Magazine's Restaurants Event",
    subtitle: "national Arts Centre, Ottawa",
    date: moment().subtract(3, "days").format('YYYY-MM-DD'),
    photo: 'assets/img/faces/face-0.jpg',
    places: { lat: 45.13324, lng: -76.123101},
  }];