import Link from "next/link"

type IProps = {
  title: string,
  subtitle: string,
  href: string,
  image: string,
}

export const SectionButton = ({ title, subtitle, href, image }: IProps) => {
  return (
    <Link href={href}>
      <div className="section-btn bg-primary-300">
        <div className="w-full pt-[100%] relative border bg-black">
          <img className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity opacity-25" src={image} alt={title} />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <div className="section-btn-title text-primary-300 font-normal text-center">{title}</div>
            <div className="section-btn-subtitle max-w-full bg-primary-300 text-light text-sm text-center">{subtitle}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}