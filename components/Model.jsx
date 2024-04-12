import React, { useRef } from 'react';
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from 'react-three-fiber';
import { useControls } from 'leva';

export default function Model() {

    const mesh = useRef();
    const { nodes } = useGLTF('/medias/Ethereum.glb');
    const { viewport } = useThree();
    
    useFrame( () => {
        mesh.current.rotation.x = 0.00;
        mesh.current.rotation.y += 0.01;
        mesh.current.position.x = 0.9;
        mesh.current.position.y = -0.4;

    })

    const materialProps = useControls({

        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0, min: 0, max: 1, step: 0.1 },

        transmission: {value: 1, min: 0, max: 1, step: 0.1},

        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 0.02, min: 0, max: 1},

        backside: { value: true},

    })

    return (
        <group scale={viewport.width /17}>
            <Text fontSize={2} font='fonts/NeueMontreal-Bold.otf' position={[0, 0, -.5]} >
                Ethereum
            </Text>
            
            <mesh ref={mesh} {...nodes.Sphere001}>
                <MeshTransmissionMaterial {...materialProps}/>

            </mesh>
            
        </group>
    );
}