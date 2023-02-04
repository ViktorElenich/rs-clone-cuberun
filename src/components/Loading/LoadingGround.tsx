const LoadingGround = () => {
  return (
    <mesh
      receiveShadow={true}
      visible={true}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry attach='geometry' args={[5000, 5000, 1, 1]} />
      <meshStandardMaterial
        attach='material'
        color={`black`}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

export default LoadingGround;
