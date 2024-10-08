import { HERO_CONTENT } from "../constants"

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto border-b-2">
            <div className="flex flex-col items-center my-20">
                <h1 id="logo" className="text-6xl lg:text-[10rem] p-2 uppercase font-text-fraunces">
                    {HERO_CONTENT.title}
                </h1>
                <p className="lg:mt-6 text-medium mb-4 font-medium tracking-tighter">
                    {HERO_CONTENT.subtitle}
                </p>
                <img src={HERO_CONTENT.image} className="w-full h-[75vh] object-cover rounded-2xl p-2" alt="Hero"/>
            </div>
        </section>
    )
}

export default Hero