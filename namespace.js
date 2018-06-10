// this is put as a global var in the browser
// or it's just a global to this module if commonjs
var cytoscape;

(function(){

	// the object iteself is a function that init's an instance of cytoscape
	var $$ = cytoscape = function(){
		return cytoscape.init.apply(cytoscape, arguments);
	};
	
	// allow functional access to cytoscape.js
	// e.g. var cyto = $.cytoscape({ selector: "#foo", ... });
	//      var nodes = cyto.nodes();
	$$.init = function( options ){
		
		// if no options specified, use default
		if( options === undefined ){
			options = {};
		}

		// create instance
		if( $$.is.plainObject( options ) ){
			return new $$.Core( options );
		} 
		
		// allow for registration of extensions
		// e.g. $.cytoscape("renderer", "svg", SvgRenderer);
		// e.g. $.cytoscape("renderer", "svg", "nodeshape", "ellipse", SvgEllipseNodeShape);
		// e.g. $.cytoscape("core", "doSomething", function(){ /* doSomething code */ });
		// e.g. $.cytoscape("collection", "doSomething", function(){ /* doSomething code */ });
		else if( $$.is.string( options ) ) {
			return $$.extension.apply($$.extension, arguments);
		}
	};

	// define the function namespace here, since it has members in many places
	$$.fn = {};

	// TODO test that this works:
	if( typeof exports !== 'undefined' ){ // expose as a commonjs module
		exports = module.exports = cytoscape;
	}

	// make sure we always register in the window just in case (e.g. w/ derbyjs)
	window.cytoscape = cytoscape;
	
})();
