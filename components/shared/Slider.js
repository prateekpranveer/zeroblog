import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PostCard from "../home/PostCard";

export default function Slider({ posts = [], title }) {
  if (!posts?.length)
    return <p className="text-gray-500 px-4">No Posts Available!</p>;

  return (
    <section className="mt-8" role="region">
      <h2 className="text-3xl mb-8 mt-12">
        {title && title.charAt(0).toUpperCase() + title.slice(1)}
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation
        lazy="true"
        spaceBetween={12}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.slug || post.id} className="pb-2">
            <PostCard postCardDetails={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
