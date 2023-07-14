export type Destination = {
  id: number;
  name: string;
  description: string;
  price: number;
  country: string;
  visa_require: string;
  language: string;
  currency: string;
  area: string;
  location: string;
};

export type DestinationForm = Omit<Destination, 'id'>;

export type DestinationUpdate = Partial<Destination>;
