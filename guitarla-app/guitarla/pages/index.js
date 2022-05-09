import List from '../components/List'
import Course from '../components/Course'
import Layout from '../components/Layout'

const Home = ({ guitars, courses, blogs }) => {
  return (
    <Layout page="inicio">
      <main className="contenedor">
        <h1 className="heading">Nuestra Colección</h1>
        <List guitars={guitars}></List>
        <Course course={courses}/>
      </main>
    </Layout>
  )
}

export async function getServerSideProps () {
  const urlGuitars = `${process.env.API_URL}/guitars?_sort=price:desc`
  const urlCourses = `${process.env.API_URL}/courses`
  const urlBlogs = `${process.env.API_URL}/blogs?_limit=3&_sort=created_at:desc`

  const [resGuitars, resCourses, resBlogs] = await Promise.all([
    fetch(urlGuitars),
    fetch(urlCourses),
    fetch(urlBlogs)
  ])

  const [guitars, courses, blogs] = await Promise.all([
    resGuitars.json(),
    resCourses.json(),
    resBlogs.json()
  ])

  return {
    props: {
      guitars,
      courses,
      blogs
    }
  }
}

export default Home