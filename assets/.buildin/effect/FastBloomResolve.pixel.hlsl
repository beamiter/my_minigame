#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
};

cbuffer GaussianBlur {
    float u_radius;
    float u_sampleCount;
    float u_intensity; // unused
}

DECLARE_TEXTURE(horizontalBlur);
DECLARE_TEXTURE(verticalBlur);

float4 Main(in FVertexOutput In) : SV_Target0
{
    float3 source = SAMPLE_TEXTURE(sourceTex, In.TexCoord).xyz;
    float sd = radiusToSD(u_radius);
    
    float step = 2. * u_radius / u_sampleCount;
    float3 sum = float3(.0, .0, .0);
    for (float i = .0; i < u_sampleCount; i += 1.) {
        float offset = -u_radius + step * i;
        float3 c1 = SAMPLE_TEXTURE(verticalBlur, uv(offset, .0, In.TexCoord)).xyz;
        float3 c2 = SAMPLE_TEXTURE(horizontalBlur, uv(.0, offset, In.TexCoord)).xyz;
        sum += (c1 + c2) * gaussian(offset, sd);
    }
    return float4(sum / u_sampleCount + source, 1.0);
}
