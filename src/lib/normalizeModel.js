import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

/**
 * Clones a shared/cached GLTF scene (so we never mutate the cache that
 * useGLTF keeps), recenters it around its own bounding-box center, and
 * scales it so its bounding box matches `targetSize` on the given axis.
 *
 * mode: 'height' normalizes using the Y size (good for upright objects
 * like a phone). 'max' normalizes using the largest of the three
 * dimensions (better for objects like a watch + band, whose bounding box
 * is dominated by one long, floppy axis).
 */
export function normalizeModel(scene, targetSize, mode = 'height') {
  const clone = SkeletonUtils.clone(scene)

  // Give every mesh its own material instance so later per-model tweaks
  // (opacity, color, etc.) never leak back into the shared cached asset.
  clone.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone()
    }
  })

  const box = new THREE.Box3().setFromObject(clone)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  // Recenter the raw geometry to its own local origin.
  clone.position.set(-center.x, -center.y, -center.z)

  const reference = mode === 'max' ? Math.max(size.x, size.y, size.z) : size.y
  const scale = reference > 0 ? targetSize / reference : 1

  const wrapper = new THREE.Group()
  wrapper.scale.setScalar(scale)
  wrapper.add(clone)

  return { wrapper, size, scale }
}
