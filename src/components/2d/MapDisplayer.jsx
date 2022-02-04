import { Stage, Sprite } from '@inlet/react-pixi';
import { Texture } from '@pixi/core';
import { Tilemap, useTilemapLoader } from 'react-pixi-tilemap'

const tilemape = process.env.PUBLIC_URL + '/stages/map.tmx'

const preXY = [
    {x: 200, y:300},
    {x: 300, y:300},
    {x: 500, y:300}
]

const NFTs = [
    {image:'https://lh3.googleusercontent.com/k30AWxZHbL1JS19sXXcen600trbHRJr0YRl171yLu9tFJ4Bi3JEiNcNzVQqP7f48aXe6VuEzTO4xHasQktoALVCRq7sVJ5mIB6onvw=s0', link:'https://opensea.io/assets/matic/0x6d612892f5bb99d498f7e413715e5cdf19741861/90'},
    {image:'https://lh3.googleusercontent.com/lUu68ztbFBrkveXLBZ5efF-ss9enEKHhMEHPmlps7rMzqoU6BOJskFVpOpbdLYDHCvTu-L11WFmwm5Y_O0cf4BXjGdrokeUJEZ6MPwE=w600', link:'https://opensea.io/assets/matic/0x6d612892f5bb99d498f7e413715e5cdf19741861/26'},
    {image:'https://lh3.googleusercontent.com/xL1te6RcdCyYHh47KEoocvI5QmHx8n84PhbsBHxi1Y_0jIYvbhPLpI4r_UmC1FwiqiXAoOSKWjZGPx7KugdrxJEhJm7jRSvoILPVug=w600', link:'https://opensea.io/assets/matic/0x6d612892f5bb99d498f7e413715e5cdf19741861/45'}
]
const onClick =(event)=>{
    console.log(`${event.clientX} ${event.clientY}`)
    const X = event.clientX;
    const Y = event.clientY;
    let i=0;
    // for (const p of preXY) {
    //     console.log(`${p.x-64} ${p.x} ${p.y-64} ${p.y}`);
    //    if (p.x-64 <X && X<p.x && p.y-64<Y && Y <p.y) {
    //        console.log('good');
    //        window.open(NFTs[i].link, '');
    //        return;
    //     //    
    //    }
    //    i++;
    // }
    
   }
export const MapDisplayer = () => {
    const map = useTilemapLoader(tilemape)

    return (
         <>
         <Stage width={window.innerWidth} height={window.innerHeight/2} options={{ resizeTo: window }} onPointerDown={onClick}>
         
            <Tilemap map={map} scale={0.75}>
                {/* These sprites show off the layering order */}
                {/* <Sprite texture={Texture.WHITE} x={120} y={380} width={64} height={64} />
                <Sprite texture={Texture.WHITE} x={700} y={420} width={64} height={64} />
                <Sprite texture={Texture.WHITE} x={500} y={700} width={64} height={64} /> */}
                {NFTs.map((v, index) => <Sprite source={v.image} x={preXY[index].x} y={preXY[index].y} width={64} height={64} />)}
                {/* <Sprite source={'https://lh3.googleusercontent.com/k30AWxZHbL1JS19sXXcen600trbHRJr0YRl171yLu9tFJ4Bi3JEiNcNzVQqP7f48aXe6VuEzTO4xHasQktoALVCRq7sVJ5mIB6onvw=s0'} x={200} y={300} width={64} height={64}/>           */}
                
                
            </Tilemap>
            
        </Stage>
         </>
        
    )
}
