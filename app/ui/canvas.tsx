"use client"

import { useDraw } from "./useDraw";
import { EventNames } from "../lib/event";
import { sort } from "../lib/sort";
import { useEffect, useState } from "react";

export default function Canvas() {

    const maxX = 800, maxY = 400;
    const lineWidth = 2;
    const sortO = new sort;
    sortO.delayTime = 10;
    sortO.maxY = maxY;

    let arr: number[] = [];
    let max = 100;

    const { canvasRef, clear } = useDraw(makeLine);
    sortO.canvasRef = canvasRef;

    const [inputDelay, setInputDelay] = useState(sortO.delayTime);

    useEffect(() => {
        sortO.delayTime = inputDelay;
    }, [inputDelay]);

    const [inputLength, setInputLength] = useState(max);

    useEffect(() => {
        max = inputLength;
    }, [inputLength]);

    function makeLine({ ctx, px, height, color }: Draw) {
        const pos = px * lineWidth;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(pos, maxY);
        ctx.lineTo(pos, maxY - height);
        ctx.stroke();

    }

    const clearBoard = () => {
        clear();
        sortO.stopLoop = true;
    }

    function initArray() {
        for (let i = 0; i < max; i++) {
            arr.push(Math.round(Math.random() * maxY));
        }
    }
    initArray();

    const reset = async () => {
        clear();
        sortO.stopLoop = false;
        let initDraw = new CustomEvent(EventNames.DRAW_EVENT, {
            detail: {
                px: 0,
                height: 0,
                color: 'white'
            }
        });
        for (let i = 0; i < max; i++) {
            arr[i] = (Math.round(Math.random() * 300));
            initDraw.detail.px = i;
            initDraw.detail.height = arr[i];
            canvasRef.current?.dispatchEvent(initDraw);
        }
    }

    const bubble = async () => {
        if (arr.length == 0) {
            return;
        }
        arr = await sortO.bubbleSort(arr);
    }

    const merge = async () => {
        if (arr.length == 0) {
            return;
        }
        arr = await sortO.mergeSort(arr, 0, arr.length);
    }
    const shell = async () => {
        if (arr.length == 0) {
            return;
        }
        arr = await sortO.shellSort(arr);
    }
    const linear = async () => {
        if (arr.length == 0) {
            return;
        }
        arr = await sortO.linearSort(arr);
        console.log(arr);
    }

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <div className="flex justify-center items-center">
                <canvas ref={canvasRef} width={maxX} height={maxY} className="bg-black" />
            </div>
            <div className="flex gap-4 m-10 justify-center items-center">
                <label htmlFor="delay" className="block mb-2 text-sm font-medium text-gray-900">Delay: </label>
                <input type="number" id="delay"
                    value={inputDelay}
                    minLength={0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setInputDelay(parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : 0)} />

                <label htmlFor="max-num" className="block mb-2 text-sm font-medium text-gray-900">Length: </label>
                <input
                    id="max-num"
                    type="number"
                    max={maxX}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={inputLength} onChange={(e) => setInputLength(parseInt(e.target.value))} />
            </div>
            <div className="flex flex-col justify-center items-center">

                <div>
                    <button onClick={bubble}
                        className="m-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Bubble sort</button>

                    <button onClick={merge}
                        className="m-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Merge sort</button>

                    <button onClick={shell}
                        className="m-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Shell sort</button>

                    <button onClick={linear}
                        className="m-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Linear sort</button>
                </div>
                <div>
                    <button onClick={reset}
                        className="m-5 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Reset</button>
                    <button onClick={clearBoard}
                        className="m-5 text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Clear</button>
                </div>

            </div>
        </div>
    );
}

