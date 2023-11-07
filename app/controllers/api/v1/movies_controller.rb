# app/controllers/api/v1/movies_controller.rb

module Api
  module V1
    class MoviesController < ApplicationController
      # Skip CSRF protection for API
      skip_before_action :verify_authenticity_token

      def index
        movies = Movie.all
        render json: movies
      end

      def show
        column = params[:id]
        searchParam = params[:key]

        if column.blank? || searchParam.blank?
          render json: { error: 'Missing search parameters' }, status: :bad_request
          return
        end

        if column == 'name'
          movie = Movie.where("name LIKE ?", "%#{searchParam}%")
        else
          movie = Movie.where(column => searchParam)
        end

        if movie
          render json: movie
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end

      # POST /movies endpoint using layered design pattern
      
      def create
        movie_creator = Movies::AddMovies.new(params[:movie])
        movie = movie_creator.create_movie

        if movie[:error]
          render json: movie[:error], status: :unprocessable_entity
        else
          render json: movie[:json], status: movie[:status]
        end
      end

      def increment_likes
        movie = Movie.find_by(id: params[:movie][:id])
        if movie
          movie.increment!(:like_counter)
          render json: movie
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end
      
      def destroy
        movie = Movie.find(params[:id])
        movie.destroy
        render json: { message: 'Movie deleted successfully' }
      end

      private

      def movie_params
        params.require(:movie).permit(:name, :like_counter)
      end
    end
  end
end