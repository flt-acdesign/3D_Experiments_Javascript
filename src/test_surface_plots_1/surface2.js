

function surface_wireframe(scene, shadowGenerator) {

// Function to create the custom mesh of x^2 + z^2
var createCustomMesh = function (scene) {
    // Create a custom mesh
    var customMesh = new BABYLON.Mesh("custom", scene);

    // Create arrays to hold the positions, indices, and normals
    var positions = [];
    var indices = [];
    var normals = [];

    // Size of the grid
    var size = 50;
    var step = 1;

    // Create vertices
    for (var x = -size; x <= size; x += step) {
        for (var z = -size; z <= size; z += step) {
            positions.push(x, (x * x + z * z) / size, z); // x, y (as x^2 + z^2), z
        }
    }

// Create indices
var gridLength = size * 2 + 1;
for (var x = 0; x < size * 2; x++) {
for (var z = 0; z < size * 2; z++) {
var topLeft = x * gridLength + z;
var topRight = topLeft + 1;
var bottomLeft = topLeft + gridLength;
var bottomRight = bottomLeft + 1;

indices.push(topLeft, bottomLeft, topRight);
indices.push(topRight, bottomLeft, bottomRight);
}
}

    // Assign positions and indices to the custom mesh
    customMesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    customMesh.setIndices(indices);

    // Calculate normals for the vertices
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);

    // Assign normals to the custom mesh
    customMesh.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);

    // Create a material for the mesh
    var material = new BABYLON.StandardMaterial("mat", scene);
    material.wireframe = true;
    customMesh.material = material;

    // Enable shadow casting for the mesh
    shadowGenerator.getShadowMap().renderList.push(customMesh);
    customMesh.receiveShadows = true;

    return customMesh;
}

// Create the custom mesh
var customMesh = createCustomMesh();
}