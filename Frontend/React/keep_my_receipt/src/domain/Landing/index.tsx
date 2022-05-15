import React, { useEffect, useState } from 'react';

import Navigation from '../../header';
import Banner from './Landing/Banner';
import GuideFirst from './Landing/Guide-1';
import GuideSecond from './Landing/Guide-2';
import GuideThird from './Landing/Guide-3';
import GuideFourthFirst from './Landing/Guide-4-1';
import GuideFourthSecond from './Landing/Guide-4-2';
function Landing() {
  //로그인한 상태라면 navbar 보여주기
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div>
      {isLogin ? <Navigation /> : ''}
      <Banner />
      <GuideFirst />
      <GuideSecond />
      <GuideThird />
      <GuideFourthFirst />
      <GuideFourthSecond />
    </div>
  );
}

export default Landing;
