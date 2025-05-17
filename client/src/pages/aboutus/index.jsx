import { BookOpen, Users, Target, Trophy } from "lucide-react";

function AboutUsPage() {
  return (
    <div className="bg-white text-gray-800 py-10 px-4 md:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Revoc Learning</h1>
        <p className="text-lg text-gray-600 mb-10">
          Empowering learners with flexible, high-quality education to achieve their goals — anytime, anywhere.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-6">
          <Target className="text-blue-500 w-10 h-10 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
        </div>
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          At Revoc Learning, our mission is to bridge the gap between ambition and knowledge.
          We provide accessible, engaging, and impactful online education that caters to learners of all levels across the globe.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <BookOpen className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="text-lg font-medium mb-2">Expert Content</h3>
          <p className="text-sm text-gray-600 text-center">
            Learn from certified instructors and industry professionals.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <Users className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="text-lg font-medium mb-2">Community Driven</h3>
          <p className="text-sm text-gray-600 text-center">
            Join a growing community of learners and share knowledge.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <Trophy className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="text-lg font-medium mb-2">Achievements</h3>
          <p className="text-sm text-gray-600 text-center">
            Get recognized with certifications and track your growth.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <Target className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="text-lg font-medium mb-2">Goal Oriented</h3>
          <p className="text-sm text-gray-600 text-center">
            Build your skills with purpose and direction.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to start learning?</h2>
        <p className="text-gray-600 mb-6">Explore courses, track your progress, and unlock your full potential.</p>
        <a
          href="/courses"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Browse Courses
        </a>
      </div>
    </div>
  );
}

export default AboutUsPage;
