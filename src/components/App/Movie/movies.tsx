import NextImage from "next/image"

export function Movie({
  image,
  title,
}: {
  image: React.JSX.Element
  title: React.JSX.Element
}) {
  return (
    <div className="flex w-full items-center gap-4 lg:w-4/6 lg:gap-10">
      {image}
      <div className="flex flex-col gap-2 lg:w-8/12">{title}</div>
    </div>
  )
}

function Image({ image }: { image: string }) {
  return (
    <div className="flex lg:w-4/12">
      <div className="relative h-52 w-36 rounded-lg lg:h-96 lg:w-full">
        <NextImage src={image} alt="movie-image" className="rounded-lg" fill />
      </div>
    </div>
  )
}

function Title({ title }: { title: string }) {
  return (
    <h1 className="font-poppins text-sm font-medium lg:text-2xl">{title}</h1>
  )
}

function Plot({ plot }: { plot: string }) {
  return (
    <p className="text-xs tracking-wide text-slate-700 dark:text-white lg:w-96 lg:text-sm">
      {plot}
    </p>
  )
}

Movie.Image = Image
Movie.Title = Title
Movie.Plot = Plot
