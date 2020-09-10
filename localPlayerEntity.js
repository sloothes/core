//	localPlayerEntity.js (experimental)
//	requires ThreeSteeringBehaviours.js

	const localPlayer = (function(){

		var radius = 0.85;

	//	required for entity.
		var mesh = (function(d){
			var geometry = new THREE.BoxGeometry(d,d,d);
			return new THREE.Mesh(geometry);
		})( 0.2 );

	//	player.
		var player = (function(mesh){
			var player = new Entity(mesh);
			player.position.set( 0, 0, 0 );
			player.name = "local player";
			scene.add( player );
			return player;
		})(mesh);

	//	helper.
		var helper = (function( r ){
			var sphere = new THREE.SphereGeometry( r, 8, 6 );
			var geometry = new THREE.EdgesGeometry( sphere );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "local helper";
			return segments;
		})( radius );

		player.add( helper );

	//	controller.
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
			watch(controller.center, "y", function(prop,action,value){
				if ( value < -1 ) controller.center.set(0, radius, 0);
			}); 
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
