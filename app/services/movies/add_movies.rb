module Movies
    class AddMovies

        def initialize(parameters)
            @parameters = parameters
        end
    
        def create_movie

            validate(["name"])

            movie = Movie.new()

            @parameters.each do |key, value|
                movie[key] = value
            end

            if movie.save
                return {json: movie, status: :created}
            else
                return return_error(:unprocessable_entity)
            end
        end

        def validate(required_params)
            required_params.each do |param|
                if @parameters[param].blank?
                    return_error(:bad_request)
                end
            end
        end

        def return_error(type)
            if type == :unprocessable_entity
                return { error: 'Movie not created', status: :unprocessable_entity}
            else
                return { error: 'Movie not created', status: :internal_server_error}
            end
        end

    end
end