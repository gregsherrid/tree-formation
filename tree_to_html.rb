module TreeToHTML

	def TreeToHTML.get_display_objs( node )
		a = [ TreeToHTML.display_obj( node ) ]
		a = a + node.children.collect do |child|
			TreeToHTML.get_display_objs( child )
		end
		return a.join("\n")
	end

	def TreeToHTML.display_obj( node )
"<div class='smartNode'
	  data-id='#{node.id}'
	  data-root='#{node.root?}'
	  data-depth='#{node.depth}'
	  data-title='#{node.title}'>
	<p>#{node.title}</p>
	<div class='branch'></div>
</div>
".delete("\n")
	end

	def TreeToHTML.sample_page( root, file="sample.html" )
		File.open( file, 'w' ) do |file|

		tree_area =
"<h1>Sample TreeFormation</h1>
<div class='smartNodeZone'>
	#{TreeToHTML.get_display_objs( root )}
</div>
"

		full_body =
"<!DOCTYPE html>
<html>
<head>
	<meta charset=utf-8 />
	<title>Sample TreeFormation</title>
	<link rel='stylesheet' type='text/css' media='screen' href='styles.css' />
	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></script>
	<!--[if IE]>
		<script src='http://html5shiv.googlecode.com/svn/trunk/html5.js'></script>
	<![endif]-->
	<script type='text/javascript' src='tree.js'></script>
	<script type='text/javascript' src='scripts.js'></script>
</head>
<body>
     #{tree_area}
</body>
</html>
"
			file.write(full_body)
		end
	end
end