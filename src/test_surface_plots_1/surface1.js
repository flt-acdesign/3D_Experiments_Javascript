function surface_smooth(fun, scene) {
    // create function
    
    var size = 100
    
    var data = {
                positions: [],
                indices: []
                };
    
    var index = 0
    for (var x = -size; x <= size; x++) {
        for (var z = -size; z <= size; z++) {
         var y = fun(x,z) / size
         data.positions.push(x, y, z);
           if (x < size && z < size) {
            var i = index;
            data.indices.push(i, i + 2*size + 1, i + 1)
            data.indices.push(i + 1, i + 2*size + 1, i + 2*size + 2)
           }
        index++;
       }
     }
    
     //console.log(JSON.stringify(data)); // Log the JSON data to the console
    
    // Create mesh from JSON data
    var customMesh = new BABYLON.Mesh("custom", scene);
    var vertexData = new BABYLON.VertexData();
    vertexData.positions = data.positions;
    vertexData.indices = data.indices;
    vertexData.applyToMesh(customMesh, true);
    
    }