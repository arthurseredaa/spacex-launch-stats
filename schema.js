const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const { api } = require("./api/api");

// Laucnh type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
    links: { type: LinksType },
    details: { type: GraphQLString },
  }),
});

const LinksType = new GraphQLObjectType({
  name: "Link",
  fields: () => ({
    mission_patch_small: { type: GraphQLString },
    video_link: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) },
  }),
});

// Rocket type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
    success_rate_pct: { type: GraphQLInt },
    first_flight: { type: GraphQLString },
    description: { type: GraphQLString },
    diameter: {
      type: new GraphQLObjectType({
        name: "Diameter",
        fields: () => ({
          meters: { type: GraphQLString },
          feet: { type: GraphQLString },
        }),
      }),
    },
    mass: {
      type: new GraphQLObjectType({
        name: "Mass",
        fields: () => ({
          kg: { type: GraphQLString },
          lb: { type: GraphQLString },
        }),
      }),
    },
    height: {
      type: new GraphQLObjectType({
        name: "Height",
        fields: () => ({
          meters: { type: GraphQLString },
          feet: { type: GraphQLString },
        }),
      }),
    },
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve: (parent, args) => {
        return api.getLauches();
      },
    },
    launch: {
      type: LaunchType,
      args: { flight_number: { type: GraphQLInt } },
      resolve: (parent, { flight_number }) => {
        return api.getLaunch(flight_number);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve: (parent, args) => {
        return api.getRockets();
      },
    },
    rocket: {
      type: RocketType,
      args: { rocket_id: { type: GraphQLString } },
      resolve: (parent, { rocket_id }) => {
        return api.getRocket(rocket_id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
