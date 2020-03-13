import React, { Fragment } from 'react';
import { Header, Card, Image, Label, Icon } from 'semantic-ui-react';

const UserPhotos = ({
  profile,
  photos,
  deletePhoto,
  setMainPhoto,
  loading,
}) => {
  let filterPhotos;
  if (photos) {
    filterPhotos = photos.filter(photo => photo.url !== profile.photoURL);
  }

  const xtraSmall = window.innerWidth <= 520;
  const small = window.innerWidth > 520 && window.innerWidth <= 991;

  return (
    <Fragment>
      <Header sub color="teal" content="All Photos" />
      <Card.Group itemsPerRow={xtraSmall ? 2 : small ? 3 : 4}>
        <Card>
          <Image
            // label={{ color: 'green', corner: 'right', icon: 'user plus' }}
            src={profile.photoURL || '/assets/user.png'}
          />
          <Label attached="bottom" color="green">
            <Icon name="user" />
            Main
          </Label>
        </Card>

        {photos.length > 0 &&
          filterPhotos.map(photo => (
            <Card key={photo.id}>
              <Image src={photo.url} />
              <Label
                onClick={() => setMainPhoto(photo)}
                attached="bottom left"
								color="green"
								// loading={loading}
              >
                <Icon name="user plus" />
              </Label>
              <Label
                onClick={() => deletePhoto(photo)}
                attached="bottom right"
                color="red"
              >
                <Icon name="trash" />
              </Label>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
};

export default UserPhotos;
