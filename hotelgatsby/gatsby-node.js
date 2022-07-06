exports.createPages = async ({ actions, graphql, reporter }) => {
  const res = await graphql(`
    query {
      allDatoCmsRoom {
        nodes {
          slug
        }
      }
    }
  `)

  if (res.errors) {
    reporter.panic("failed", res.errors)
  }
  const rooms = res.data.allDatoCmsRoom.nodes

  rooms.forEach(room => {
    actions.createPage({
      path: room.slug,
      component: require.resolve("./src/components/rooms.js"),
      context: {
        slug: room.slug,
      },
    })
  })
}
