
import { Link } from "react-router-dom"
const Movie = ({passeddata}) => {
  return (
    <div className=" pt-10 flex gap-4 item-center max-w-96 ">
      <div  className="group relative block bg-black">
  <img
    alt="Developer"
    src={passeddata?.Poster}
    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
  />

  <div className="relative p-4 sm:p-6 lg:p-8">
    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">{passeddata?.Genre}</p>

    <p className="text-xl font-bold text-white sm:text-2xl">{passeddata?.Title}</p>

    <div className="mt-32 sm:mt-48 lg:mt-64">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
        {passeddata?.Plot}
        </p>
        <Link to={`/about/${passeddata?.imdbID}`}><button className="bg-white px-10 py-3">Know More</button></Link> 
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Movie
