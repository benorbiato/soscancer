import React from 'react'
import { MainLayout } from '@/components/layouts/main-layout'
import { Hero, Mission, Values, Services, CallToAction, Contact } from './components'

export function About() {
  return (
    <MainLayout className="py-16">
      <Hero />
      <Mission />
      <Values />
      <Services />
      <CallToAction />
      <Contact />
    </MainLayout>
  )
}
