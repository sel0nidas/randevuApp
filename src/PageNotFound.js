import React from "react";
import "./index.css"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function PageNotFound() {
    const navigate = useNavigate();

    function functionalityOfCanvas() {
        const canvas = document.getElementById('canv');
        const ctx = canvas.getContext('2d');

        const w = canvas.width = document.body.offsetWidth;
        const h = canvas.height = document.body.offsetHeight;
        const cols = Math.floor(w / 20) + 1;
        const ypos = Array(cols).fill(0);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        function matrix () {
          ctx.fillStyle = '#0001';
          ctx.fillRect(0, 0, w, h);
        
          ctx.fillStyle = '#0f0';
          ctx.font = '15pt monospace';
        
          ypos.forEach((y, ind) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = ind * 20;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
            else ypos[ind] = y + 20;
          });
        }

        setInterval(matrix, 50);
    }
    return (
        <div className="w-100 h-100 !bg-white">
         <div className="rounded-full !bg-white w-76 h-100">   
         {<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
    <mask id="myMask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
      <rect x="0" y="0" width="1" height="1" fill="white" />
      <circle cx="0.5" cy="0.5" r="0.4" fill="black" />
    </mask>
  </svg>}
        <canvas id="canv" className="h-76 w-76" style={{zIndex: "-1", mask: "url(#myMask)"}}>
            {
            setTimeout(() => {
                {functionalityOfCanvas()}
            }, 100)
            }
        </canvas>
        <div className="h-76 w-56 bg-matrix absolute ml-24 top-20 bottom-20 my-20 border-7 border-white rounded-full z-50"></div>
        <div className="h-76 w-56 bg-matrix absolute mr-24 top-20 bottom-20 my-20 right-20 rounded-full z-50"></div>
        <div className="w-100 bg-opacity-60 bg-black flex items-center flex-column justify-center absolute bottom-0 top-0 z-50 text-green-600">
             <h1 className="text-7xl font-bold">404</h1>
             <h1 className="mt-2 text-5xl font-bold">PAGE NOT FOUND</h1>
            <p className="mt-3 semibold text-lg">This page is not found so please be sure you have searched for the right address</p>
             <Button 
            className="mt-3 !bg-gray-800 px-4 py-2" 
            onClick={()=>{
                navigate("/")
            }} variant="contained">
                Home
            </Button>
        </div>
        </div>
        </div>
        // <div className="w-100 h-100 flex justify-center items-center bg-image">
        //     <div className="flex flex-column bg-black p-5 w-100 bg-opacity-10">
        //         <div className="w-100 flex items-center flex-column justify-center">
        //             <h1 className="text-7xl font-bold decoration-4 decoration-red-500 underline">404</h1>
        //             <h1 className="mt-2 text-5xl font-bold decoration-4 decoration-red-500 underline">PAGE NOT FOUND</h1>
        //             <p className="mt-3 semibold text-lg">This page is not found so please be sure you have searched for the right address</p>
        //             <Button 
        //             className="mt-3 !bg-gray-800 px-4 py-2" 
        //             onClick={()=>{
        //                 navigate("/")
        //             }} variant="contained">
        //                 Home
        //             </Button>
        //         </div>
        //     </div>
        // </div>
    );
}