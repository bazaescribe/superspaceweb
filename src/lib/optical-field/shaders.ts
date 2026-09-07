/** Continuous anisotropic material: no line geometry or translated texture. */
export const opticalSettings = {
  // Visible local refraction over a few seconds, without translating the surface.
  speed: 0.38,
  refraction: 0.065,
  density: 1.15,
  dispersion: 0.65,
  exposure: 1.15,
  warp: 0.055,
  maxDpr: 1.5,
  maxPixels: 1_800_000,
  fps: 30,
} as const;

export const vertexSource = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const fragmentSource = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time, u_density, u_dispersion, u_exposure, u_warp, u_refraction;
float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * .1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p) {
  return .57*noise(p) + .28*noise(p*2.03+19.1) + .15*noise(p*4.11+7.3);
}
vec3 spectrum(float h) {
  return pow(.52 + .48*cos(6.2831853*(h+vec3(0.0,.33,.67))), vec3(2.2));
}
void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution;
  // Preserve optical scale on tall screens without stretching the material.
  vec2 p = (uv-.5)*vec2(max(u_resolution.x/u_resolution.y,.85),1.0);
  // Offset avoids starting on a lattice boundary, where noise has zero velocity.
  float t = u_time + 7.31;
  float w = fbm(p*1.4 + vec2(.13*sin(t*.73), .17*cos(t*.61)));
  float crossAxis = p.x*.78-p.y*.62;
  float alongAxis = p.x*.62+p.y*.78;
  crossAxis += u_warp*(w-.5) + .065*p.y*p.y;
  // A shared, spatially varying lens field moves broad and fine reflections together.
  // Nonperiodic noise changes the local displacement instead of sliding the image.
  crossAxis += u_refraction*(noise(vec2(crossAxis*3.1+11.7,alongAxis*.9+t*.46))-.5);
  vec3 light = vec3(0.0);
  float body = 0.0;
  for (int i=0; i<5; i++) {
    float k = float(i);
    float scale = (22.0*pow(2.05,k))*u_density;
    // Each focal plane samples the same continuous surface at a different bandwidth.
    // Time changes local refraction, never the position of the whole field.
    float bend = noise(vec2(alongAxis*1.7+k*9.0,t*(.41+k*.057)+k*3.17)) -.5;
    vec2 q = vec2(crossAxis*scale + bend*(1.1+k*.21), alongAxis*(1.5+k*.57)+k*23.7);
    float n = noise(q);
    float edge = pow(max(0.0,n), mix(2.2,8.0,k/4.0));
    float envelope = .25+.75*noise(vec2(crossAxis*5.0+k*17.0,alongAxis*2.4+t*.37));
    float d = u_dispersion*(.09+k*.022);
    vec3 split = vec3(noise(q+vec2(d,0)),n,noise(q-vec2(d,0)));
    split = pow(max(vec3(0),split),vec3(5.0));
    vec3 hue = spectrum(noise(q*vec2(.19,.7)+31.0)*1.7 + k*.17);
    vec3 metal = mix(vec3(.035,.21,.18),vec3(.77,.43,.22),smoothstep(.15,.95,uv.x));
    // Bias the reflected source toward amber on the right; retain spectral edges.
    float warmth = smoothstep(.25,.95,uv.x);
    hue = mix(hue, hue*vec3(1.12,1.0,.52),warmth*.65);
    vec3 tint = mix(metal,hue,mix(.86,.61,warmth));
    light += (tint*edge*3.1 + split*.12)*envelope*(.30-k*.024);
    body += n*(.13-k*.019);
  }
  float caustic = fbm(vec2(crossAxis*7.0,alongAxis*.85)+vec2(0,t*.23));
  vec3 base = mix(vec3(.018,.075,.078),vec3(.29,.17,.105),smoothstep(.1,.95,uv.x));
  vec3 color = base*(.32+body) + light*(.65+1.25*caustic);
  // A broad warm reflected source supplies depth beneath the fine reflections.
  color += vec3(.46,.27,.14)*pow(caustic,3.0)*smoothstep(.2,1.0,uv.x);
  color = 1.0-exp(-color*u_exposure*2.1);
  color = pow(color,vec3(.91));
  color += (hash(gl_FragCoord.xy)-.5)/255.0;
  gl_FragColor = vec4(color,1.0);
}
`;
