
from ariadne import gql, QueryType, make_executable_schema

type_defs = gql(open("schema.graphql", "r").read())
query = QueryType()

@query.field("hello")
def hello(_, info):
  return "Hello, World!"

Schema = make_executable_schema(type_defs, query)