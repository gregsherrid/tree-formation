require "./parsers.rb"
require './tree_to_html.rb'

def main( art_name )
	article = WikiParser.parse( art_name )
	puts article.display
	puts article.all_children.length

	TreeToHTML.sample_page( article )
end

main( ARGV[0] )