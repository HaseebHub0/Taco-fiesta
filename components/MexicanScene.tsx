"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

const MexicanScene = () => {
  const group = useRef()
  const { nodes, materials } = useGLTF("/assets/3d/mexican_scene.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 4) / 8
    group.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <group ref={group}>
      <mesh geometry={nodes.Sombrero.geometry} material={materials.SombreroMaterial} position={[0, 1, 0]} />
      <mesh geometry={nodes.Taco.geometry} material={materials.TacoMaterial} position={[-1, 0, 0]} />
      <mesh geometry={nodes.Chili.geometry} material={materials.ChiliMaterial} position={[1, 0, 0]} />
      <mesh geometry={nodes.Maracas.geometry} material={materials.MaracasMaterial} position={[0, -1, 0]} />
    </group>
  )
}

export default MexicanScene

