$().ready( function() {
	SmartNodes.setup( $("div.smartNodeZone"), SmartNodesScoring.noScoring );
});

var SmartNodes = {

	WIDTH: 800,
	HEIGHT: 800,
	DIM: 800,

	setup: function( $smartZone, scoreF ) {
		$smartZone.css( "width", SmartNodes.WIDTH + "px" )
		$smartZone.css( "height", SmartNodes.HEIGHT + "px" )

		var $rawNodes = $smartZone.find( ".smartNode" );
		var root = null;
		$rawNodes.each( function() {
			var $this = $(this);
			var node = TreeNode.fromID( $this.attr("data-id"), root );
			if ( root == null ) {
				root = node;
			}
			node.rep = $this;
		});



		//setInterval( function() { SmartNodes.stepTick( root, scoreF ) }, 1 );
    },

    stepTick: function( root, scoreF ) {
		$nodes.each( function() {
			$this = $(this);
			var score = scoreF( $this, $nodes );
			var ch_x = ( Math.random() - 0.5 ) * SmartNodes.DIM  * score;
			var ch_y = ( Math.random() - 0.5 ) * SmartNodes.DIM * score;
			var x = parseInt( $this.css("left") )
			var y = parseInt( $this.css("top") )
			SmartNodes.moveTo( $this, x+ch_x, y+ch_y );
		});
    },

    moveTo: function( $node, x, y ) {
    	x = Math.min( x, SmartNodes.WIDTH );
    	x = Math.max( x, 0 );
    	y = Math.min( y, SmartNodes.HEIGHT );
    	y = Math.max( y, 0 );
    	x = Math.round( x );
    	y = Math.round( y );

		$node.css( "left", x + "px");
		$node.css( "top", y + "px");
    }
};

//All take a node and a list of nodes,
//All return a number from 0 to 1
var SmartNodesScoring = {

	noScoring: function( $thisNode, $nodes ) {
		return .004;
	},

	maxSpacing: function( $thisNode, $nodes ) {
		var score = 0;
		var len = $nodes.length - 1;
		$nodes.each( function() {
			var $this = $(this);
			if ( $thisNode[0] != $this[0] ) {
				var dist = SmartNodesUtility.distance( $this, $thisNode ) / SmartNodes.DIM;
				score += Math.floor( 1-dist*dist );
			}
			console.log( dist, $nodes.length );
		});
		score = score*.1;
		score = Math.min( Math.max( score, 0 ), 1 );
		return score;
	},

	toCenter: function( $thisNode, $nodes ) {
		var x = parseInt( $thisNode.css("left") );
		var y = parseInt( $thisNode.css("top") );

		var score = ( Math.abs( SmartNodes.WIDTH/2 - x ) + 
					  Math.abs( SmartNodes.HEIGHT/2 - y ) ) / SmartNodes.DIM;
		score = score * .05;
		score = Math.min( Math.max( score, 0 ), 1 );
		return score;
	}
}

var SmartNodesUtility = {

	distance: function( $node1, $node2 ) {
		var x1 = parseInt( $node1.css("left") )
		var y1 = parseInt( $node1.css("top") )
		var x2 = parseInt( $node2.css("left") )
		var y2 = parseInt( $node2.css("top") )
		var diffX = x1 - x2;
		var diffY = y1 - y2;

		return Math.sqrt( diffX*diffX + diffY*diffY )
	}
}