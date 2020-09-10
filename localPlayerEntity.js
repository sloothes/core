//	localPlayerEntity.js (experimental)
//	requires ThreeSteeringBehaviours.js entity.

	const localPlayer = (function(){

		var radius = 0.85; // important!

	//	A dummy mesh (required for entity).
	//	You may replace with a skinned mesh.

		var mesh = (function(d){
			var geometry = new THREE.BoxGeometry(d,d,d);
			var material = new THREE.MeshBasicMaterial();
			var mesh = new THREE.Mesh(geometry,material);
			mesh.visible = false; return mesh;
		})( 1.0 );

	//	player entity.
		var player = (function(mesh){
			var entity = new Entity(mesh);
			entity.radius = radius;
			entity.position.set( 0, 0, 0 );
			entity.name = "local player";
			scene.add( entity );
			return entity; // important!
		})( mesh );

	//	player helper.
		var helper = (function( r ){
			var sphere = new THREE.SphereGeometry( r, 8, 6 );
			var geometry = new THREE.EdgesGeometry( sphere );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "local helper";
			return segments;
		})( radius );

		player.add( helper );

	//	player controller.
		player.controller = (function( object, radius ){
			var controller = new MW.CharacterController( object, radius );
			controller.movementSpeed = 5;
			controller.maxSlopeGradient = 0.5;
			controller.center.set(0, radius, 0);
			world.add( controller );
		//	Update player direction.
			watch(controller, "direction", function(prop,action,value){
				object.rotation.y = value + Math.PI;
			});
		//	Reset player position.
		//	watch(controller.center, "y", function(prop,action,value){
		//		if ( value < -1 ) controller.center.set(0, radius, 0);
		//	}); 
			return controller;
		})( player, radius );

	//	cameraLight control.
		takeCameraLight( player );

		return player;
	})();

	//	rotation.
	//	(function update(){
	//		player.requestFrameID = requestAnimationFrame( update );
	//		player.rotation.y = player.controller.direction + Math.PI;
	//	})();
