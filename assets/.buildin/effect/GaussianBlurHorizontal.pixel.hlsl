#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
};

cbuffer GaussianBlur {
    float u_radius;
    float u_sampleCount;
    float u_intensity;
}

DECLARE_TEXTURE(filteredTex);

float4 Main(in FVertexOutput In) : SV_Target0
{
    float sd = radiusToSD(u_radius);
    
    float step = 2. * u_radius / u_sampleCount;
    float3 sum = float3(.0, .0, .0);
    for (float i = .0; i < u_sampleCount; i += 1.) {
        float offset = -u_radius + step * i;
        float3 c = SAMPLE_TEXTURE(filteredTex, uv(offset, .0, In.TexCoord)).xyz;
        sum += c * gaussian(offset, sd);
    }
    return float4(u_intensity * sum / u_sampleCount, 1.0);
}
