import Image from "next/image";

export default function MovieSection({ image, title, plot, casts }) {
  return (
    <div className="flex w-11/12 items-center gap-4 lg:w-4/6 lg:gap-10">
      {image}
      <div className="flex flex-col gap-2 lg:w-8/12">
        {title}
        {plot}
        {casts}
      </div>
    </div>
  );
}

function ImageSection({ image }) {
  return (
    <div className="flex lg:w-4/12">
      <div className="relative h-40 w-[120px] rounded-lg lg:h-96 lg:w-full">
        <Image src={image} alt="movie-image" fill className="rounded-lg" />
      </div>
    </div>
  );
}

function Title({ title }) {
  return (
    <h1 className="font-poppins text-sm font-medium lg:text-2xl">{title}</h1>
  );
}

function Plot({ plot }) {
  return (
    <p className="text-xs tracking-wide text-neutral-600 lg:w-96 lg:text-sm">
      {plot}
    </p>
  );
}

function Casts({ casts }) {
  const selectedCasts = casts.filter((actor, index) => index < 5);
  return (
    <div className="hidden w-full flex-col gap-1.5 lg:flex">
      <span className="font-poppins text-sm font-medium">Casts</span>
      <div className="flex items-center gap-2 overflow-x-scroll">
        {selectedCasts.map((cast) => (
          <div key={cast.id} className="flex flex-col items-center gap-1.5">
            <div className="relative h-48 w-36">
              <Image
                src={cast.image}
                alt="actor-image"
                className="rounded-lg"
                fill
                quality={50}
              />
            </div>
            <span className="text -sm">{cast.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

MovieSection.Image = ImageSection;
MovieSection.Title = Title;
MovieSection.Casts = Casts;
MovieSection.Plot = Plot;
