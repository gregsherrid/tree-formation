class Node
	attr_accessor :title
	attr_accessor :children

	def initialize(attributes = {})
		attributes.each { |name, value| send("#{name}=", value) }
		self.children = []
	end

	def add( node )
		children << node
	end
	alias_method :<<, :add

	def to_s
		"Node{#{title}}"
	end

	def display( depth = 0 )
		s = BLOCK*(depth*2+1) + title + "\n"
		children.each do |c|
			s += c.display( depth + 1 )
		end
		return s
	end

	BLOCK = "\e[107m \e[0m"

end

class Article < Node
	def initialize(attributes = {})
		super
	end
	def to_s
		"Article{#{title}}"
	end
end

