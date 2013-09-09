require "./parsers.rb"

def main( art_name )
	puts art_name
	article = WikiParser.parse( art_name )
	puts article.display
end

main( ARGV[0] )