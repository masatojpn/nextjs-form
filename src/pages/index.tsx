import type { NextPage } from 'next'
import { Form } from '@/containers/Form';
const Home: NextPage = () => {
  return (
    <>
			<h1 className="text-3xl font-bold">
        Hello, World
      </h1>
			<Form />
		</>
  )
}

export default Home
