function TreeNode() {
    this.children = [];
    this.parent = null;

    this.add = function( child ) {
    	this.children.push( child );
    	child.parent = this;
    }

    this.root = function() {
    	return this.parent == null;
    }

    this.leaf = function() {
    	return this.children.length == 0;
    }

    this.all_children = function( a ) {
    	a = ( typeof a !== 'undefined' ) ? a : [];
    	a.push( this )
    	var len = this.children.length;
    	for ( var i=0; i<len; i++ ) {
    		this.children[i].all_children( a );
    	}
    	return a;
    }

    this.all_children_at_depth = function(d) {
    	if ( d <= 0 ) {
    		return [ this ]
    	}
     	var a = [];
    	var len = this.children.length;
    	for ( var i=0; i<children.length; i++ ) {
    		var c = children[i];
    		a.concat( c.all_children_at_depth(d-1) );
    	}
    	return a;
    }

    this.depth = function(d) {
		if ( this.root() ) {
			return 0;
		} else {
			return this.parent.depth() + 1;
		}
    }

    this.index = function() {
    	return this.parent.children.indexOf( this );
    }

    this.path = function() {
    	if ( this.root() ) {
    		return [0]
    	} else {
    		return [].concat( this.parent.path(), [this.index()] )
    	}
    }

    this.id = function() {
    	return this.path().join("-");
    }


    this.add_at_path = function( node, outPath ) {
    	var d = this.depth();
    	if ( d == ( outPath.length - 2 ) ) {
    		this.add( node );
    	} else {
    		var i = outPath[d+1]
    		this.children[i].add_at_path( node, outPath )
    	}
    }

}

TreeNode.fromID = function( id, root ) {
	var node = new TreeNode();
	if ( root != null ) {
		root.add_at_path( node, id.split("-") );
	}
	return node;
}




