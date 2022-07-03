/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Header } from '@components';
import { IPlaces } from '@interfaces';
import { Lang } from '@lang';
import { AppRoutes } from '@routes';
import { PlacesServices } from '@services';
import { PLACES } from '@settings';
import { sectionOne, sectionTwo, sectionThree } from './sections';

export default function Dashboards() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [places, setPlaces] = useState<IPlaces[]>();
  const [selectedPlace, setSelectedPlace] = useState({} as IPlaces);

  async function getPlace(placeid: string) {
    try {
      const place = (await PlacesServices.getOne({ id: placeid })) as IPlaces;
      setSelectedPlace(place);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPlaces() {
    try {
      const dataPlaces = (await PlacesServices.getAll()) as IPlaces[];
      const data = dataPlaces.filter((p) => p.active === true);
      setPlaces(data);
      setSelectedPlace({} as IPlaces);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (id) getPlace(id);
    else getPlaces();
  }, [id]);

  const selectPlaces = () => (
    <select
      id="places"
      data-testid="places"
      className="rounded-md focus:ring-0 text-gray-900 focus:ring-primary-500/75 border-gray-300"
      onChange={(e) => {
        if (e.target.value) {
          history.push(`${AppRoutes.DashboardsPlaces}/${e.target.value}`);
        } else {
          history.push(AppRoutes.Dashboards);
        }
      }}
    >
      {places && places.length > 1 ? (
        <>
          <option value="">{Lang.Layout.All}</option>
          {places.map((place, i) => (
            <option key={i} value={place.id}>
              {place.name}
            </option>
          ))}
        </>
      ) : (
        places && places[0]?.name && <option value="">{places[0].name}</option>
      )}
    </select>
  );

  return (places && places?.length > 0) || selectedPlace ? (
    <div className="mb-10 container mx-auto">
      <Header
        before={['Dashboards']}
        main={selectedPlace.name ? `${selectedPlace.name}` : PLACES.PLURAL}
        select={places && places.length > 1 ? selectPlaces : undefined}
      />

      <div className="p-4 flex flex-col space-y-4">
        {sectionOne()}
        {sectionTwo(selectedPlace)}
        {sectionThree()}
      </div>
    </div>
  ) : (
    <div />
  );
}
