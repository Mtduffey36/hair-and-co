import { REVIEWS } from "../constants"

const Reviews = () => {
    return (
        <section className="max-w-7xl mx-auto border-b-2" id="reviews">
            <div className="my-20">
                <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase mb-12">
                    Client Reviews
                </h2>
                <p className="max-w-2xl text-lg mb-12 text-center mx-auto">
                    {REVIEWS.text}
                </p>
                <div className="flex flex-wrap justify-center">
                    {REVIEWS.reviews.map((review, index) => (
                      <div key={index} className="mt-5 flex flex-col items-center justify-center
                      rounded-2xl border border-neutral-300 p-5 mx-2 max-w-xs text-white bg-rosy-brown">
                          <p className="mb-4">{review.review}</p>
                          <div classname="flex items-center mt-4">
                             
                            <div>
                                <p className="text-sm font-bold">{review.name}</p>
                                <p className="text-sm text-neutral-500">{review.title}</p>
                            </div>
                          </div> 
                          </div> 
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Reviews