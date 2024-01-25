"use client"

import  { useState, useEffect, useRef } from 'react'
import { gsap } from "gsap";
import {AnimatePresence, motion} from "framer-motion"
import Image from 'next/image'

// const anim = {
//     initial: {
//         opacity: 0
//     },
//     open: (delay) => ({
//         opacity: 1,
//         transition: {duration: 1, delay: 0.02 * delay[0]}
//     }),
//     closed: (delay) => ({
//         opacity: 0,
//         transition: {duration: 1, delay: 0.02 * delay[1]}
//     })
// }

// export const PixelBackground = () => {



//       /**
//      * Shuffles array in place (Fisher–Yates shuffle).
//      * @param {Array} a items An array containing the items.
//      */
//     const shuffle = (a) => {
//         var j, x, i;
//         for (i = a.length - 1; i > 0; i--) {
//             j = Math.floor(Math.random() * (i + 1));
//             x = a[i];
//             a[i] = a[j];
//             a[j] = x;
//         }
//         return a;
//     }

// const getBlocks = (indexOfColum) => {
//         const { innerWidth, innerHeight } = window;
//         const blockSize = innerWidth * 0.05;
//         const nbOfBlocks = Math.ceil(innerHeight / blockSize);
//         const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map( (_, i) => i))
//         return shuffledIndexes.map( (randomIndex, index) => {
//             return (
//                 <motion.div 
//                     key={index} 
//                     className="pixel-block"
//                     variants={anim}
//                     initial="initial"
//                     animate={isLoading ? "open" : "closed"}
//                     custom={[indexOfColum + randomIndex, (20 - indexOfColum + randomIndex)]}
//                 />
//             )
//         })
//     }

//     const [isLoading, setIsLoading] = useState(true);
//       useEffect(() => {
//       setTimeout(() => {
//       setIsLoading(false);
    
//       window.scrollTo(0, 0);
//     }, 1000);
//     return () => clearTimeout();
//   }, [])

//   return (
//     <AnimatePresence mood="wait">
//       {isLoading && (
//         <div className="pixelBackground">
//             {
//                 [...Array(20)].map( (_, index) => {
//                     return <div key={index} className="pixel-column">
//                         {
//                             getBlocks(index)
//                         }
//                     </div>
//                 })
//             }
//         </div>
//       )
//       }
//     </AnimatePresence>

//     )
// };


export const PixelBackground = () => {

  // const conter= useRef(null);
 useEffect(() => {
  function preLoader() {
    // Correct the class name to "counter-3"
    const counter3 = document.querySelector(".counter-3");
    
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }
        const finalDiv = document.createElement("div");
      finalDiv.className =" num";
      finalDiv.textContent = 0;
      counter3.appendChild(finalDiv)
    // Correct the class name to "counter-3"
    function animate(counter, duration, delay = 0) {
      // Correct the method to query all elements with the class ".num"
      const numElements = counter.querySelectorAll(".num");
      const numHeight = numElements[0].offsetHeight; // Use offsetHeight to get the height

      const totalDistance = (numElements.length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration, // Correct the property name
        delay: delay,
        ease: "power2.inOut"
      });
    }
    animate(counter3, 5);
    animate(document.querySelector('.counter-2'), 6);
    animate(document.querySelector('.counter-1'), 2, 4);

        //To make the digits disappear from screen
    gsap.to('.digit', {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });

  }
  
  // loading bar 

  gsap.to(".hero-text", 1.5,{
    delay: 6.9,
    y: -50,
    ease: "power4.inOut",
    stagger: {
      amount: 0.1,
    }
  })
  gsap.to(".image-container", 1.5,{
    delay: 6.9,
    y: -10,
    ease: "power4.inOut",
    stagger: {
      amount: 0.1,
    }
  })

  gsap.to(".hero-title", 1.5,{
    delay: 7,
    y: -20,
    ease: "power4.inOut",
    stagger: {
      amount: 0.1,
    }
  })
  gsap.to(".hero-cta", 1.5,{
    delay: 7.2,
    y: -10,
    ease: "power4.inOut",
    stagger: {
      amount: 0.1,
    }
  })


  preLoader();
}, []); 


  return (
<AnimatePresence mood="wait">
          <motion.div
            className='slide-in'
            initial={{top: 0}}
            animate={{top: "-100%"}}
            exit={{top: 0}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 6.7}}
            key='slide-in'
          >
            <div className="loader-logo">
             <Image 
              src="/logo.png"
              alt='logo'
              height={50}
              width={50}
             />
            </div>
        <div className="counter">
          <div className="counter-1 digit">
            <div className="num">0</div>
            <div className="num num1offset1">1</div>
          </div>
          <div className="counter-2 digit">
            <div className="num">0</div>
            <div className="num num1offset2">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="counter-3 digit">
            <div className="num">0</div>
            <div className="num">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
          </div>
        {/* </div> */}
       </div>
          </motion.div>
       </AnimatePresence>
  )
}




