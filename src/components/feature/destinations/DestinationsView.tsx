'use client';

import React from 'react';

import { Destination } from '@/config/types/destination.type';

interface Props {
  data: Destination;
}

const DestinationsView = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="">
        <h5 className="text-16 text-heading">Name</h5>
        <p className="text-14 text-pgr">{data.name}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Country</h5>
        <p className="text-14 text-pgr">{data.country}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Language</h5>
        <p className="text-14 text-pgr">{data.language}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Price</h5>
        <p className="text-14 text-pgr">{data.price}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Currency</h5>
        <p className="text-14 text-pgr">{data.currency}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Area</h5>
        <p className="text-14 text-pgr">{data.area}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Location</h5>
        <p className="text-14 text-pgr">{data.location}</p>
      </div>
      <div className="">
        <h5 className="text-16 text-heading">Visa Require</h5>
        <p className="text-14 text-pgr">{data.visa_require}</p>
      </div>
      <div className="col-span-2">
        <h5 className="text-16 text-heading">Description</h5>
        <p className="text-14 text-pgr">{data.description}</p>
      </div>
    </div>
  );
};

export default DestinationsView;
