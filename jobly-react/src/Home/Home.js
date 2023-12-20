import React, { useContext } from 'react';
import AuthContext from '../AuthContext';
import { HomeHeading, HomeSubHeading } from '../Common/Type';
import { Button } from '../Common/Button';
import { HomeDiv, Div } from '../Common/Div';
import heroImg from '../Common/home_hero_img.svg';
import { Image } from '../Common/Image';
import { useHistory } from 'react-router-dom';

// Homepage Component
function Home() {

  const { userInfo } = useContext(AuthContext);
  const history = useHistory();

  const buttonHref = userInfo ? '/companies' : '/login';

  return (
    <HomeDiv display="flex">
      <Div margin="0 0 1rem">
        <Image src={heroImg} size="200"/>
      </Div>
      <Div margin="1rem">
        {userInfo &&
          <HomeSubHeading>
            Welcome back, {userInfo.first_name}.
          </HomeSubHeading>
        }
        <HomeHeading>Apply to the best jobs with Jobly</HomeHeading>
        <HomeSubHeading>
          Find and apply privately with one-click applications.
          See salary and equity upfront.
        </HomeSubHeading>
        <Button type='button' solid onClick={() => history.push(buttonHref)} >Find Jobs Now</Button>
      </Div>
    </HomeDiv>
  );
}

export default Home;