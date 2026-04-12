import { HeroSection } from '../components/landing/HeroSection'
import { AnimatedPathSection } from '../components/landing/AnimatedPathSection'
import { BentoGrid } from '../components/landing/BentoGrid'
import { CoursePreview } from '../components/landing/CoursePreview'
import { Testimonials } from '../components/landing/Testimonials'
import { ComparatorPreview } from '../components/landing/ComparatorPreview'

interface LandingPageProps {
  openAuthModal: (mode: 'login' | 'register') => void
}

export function LandingPage({ openAuthModal }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection openAuthModal={openAuthModal} />
      <AnimatedPathSection />
      <BentoGrid />
      <CoursePreview openAuthModal={openAuthModal} />
      <Testimonials />
      <ComparatorPreview />
    </div>
  )
}
