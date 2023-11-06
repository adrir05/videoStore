# app/models/movie.rb

class Movie < ApplicationRecord

    # The Model Movie, only has the attribute name and like_counter
    # The attribute like_counter is an integer, and it is optional
    # The attribute name is a string, and it is required
    # The attribute like_counter has a default value of 0
    
    #model basic validations
    validates :name, presence: true
    validates :like_counter, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_blank: true
end