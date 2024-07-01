import { useEffect, useRef } from 'react'

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform
} from 'framer-motion'
import Lenis from 'lenis'

import Images from './assets/mountain.jpg'

const Secion1 = ({
  scrollYProgress
}: {
  scrollYProgress: MotionValue<number>
}) => {
  const scale = useTransform(
    scrollYProgress,
    // Map scrollYProgress from these values:
    [0, 1],
    // Into these values:
    [1, 0.8]
  )

  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  return (
    <motion.div
      style={{ scale, rotate }}
      className="flex h-screen flex-col items-center justify-center bg-[#931a1a] pb-[10vh] font-serif text-[3vw] text-white"
    >
      <p>Scroll Perspective</p>

      <div className="flex gap-4">
        <p>Section</p>

        <div className="relative h-[6rem] w-[12.5vw] overflow-hidden">
          <img src={Images} alt="mountain" />
        </div>

        <p>Transition</p>
      </div>
    </motion.div>
  )
}

const Secion2 = ({
  scrollYProgress
}: {
  scrollYProgress: MotionValue<number>
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])
  return (
    <motion.div style={{ scale, rotate }} className="relative h-screen">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={Images}
        alt="mountain"
      />
    </motion.div>
  )
}

const App = () => {
  const container = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <main ref={container} className="relative h-[200vh] bg-gray-900">
      <Secion1 scrollYProgress={scrollYProgress}></Secion1>
      <Secion2 scrollYProgress={scrollYProgress}></Secion2>
    </main>
  )
}

export default App
