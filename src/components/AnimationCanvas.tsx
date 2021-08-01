import { Suspense, useCallback, useMemo, useRef, memo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import node from '../assets/node.png'

function Points() {
	const imgTex = useLoader(THREE.TextureLoader, node)
	const bufferRef = useRef(null)

	let t = 0
	let f = 0.002
	let a = 3
	const graph = useCallback(
		(x, z) => {
			return Math.sin(f * (x ** 2 + z ** 2 + t)) * a
		},
		[t, f, a]
	)

	const count = 100
	const sep = 3
	const positions = useMemo(() => {
		let positions = []

		for (let xi = 0; xi < count; xi++) {
			for (let zi = 0; zi < count; zi++) {
				let x = sep * (xi - count / 2)
				let z = sep * (zi - count / 2)
				let y = graph(x, z)
				positions.push(x, y, z)
			}
		}

		return new Float32Array(positions)
	}, [count, sep, graph])

	useFrame(() => {
		const node = bufferRef.current as any
		t += 15
		const positions = node.array

		let i = 0

		for (let xi = 0; xi < count; xi++) {
			for (let zi = 0; zi < count; zi++) {
				let x = sep * (xi - count / 2)
				let z = sep * (zi - count / 2)
				positions[i + 1] = graph(x, z)
				i += 3
			}
		}

		node.needsUpdate = true
	})

	return (
		<points>
			<bufferGeometry attach="geometry">
				<bufferAttribute
					ref={bufferRef}
					attachObject={['attributes', 'position']}
					array={positions}
					count={positions.length / 3}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				attach="material"
				map={imgTex}
				size={0.5}
				sizeAttenuation
				transparent={false}
				alphaTest={0.5}
				opacity={1.0}
			/>
		</points>
	)
}

const AnimationCanvas = memo(() => (
	<Canvas camera={{ position: [100, 10, 0], fov: 75 }}>
		<Suspense fallback={null}>
			<Points />
		</Suspense>
	</Canvas>
))

export default AnimationCanvas
