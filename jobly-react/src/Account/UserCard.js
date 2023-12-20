import React from 'react';
import { Card } from '../Common/Card';
import { Image } from '../Common/Image';
import { Heading, LightMiceType } from '../Common/Type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Div } from '../Common/Div';

function UserCard({ userInfo }) {

  const DEFAULT_AVATAR = 'https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png'

  const { username, first_name, last_name, email, photo_url } = userInfo;

  // display frist and last name if available, otherwise use username
  const userHeading = first_name && last_name
    ? `${first_name} ${last_name}`
    : username;

  return (
    <Card transparent>
        <Image src={photo_url || DEFAULT_AVATAR} size="48" />
      <Div margin="0 0 0 1rem">
        <Heading>{userHeading}</Heading>
        <LightMiceType><FontAwesomeIcon icon={faEnvelope} /> {email}</LightMiceType>
      </Div>
    </Card>
  )
}

export default UserCard;