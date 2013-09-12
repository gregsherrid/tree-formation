require './nodes.rb'
require 'nokogiri'
require 'open-uri'

module WikiParser

	def WikiParser.parse( article )
		doc = Nokogiri::HTML( open("http://en.wikipedia.org/wiki/#{article}") )
		body = doc.css('div#content')

		article = Article.new( title: body.css('h1')[0].content )
		last_h2 = nil
		last_h3 = nil

		body.css('h2, h3, h4').each do |header|
			title = header.content
			title = title.gsub(/(?<=\[)[^\]]+?(?=\])/, "")
			title = title.gsub("[","")
			title = title.gsub("]","")
			node = Node.new( title: title )

			if header.name == 'h2'
				article << node
				last_h2 = node
				last_h3 = nil
			elsif header.name = 'h3'
				last_h2 << node
				last_h3 = node
			elsif header.name = 'h4'
				last_h3 << node
			else
				raise "unknown header type"
			end
		end

		return article
	end
end

module NyTimes

end