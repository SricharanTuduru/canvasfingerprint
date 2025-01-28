import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";

const CanvasFingerprint = () => {
  const [hash, setHash] = useState<string>("");

  const generateFingerprint = () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const dpr = window.devicePixelRatio || 1;
        const width = 200;
        const height = 50;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`; 
        canvas.style.height = `${height}px`; 

        ctx.scale(dpr, dpr);

        ctx.textBaseline = "top";
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Canvas Fingerprint", 10, 10);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 30, 100, 20);

        const data = canvas.toDataURL();

        const hash = sha256(data).toString();
        setHash(hash); // Store the hash in state
      }
    } catch (error) {
      console.error("Error generating canvas fingerprint:", error);
    }
  };

  useEffect(() => {
    generateFingerprint();
  }, []);

  return (
    <div>
      <div>Canvas Fingerprint Hash:</div>
      <div>{hash || "Generating..."}</div> 
    </div>
  );
};

export default CanvasFingerprint;



// import React, { useEffect, useRef } from "react";
// import sha256 from 'crypto-js/sha256';

// const CanvasFingerprint = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const generateFingerprint = () => {
//     try {
//       const canvas = canvasRef.current;
//       if (canvas) {
//         const ctx = canvas.getContext("2d");

//         if (ctx) {
//           const dpr = window.devicePixelRatio || 1;
//           const width = 200;
//           const height = 50;

//           canvas.width = width * dpr;
//           canvas.height = height * dpr;
//           canvas.style.width = `${width}px`; 
//           canvas.style.height = `${height}px`; 

//           ctx.scale(dpr, dpr);

//           ctx.textBaseline = "top";
//           ctx.font = "16px Arial";
//           ctx.fillStyle = "black";
//           ctx.fillText("Canvas Fingerprint", 10, 10);

//           ctx.strokeStyle = "red";
//           ctx.lineWidth = 2;
//           ctx.strokeRect(10, 30, 100, 20);

//           const data = canvas.toDataURL();

//           const hash = sha256(data).toString();

//           console.log("Canvas Fingerprint Hash:", hash);
//         }
//       }
//     } catch (error) {
//       console.error("Error generating canvas fingerprint:", error);
//     }
//   };

//   useEffect(() => {
//     generateFingerprint();
//   }, []);

//   return (
//     <div>
//       <div>Canvas Fingerprint is being generated...</div>
//       <canvas ref={canvasRef}></canvas>
//     </div>
//   );
// };

// export default CanvasFingerprint;
