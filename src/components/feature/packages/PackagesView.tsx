import React from 'react';

import { Package } from '@/config/types/package.type';

import { Badge, Image } from '@mantine/core';

interface Props {
  data: Package;
}

const PackagesView = ({ data }: Props) => {
  return (
    <div>
      <div className="flex mb-3">
        <Image alt={data.name} src={data.img_url} width={200} height={120} withPlaceholder />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <div className="flex flex-wrap gap-3 mt-3">
            {data.types?.map((t) => {
              return (
                <Badge key={t.id} color="teal">
                  {t.name}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="">
          <h5 className="text-16 text-heading">Name</h5>
          <p className="text-14 text-pgr">{data.name}</p>
        </div>

        <div className="">
          <h5 className="text-16 text-heading">Duration</h5>
          <p className="text-14 text-pgr">{data.duration}</p>
        </div>

        <div className="">
          <h5 className="text-16 text-heading">Price</h5>
          <p className="text-14 text-pgr">{data.price}</p>
        </div>

        <div className="">
          <h5 className="text-16 text-heading">Number of people</h5>
          <p className="text-14 text-pgr">{data.number_people}</p>
        </div>

        <div className="col-span-2">
          <h5 className="text-16 text-heading">Details</h5>
          <p className="text-14 text-pgr">{data.details}</p>
        </div>
      </div>
    </div>
  );
};

export default PackagesView;
