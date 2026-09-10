export const vertexSource = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const fragmentSource = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_pull;
uniform float u_velocity;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * .1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float energy = clamp(u_pull + abs(u_velocity) * .08, 0.0, 1.0);

  // Overlapping soft lobes create a composed crown without visible cell boundaries.
  float center = mix(.5, u_pointer.x, .22);
  float x = abs(uv.x - center);
  float crown = exp(-x * x * 5.2);
  crown += .13 * exp(-pow(x - .29, 2.0) * 58.0);
  crown += .055 * exp(-pow(x - .43, 2.0) * 96.0);
  crown = smoothstep(.04, 1.0, crown);
  float breath = sin(u_time * 2.2) * .012 * energy + u_velocity * .025;
  float top = .20 + crown * .50 + breath;

  // Soft spectral bands rise from the bottom and bloom into white at their edge.
  float localY = uv.y / max(top, .02);
  float body = 1.0 - smoothstep(.82, 1.08, localY);
  float bloom = 1.0 - smoothstep(.98, 1.38, localY);
  float band = clamp(localY, 0.0, 1.0);

  vec3 blue = vec3(.08, .25, .72);
  vec3 ice = vec3(.70, .84, .95);
  vec3 yellow = vec3(1.0, .82, .12);
  vec3 orange = vec3(1.0, .28, .04);
  vec3 magenta = vec3(.96, .0, .77);
  vec3 color = blue;
  color = mix(color, ice, smoothstep(.10, .28, band));
  color = mix(color, yellow, smoothstep(.25, .46, band));
  color = mix(color, orange, smoothstep(.45, .62, band));
  color = mix(color, magenta, smoothstep(.60, .80, band));
  color = mix(color, vec3(1.0), smoothstep(.78, 1.08, band));

  float glow = body * (.92 + .08 * crown);
  color = mix(vec3(1.0), color, glow * bloom);
  color += (hash(gl_FragCoord.xy) - .5) / 510.0;
  gl_FragColor = vec4(color, 1.0);
}
`;
