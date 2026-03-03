const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-20">
      <h1 className="text-4xl font-bold mb-6">About EasyCycle</h1>
      
      <p className="text-lg text-gray-700 mb-5">
        <strong>EasyCycle</strong> is a modern, digital solution designed to address a common problem faced by students on college campuses — the sudden unavailability of bicycles when most needed. Whether it's a personal cycle breakdown, relocating to campus, or being a newcomer without a bicycle, EasyCycle ensures every student has access to a cycle when required.
      </p>
      
      <p className="text-gray-700 mb-5">
        With the growing need for sustainable and efficient transportation inside large campuses, our application provides an intelligent and streamlined way to borrow and return shared cycles. The goal is simple: promote eco-friendly travel, reduce waiting times, and support students with instant access to transport.
      </p>
      
      <h2 className="text-2xl font-semibold  mb-3">Key Features:</h2>
      <ul className="list-disc list-inside text-gray-700 mb-5 space-y-2">
        <li>📍 Real-time cycle availability tracking</li>
        <li>🔐 Secure student login using Firebase Authentication</li>
        <li>🕒 Quick cycle reservation and return system</li>
        <li>📊 Usage history and time-based analytics</li>
      </ul>

      <h2 className="text-2xl font-semibold  mb-3">How It Works:</h2>
      <p className="text-gray-700 mb-5">
        Students can log in using their college credentials, check for available cycles on campus, and book one with just a few clicks. Once finished, they return the cycle at designated stations, and the system updates the availability instantly. Admins or campus coordinators can manage inventory, monitor usage trends, and maintain the system efficiently through a dedicated admin panel.
      </p>

      <h2 className="text-2xl font-semibold  mb-3">Built With Modern Tech:</h2>
      <p className="text-gray-700 mb-5">
        EasyCycle is built using <strong>React.js</strong> for a fast and interactive user interface and <strong>Firebase</strong> for authentication, real-time database, and cloud functions. This makes the app scalable, reliable, and secure for student data and transactions.
      </p>

      <h2 className="text-2xl font-semibold  mb-3">Why EasyCycle?</h2>
      <p className="text-gray-700 mb-5">
        Most students rely on bicycles as their primary mode of transport inside college campuses. A flat tire, stolen or lost cycle, or moving in without one can cause daily inconvenience. EasyCycle bridges that gap by making cycle-sharing hassle-free, fast, and always available. It reduces cycle hoarding and promotes sharing culture while making the commute smarter and greener.
      </p>

      <p className="text-md text-gray-600 mt-10 italic">
        Together, let’s make our campus more mobile, connected, and sustainable — one cycle at a time.
      </p>
    </div>
  );
};

export default About;
