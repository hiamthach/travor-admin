'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import galleriesApi from '@/config/api/gallery.api';
import { Destination } from '@/config/types/destination.type';

import { Image } from '@mantine/core';

const { getGalleries } = galleriesApi;

interface Props {
  data: Destination;
}

const DestinationsView = ({ data }: Props) => {
  const { data: gallery } = useQuery(['galleries', data.id], async () => {
    return getGalleries(data.id);
  });

  console.log(gallery);

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

      {gallery && gallery.images && (
        <div className="col-span-2">
          <h5 className="text-16 text-heading">Images</h5>

          <div className="flex flex-wrap gap-3 mt-3">
            {gallery.images.map((image) => {
              return (
                <div key={image.id}>
                  <Image withPlaceholder width={200} height={120} src={image.url} alt={image.url} radius={10} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsView;
