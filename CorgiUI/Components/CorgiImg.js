"use client"
import React, { useEffect, useState,forwardRef,useRef } from "react";
import { motion } from "framer-motion";

/**
 * Custom animated div component with additional motion features.
 *
 * @component
 * @param {Array} props.motions - An array of motion objects.
 * @returns {JSX.Element}
 */

const CorgiImg = forwardRef((props, ref) => {

    const [currentMotions, setCurrentMotions] = useState([]);


    const corgiref = useRef(null); // 조건부로 useRef를 사용

    useEffect(() => {
     

      props.motions.forEach((motionset) => {
        const input = motionset.input;
        const motion = motionset.motion;
        const condition = motionset.condition
  
        const handleMotion = (event) => {
          if(condition == null || (condition(event.detail.state,event.detail.value))){
          setCurrentMotions((prevState) => {
            const updatedMotions = [...prevState, motion.handleMotion(event.detail.state)];
            return updatedMotions;
          });
        }
        };


        if(motion.linkRef != null) {motion.linkRef(corgiref);}
       
        if (input != null) {
           if(input.linkRef != null) {input.linkRef(corgiref);}
          input.eventTarget.addEventListener(input.eventname, handleMotion);
        }
        
        //input이 없을때 -> 즉시실행 
        else if (input == false) {
          setCurrentMotions((prevState) => {
            const updatedMotions = [...prevState, motion.handleMotion(1)];
            return updatedMotions;
          });
        }
      });
    }, []);
  
    // JSX를 반환하는 함수를 정의합니다.
    const renderMotionDiv = () => {
      const valuelist = {};
      const transitionlist = {};
  
      currentMotions.forEach((motionset) => {
        Object.keys(motionset).forEach((key) => {
          if (key !== "transition") {
            valuelist[key] = motionset[key];
            transitionlist[key] = motionset["transition"];
          }
        });
      });
  
      // "motion.div"의 속성으로 valuelist와 transitionlist를 사용합니다.
      return (
        <motion.img
        {...props}
        ref = {corgiref}
          animate={Object.keys(valuelist).length === 0 ? {} : valuelist}
          transition={Object.keys(transitionlist).length === 0 ? {} : transitionlist}
        >
        </motion.img>
      );
    };


  return <>{renderMotionDiv()}</>;
});

CorgiImg.displayName = "CorgiImg"; // displayName 설정

export default CorgiImg;
