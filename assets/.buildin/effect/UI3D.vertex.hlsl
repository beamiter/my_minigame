#include <common.inc>

struct FVertexInput
{
	float3 Position : a_position;
	float2 TexCoord: a_texCoord;
	float4 Color: a_color;
};

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float4 Color : TEXCOORD1;
};

cbuffer Canvas {
	float u_renderMode;
	float u_proportionalScale;
}

float4x4 GenerateScaleMatrixByFloat3(float3 scale)
{
	float4x4 s = float4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
	s[0][0] = scale.x;
	s[1][1] = scale.y;
	s[2][2] = scale.z;
	s[3][3] = 1.0;
	return s;
}

float3 ExtractScaleVector(float4x4 modelMatrix) {
	float scaleX = length(float3(modelMatrix[0]));
	float scaleY = length(float3(modelMatrix[1]));
	float scaleZ = length(float3(modelMatrix[2]));
	return float3(scaleX, scaleY, scaleZ);
}

// 从modelmatrix抽取出scaleMatrix
float4x4 ExtractScaleMatrix(float4x4 modelMatrix) {
	float3 scaleVec = ExtractScaleVector(modelMatrix);
	return GenerateScaleMatrixByFloat3(scaleVec);
}

// 从modelmatrix抽取出rotationMatrix
float4x4 ExtractRotationMatrix(float4x4 modelMatrix) {
	float3 scale = ExtractScaleVector(modelMatrix);
	float4x4 rMatrix = float4x4(
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
		);
	rMatrix[0][0] = modelMatrix[0][0] / scale.x;
	rMatrix[1][0] = modelMatrix[1][0] / scale.x;
	rMatrix[2][0] = modelMatrix[2][0] / scale.x;

	rMatrix[0][1] = modelMatrix[0][1] / scale.y;
	rMatrix[1][1] = modelMatrix[1][1] / scale.y;
	rMatrix[2][1] = modelMatrix[2][1] / scale.y;

	rMatrix[0][2] = modelMatrix[0][2] / scale.z;
	rMatrix[1][2] = modelMatrix[1][2] / scale.z;
	rMatrix[2][2] = modelMatrix[2][2] / scale.z;

	rMatrix[3][3] = 1.0;

	return rMatrix;
}

// 从modelmatrix抽取出translateMatrix
float4x4 ExtractTranslateMatrix(float4x4 modelMatrix) {
	float4x4 tMatrix = float4x4(
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
		);
	tMatrix[3] = modelMatrix[3];
	tMatrix[3][3] = 1.0;
	return tMatrix;
}


void Main(in FVertexInput In, out FVertexOutput Out)
{

	float vertexX = In.Position.x * u_proportionalScale;
	float vertexY = In.Position.y * u_proportionalScale;
	float vertexZ = In.Position.z * u_proportionalScale;

	if (u_renderMode == 1.0) {
		float4x4 billboardMatrix = float4x4(
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
			); // 单位矩阵，对角线为1.0

		float4x4 worldMatrix = u_world;
		float4x4 sMatrix = ExtractScaleMatrix(u_world); // 从u_world提取出scale变换矩阵
		float4x4 rMatrix = ExtractRotationMatrix(u_world); // 从u_world提取出rotation变换矩阵
		float4x4 tMatrix = ExtractTranslateMatrix(u_world); // 从u_world提取出translate变换矩阵

		float4 positionResult = float4(vertexX, vertexY, vertexZ, 1.0);

		float3 curSubCenter = float3(0.0, 0.0, 0.0);
		
		float3 subPosition = In.Position;
		float3 curRotation = float3(0.0, 0.0, 0.0);

		float3 cameraPos = float3(u_viewInverse[3][0], u_viewInverse[3][1], u_viewInverse[3][2]);
		float3 target = mul(float4(curSubCenter, 1.0), worldMatrix).xyz;
		float3 zAxis = normalize(cameraPos - target);
		float3 yAxis = float3(0.0, 1.0, 0.0);
		float3 xAxis = normalize(cross(yAxis, zAxis));
		yAxis = normalize(cross(zAxis, xAxis));
		billboardMatrix[0] = float4(xAxis, 0.0);
		billboardMatrix[1] = float4(yAxis, 0.0);
		billboardMatrix[2] = float4(zAxis, 0.0);
		billboardMatrix[3] = float4(worldMatrix[3][0], worldMatrix[3][1], worldMatrix[3][2], worldMatrix[3][3]);
		
		float4 modelPosition = mul(u_projection, mul(u_view, (mul(worldMatrix, float4(curSubCenter, 1.0)) + mul(billboardMatrix, mul(sMatrix, positionResult)))));
		Out.Position = modelPosition;
	} else {
		Out.Position = mul(u_projection, mul(u_view, mul(u_world, float4(vertexX, vertexY, vertexZ, 1.0))));
	}


	Out.Color = In.Color / 255.0;
	Out.TexCoord = In.TexCoord;
}