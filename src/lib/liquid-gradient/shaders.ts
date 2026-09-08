export const vertexSource = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const fragmentSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_seed;
uniform float u_scale;
uniform float u_amplitude;
uniform float u_frequency;
uniform float u_definition;
uniform float u_bands;
uniform float u_flowAngle;
uniform float u_grain;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32 + u_seed * 0.001);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float weight = 0.5;
  for (int i = 0; i < 10; i++) {
    float enabled = 1.0 - step(u_definition, float(i));
    value += enabled * weight * noise(p);
    p = p * 2.03 + vec2(17.13, 9.71);
    weight *= 0.5;
  }
  return value;
}

vec3 palette(float t) {
  float p = clamp(t, 0.0, 1.0) * 4.0;
  if (p < 1.0) return mix(u_color0, u_color1, smoothstep(0.0, 1.0, p));
  if (p < 2.0) return mix(u_color1, u_color2, smoothstep(0.0, 1.0, p - 1.0));
  if (p < 3.0) return mix(u_color2, u_color3, smoothstep(0.0, 1.0, p - 2.0));
  return mix(u_color3, u_color4, smoothstep(0.0, 1.0, p - 3.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);
  p *= max(u_scale, 0.001) * 0.62;
  float angle = radians(u_flowAngle);
  p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p;

  // Noise is deliberately limited to displacement. The visible shapes are
  // smooth distance fields, which keeps the result ribbon-like instead of cloudy.
  float t = u_time * 0.18;
  float frequency = max(u_frequency, 0.001);
  float broadBend = sin(p.x * frequency * 2.4 - t) * 0.34;
  broadBend += sin(p.x * frequency * 1.15 + t * 0.63 + 2.1) * 0.16;
  float fineBend = (fbm(vec2(p.x * frequency * 1.1 - t * 0.12, u_seed * 0.013)) - 0.5);
  float flow = p.y - broadBend - fineBend * (0.035 + u_amplitude * 0.16);

  float coverage = mix(0.16, 0.42, clamp(u_bands, 0.0, 1.0));
  float edge = mix(0.16, 0.038, clamp(u_definition / 10.0, 0.0, 1.0));
  float mainRibbon = 1.0 - smoothstep(coverage, coverage + edge, abs(flow - 0.42));
  float lowerRibbon = 1.0 - smoothstep(coverage * 0.44, coverage * 0.44 + edge, abs(flow + 1.08));
  float upperRibbon = 1.0 - smoothstep(coverage * 0.25, coverage * 0.25 + edge, abs(flow - 1.42));

  float ribbon = max(mainRibbon, max(lowerRibbon * 0.78, upperRibbon * 0.56));
  float along = clamp(0.24 + uv.x * 0.36 + uv.y * 0.12 + broadBend * 0.12, 0.0, 1.0);
  vec3 ribbonColor = palette(along);
  vec3 shadowColor = mix(u_color0, u_color4, 0.38);
  vec3 color = mix(shadowColor, ribbonColor, ribbon);

  // A narrow luminous edge gives each wave the photographic rim in the reference.
  float rim = exp(-abs(abs(flow - 0.42) - coverage) * 27.0);
  color += mix(u_color2, u_color3, along) * rim * 0.2;
  float grainMask = 0.35 + 0.65 * smoothstep(0.18, 0.82, ribbon);
  color += (hash(gl_FragCoord.xy + fract(t) * 173.0) - 0.5) * u_grain * grainMask;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
