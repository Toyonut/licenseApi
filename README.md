# licenseApi
An API to retrieve licenses for your project.

# What is it?
Simple express API with a postgres DB backend to store the license information. Might eventually convert it to a sqlite DB and run it all in a single container or maybe set it up as a pair of docker containers or something.


The idea is that there could be simple command line apps to make a fetch a license for an existing project, or project generatorscould call the license api and include a license as part of project generation.
