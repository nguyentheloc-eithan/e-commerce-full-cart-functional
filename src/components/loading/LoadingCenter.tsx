'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Spin } from 'antd';
const LoadingCenter = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full bg-[#fff] p-8">
      <div className="overflow-auto h-full">
        <div className="flex justify-center items-center h-full w-full">
          <motion.div
            className="box"
            animate={{
              // scale: [1, 2, 2, 1, 1],
              // rotate: [0, 0, 180, 180, 0],
              opacity: [0.5, 1, 1, 0.5, 0.5],
              // borderRadius: ['0%', '0%', '50%', '50%', '0%'],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              // times: [0, 0.2, 1, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}>
            <Spin size="large" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCenter;
