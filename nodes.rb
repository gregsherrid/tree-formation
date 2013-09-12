class Node
	attr_accessor :title
	attr_accessor :children
	attr_accessor :parent

	def initialize(attributes = {})
		attributes.each { |name, value| send("#{name}=", value) }
		self.children = []
	end

	def add( node )
		children << node
		node.parent = self
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

	def leaf?
		children.empty?
	end

	def root?
		parent.nil?
	end

	def depth
		return 0 if root?
		return parent.depth + 1
	end

	def all_children
		if leaf?
			return []
		else
			children.collect do |c|
				c.all_children << c
			end.flatten
		end
	end

	BLOCK = "\e[107m \e[0m"

	def all_children_at_depth( d )
		if d <= 0
			return [ d ]
		else
			children.collect do |c|
				c.all_children_at_depth( d-1 )
			end.flatten
		end
	end

	def index
		parent.children.index( self )
	end

	def id
		if root?
			return '0'
		else
			parent.id + "-" + index.to_s
		end
	end

end

class Article < Node
	def initialize(attributes = {})
		super
	end
	def to_s
		"Article{#{title}}"
	end
end

