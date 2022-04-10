import React from 'react';
import styles from './QuickStats.module.scss';
import { ShadowContainer } from 'Components';
import DashboardItem from '../DashboardItem/DashboardItem';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import useWindowDimensions from 'Utils/Resize';
import 'swiper/swiper.scss';

const QuickStats: React.FC = () => {
  const { DashboardContainer, mySlider, sliderSlide } = styles;
  const { width } = useWindowDimensions();
  return (
    <div className={DashboardContainer}>
      <Swiper slidesPerView={width < 1200 ? 2 : 5} spaceBetween={25} className={mySlider}>
        <SwiperSlide className={sliderSlide}>
          <ShadowContainer size="large">
            <DashboardItem current name="Today"></DashboardItem>
          </ShadowContainer>
        </SwiperSlide>
        <SwiperSlide className={sliderSlide}>
          <ShadowContainer size="large">
            <DashboardItem current={false} name="Yesterday"></DashboardItem>
          </ShadowContainer>{' '}
        </SwiperSlide>
        <SwiperSlide className={sliderSlide}>
          <ShadowContainer size="large">
            <DashboardItem current={false} name="last week"></DashboardItem>
          </ShadowContainer>{' '}
        </SwiperSlide>
        <SwiperSlide className={sliderSlide}>
          {' '}
          <ShadowContainer size="large">
            <DashboardItem current={false} name="last month"></DashboardItem>
          </ShadowContainer>{' '}
        </SwiperSlide>
        <SwiperSlide className={sliderSlide}>
          <ShadowContainer size="large">
            <DashboardItem current={false} name="last 90-days"></DashboardItem>
          </ShadowContainer>{' '}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default QuickStats;
