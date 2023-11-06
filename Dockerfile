FROM ruby:3.1.0

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Install the Bundler gem to manage app dependencies
RUN gem install bundler

# Copy the Gemfile and Gemfile.lock to the working directory
COPY Gemfile* ./

# Install the gems specified in the Gemfile
RUN bundle install

# Add the current directory (.) to the /docker/app directory in the container
ADD . /docker/app

# Set a build-time variable DEFAULT_PORT with a default value of 3000
ARG DEFAULT_PORT=3000

# Inform Docker that the container listens on the specified network port at runtime
EXPOSE ${DEFAULT_PORT}

# Specify the command to be executed when the Docker container starts. 
# In this case, it's running the Puma server for the Ruby application using the 'config.ru' configuration file.
CMD [ "bundle","exec", "puma", "config.ru"]