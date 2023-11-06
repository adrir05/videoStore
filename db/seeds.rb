# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

# Create some movies
Movie.create(name: 'Star Wars', like_counter: 19)
Movie.create(name: 'The Godfather', like_counter: 92)
Movie.create(name: 'Pulp Fiction', like_counter: 45)
# Add more movies as needed

puts "Seeded #{Movie.count} movies."
