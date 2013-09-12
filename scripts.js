$().ready( function() {
	DisplayNodes.setup( $("div.smartNodeZone") );
});

var DisplayNodes = {

	WIDTH: 800,
	HEIGHT: 800,
	DIM: 800,

	setup: function( $smartZone ) {
		$smartZone.css( "width", DisplayNodes.WIDTH + "px" )
		$smartZone.css( "height", DisplayNodes.HEIGHT + "px" )

		var $rawNodes = $smartZone.find( ".smartNode" );
		var root = null;
		$rawNodes.each( function() {
			var $this = $(this);
			var node = TreeNode.fromID( $this.attr("data-id"), root );
			if ( root == null ) {
				root = node;
			}
			node.displayObject = $this;
		});
		DisplayNodes.assignZones( root );
    },

    assignZones: function( node ) {
    	if ( node.root() ) {
			node.zone = new NodeZone( 0, 0, DisplayNodes.WIDTH, DisplayNodes.HEIGHT )
    	}
   		DisplayNodes.updateLoc( node );
    	var isVert = ( node.depth()%2 ) == 0;
    	var nChildren = node.children.length;

    	var zones = node.zone.divide( nChildren, isVert );
    	for ( var i=0; i<nChildren; i++ ) {
    		var child = node.children[i];
    		child.zone = zones[i];
    		DisplayNodes.assignZones( node.children[i] );
    	}
    },

    updateLoc: function( node ) {
    	DisplayNodes.moveTo( node.displayObject, node.zone.x, node.zone.y )
    	node.displayObject.css( "width", node.zone.width + "px" );
    	node.displayObject.css( "height", node.zone.height + "px" );

     	if ( ( node.depth()%2 ) == 0 ) {
     		node.displayObject.addClass( "vert" );
     	} else {
     		node.displayObject.addClass( "horiz" );
     	}
   	
    },

    moveTo: function( $node, x, y ) {
    	x = Math.min( x, DisplayNodes.WIDTH );
    	x = Math.max( x, 0 );
    	y = Math.min( y, DisplayNodes.HEIGHT );
    	y = Math.max( y, 0 );
    	x = Math.round( x );
    	y = Math.round( y );

		$node.css( "left", x + "px");
		$node.css( "top", y + "px");
    }
};

function NodeZone( x, y, width, height ) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.divide = function( n, vSplit ) {
		if ( n%2 == 1 ) { n++; }
		var halfN = n/2;
		var zones = [];

/*
		var newW = vSplit ? this.width/2       : this.width  / halfN;
		var newh = vSplit ? this.height/ halfN : this.height/2;

		for ( var i=0; i<halfN; i++ ) {
			var incX = vSplit ? 0      : i*newH;
			var incY = vSplit ? i*newW : 0;
		}
*/
		if ( vSplit ) {
			var newW = this.width / 2;
			var newH = this.height / halfN;

			for ( var i=0; i<halfN; i++ ) {
				var inc = i*newH;
				var z1 = new NodeZone( x,      y+inc, newW, newH );
				var z2 = new NodeZone( x+newW, y+inc, newW, newH );
				zones.push( z1 )
				zones.push( z2 )
			}

		} else {

			var newW = this.width / halfN;
			var newH = this.height / 2;

			for ( var i=0; i<halfN; i++ ) {
				var inc = i*newH;
				var z1 = new NodeZone( x+inc, y,      newW, newH );
				var z2 = new NodeZone( x+inc, y+newH, newW, newH );
				zones.push( z1 )
				zones.push( z2 )
			}
		}
		
		return zones;
	}
}
