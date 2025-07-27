import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const education = [
  {
    school: 'University of Michigan - College of Engineering',
    degree: 'B.S.E. Computer Science',
    date: '2022 - 2026'
  },
  {
    school: 'University of Michigan - Ross School of Business',
    degree: 'B.B.A. Business Administration',
    date: '2022 - 2026'
  },
]

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/experiences.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading experiences...</div>;
  if (error) return <div>Error loading experiences: {error}</div>;

  return (
    <section id="experience" className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl font-bold mb-6">Work Experience</h2>
          <div className="relative border-l-2 border-zinc-300 pl-6">
            {experiences.map((job, idx) => (
              <motion.div 
                key={idx} 
                className="mb-10 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {/* Dot on timeline */}
                <div className="absolute -left-7.75 top-1.5 w-3 h-3 bg-zinc-300 rounded-full" />
                <div className="flex mb-1 text-zinc-400">
                    <CiCalendar className="text-xl mr-1" />
                    <p className="text-sm mr-4">{job.date}</p>
                    <CiLocationOn className="text-xl mr-1" />
                    <p className="text-sm">{job.location}</p>
                </div>
                <h3 className="text-xl font-semibold">{job.role}</h3>
                <p className="text-violet-400 font-medium">{job.company}</p>
                <div className="mt-2">
                    {job.description.map((desc, i) => (
                        <p key={i} className="text-zinc-300 mb-0.5"> • {desc}</p>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tools.map((tool, i) => (
                    <span key={i} className="border-violet-400 bg-violet-200 border-2 text-violet-900 text-sm px-2 py-1 rounded-full font-bold">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold mb-6">Education</h2>
          <div className="relative border-l-2 border-gray-300 pl-6">
            {education.map((edu, idx) => (
              <motion.div 
                key={idx} 
                className="mb-10 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {/* Dot on timeline */}
                <div className="absolute -left-7.75 top-1.5 w-3 h-3 bg-zinc-300 rounded-full" />
                <h3 className="text-xl font-semibold">{edu.school}</h3>
                <p className="text-violet-400 font-medium">{edu.degree}</p>
                <p className="text-sm text-zinc-400 mt-1">{edu.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
