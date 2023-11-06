Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # Define the route for the index for movie_controller and the route for the create method
  namespace :api do
    namespace :v1 do
      resources :movies, only: [:index, :create, :destroy, :show] do
        post 'increment_likes', on: :collection
      end
    end
  end

end
