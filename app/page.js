import Feed from "@/components/Feed";

const Home = () => (
  <section className="w-full font-poppins flex-center flex-col p-0">
    <h1 className="head_text text-center p-0">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        {" "}
        Inspire others with your words.
      </span>
    </h1>
    <p className="desc text-center font-poppins">
      Tell the world something good and inspire friends and family
    </p>

    <Feed />
  </section>
);

export default Home;
