import { useEffect, useRef } from "react";

function resizeCanvas(canvas) {
    let { width, height } = canvas.getBoundingClientRect();
    // let width = 140;
    // let height = 400;
    canvas.height = 200;
    // if (canvas.width !== width || canvas.height !== height) {
    //   const { devicePixelRatio:ratio=1 } = window
    //   const context = canvas.getContext('2d')
    //   canvas.width = width*ratio
    //   canvas.height = height*ratio
    //   context.scale(ratio, ratio)
    //   return true
    // }

    return false;
}

export default function Canvas(props) {
    const { draw, ...rest } = props;

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        console.log(resizeCanvas(canvas));

        draw(context);
    }, []);

    return <canvas ref={canvasRef} {...rest} />;
}
