import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center px-6 pt-32">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - TEXT */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Evolve Your Ideas Into <br />
              <span className="text-purple-400">
                Intelligent Websites
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300">
              Describe your idea. Watch it transform into a live website.
              Modify. Collaborate. Evolve.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                Get Started
              </button>
              <button className="px-6 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-lg transition">
                Explore Demo
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - 3D Preview Mock */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-purple-400 mb-4">
                Live Website Preview
              </h3>
              <div className="h-64 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center text-gray-400">
                3D Website Preview Coming Soon
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Landing;
