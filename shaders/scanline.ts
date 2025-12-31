
import * as THREE from 'three';

export const ScanlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 0.1 },
    lineCount: { value: 1000.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float opacity;
    uniform float lineCount;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      float scanline = sin(vUv.y * lineCount) * opacity;
      gl_FragColor = vec4(texel.rgb - scanline, texel.a);
    }
  `
};
