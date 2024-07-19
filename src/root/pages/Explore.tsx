import { Input } from "../../components/ui/input";
import GridPostList from "../../components/GridPostList";
import { useGetPosts } from "../../react-query/queries";
import Loader from "../../components/Loader";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function Explore() {
  const { data: posts, isSuccess, hasNextPage, fetchNextPage } = useGetPosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("##");
      fetchNextPage();
    }
  }, [inView]);

  console.log("posts", posts);
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="px-3">
        <h1 className="text-xl lg:text-2xl font-bold py-10">Explore</h1>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="shad-input focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex justify-between w-full mt-16 mb-7 px-3">
        <h3 className="font-bold text-lg">Popular Today</h3>

        <div className="flex justify-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-sm text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-5 sm:gap-9 w-full ">
        {isSuccess &&
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Explore;
