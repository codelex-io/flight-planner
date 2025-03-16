export class Airport {
  id: string;
  country: string;
  city: string;
  airport: string;

  constructor(id: string, country: string, city: string, airport: string) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.airport = airport;
  }
}
