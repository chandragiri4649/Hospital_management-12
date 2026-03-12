import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Users, Stethoscope, CreditCard, Pill, FlaskConical, Video, 
  BarChart3, Building2, Shield, ChevronRight, Activity, Menu, 
  Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, 
  Youtube, Heart, Calendar, FileText, Database, Cloud, Server,
  Smartphone, Globe, Lock, Award, Clock, TrendingUp, Key,
  ClipboardCheck, Smartphone as Mobile, Users as UserCheck
} from "lucide-react";
import { featureDetails } from '../../utils/featureDetails';

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Convert featureDetails to featuresData for cards
  const featuresData = Object.values(featureDetails).map(feature => ({
    id: feature.id,
    icon: feature.icon,
    title: feature.title,
    description: feature.description,
    color: feature.color,
    stats: Object.values(feature.stats)[0],
    additionalPoints: feature.additionalPoints
  }));

  // Benefits data remains the same
  const benefitsData = [
    {
      icon: TrendingUp,
      title: "45% Operational Efficiency",
      description: "Streamline workflows and reduce administrative overhead",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "99.9% Uptime",
      description: "Reliable cloud infrastructure with zero downtime guarantee",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "60% Time Savings",
      description: "Automate routine tasks and focus on patient care",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security with end-to-end encryption",
      color: "from-gray-600 to-gray-800"
    }
  ];

  // Tech stack data remains the same
  const techStackData = [
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "AWS & Azure powered infrastructure",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Bank-level Security",
      description: "HIPAA & GDPR compliant",
      color: "green"
    },
    {
      icon: Mobile,
      title: "Mobile First",
      description: "iOS & Android apps",
      color: "purple"
    },
    {
      icon: Database,
      title: "Real-time Analytics",
      description: "Live dashboards & AI insights",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero - FIXED SECTION */}
      <section className="py-12 mt-12 px-4 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Static Background Elements */}
        <div className="absolute top-10 left-5% opacity-10">
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-red-400" />
        </div>
        <div className="absolute bottom-10 right-5% opacity-10">
          <Stethoscope className="w-10 h-10 md:w-14 md:h-14 text-blue-400" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-blue-200">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Complete Healthcare Solution</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Complete Hospital Management Suite
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your healthcare facility with our comprehensive, AI-powered management platform designed for modern medical practices
          </p>
          
          {/* FIXED BUTTON CONTAINER */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Request Demo
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/pricing" 
              className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid - Clickable Cards */}
      <section className="py-10 bg-white px-4 sm:px-2">
        <div className="max-w-7xl mx-auto md:px-8 sm:px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Feature Suite
            </h2>
            <p className="text-gray-600">
              Everything you need to streamline operations, enhance patient care, and grow your healthcare practice.
              Click on any feature card to learn more about its capabilities and benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {featuresData.map((feature, index) => (
              <Link 
                key={feature.id}
                to={`/features/${feature.id}`}
                className="block no-underline hover:no-underline"
              >
                <AnimatedFeatureCard
                  feature={feature}
                  index={index}
                  isHovered={hoveredCard === index}
                  onHover={() => setHoveredCard(index)}
                  onLeave={() => setHoveredCard(null)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DCM Hospital Management?
            </h2>
            <p className="text-gray-600">
              Experience measurable improvements across all departments with our proven platform.
              Our comprehensive SaaS solution is designed specifically for multi-speciality hospitals,
              offering complete workflow automation and real-time data visibility to enhance clinical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Features Section */}
      <section className="py-10 md:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Feature Overview
            </h2>
            <p className="text-lg text-gray-600">
              Learn how each feature transforms healthcare operations and improves patient care.
              Our platform delivers complete hospital management capabilities as per the requirements,
              with intuitive interfaces and powerful automation to enhance clinical and administrative workflows.
            </p>
          </div>

          {/* Patient Management */}
          <EnhancedFeatureDetailSection
            badgeIcon={<Users className="w-4 h-4" />}
            badgeText="Patient Management"
            title="Streamline Patient Care Journey"
            description="Our comprehensive patient management system transforms the entire patient journey from initial registration through treatment and follow-up care, ensuring seamless coordination across all departments with AI-powered automation and real-time tracking."
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwcmVnaXN0cmF0aW9uJTIwc3lzdGVtfGVufDB8fHx8MTc2MjUyNzA0Nnww&ixlib=rb-4.1.0&q=85"
            capabilities={[
              "Complete patient registration with demographic and insurance information",
              "Digital medical history and comprehensive health records management",
              "Intelligent appointment scheduling with automatic conflict resolution",
              "OPD/IPD management with discharge and therapy tracking",
              "Centralized document management for lab reports and prescriptions",
              "Secure patient portal for medical records access and appointment booking",
              "Automated reminders for appointments, medications, and follow-ups",
              "Multi-language support and accessibility features for diverse patient needs"
            ]}
            benefits={["40% Faster Registration", "60% Reduced No-Shows", "95% Patient Satisfaction", "HIPAA Compliant"]}
            stats={[
              { value: "40%", label: "Faster Registration" },
              { value: "60%", label: "Reduced No-Shows" },
              { value: "95%", label: "Patient Satisfaction" }
            ]}
          />

          {/* Doctor Portal */}
          <EnhancedFeatureDetailSection
            badgeIcon={<Stethoscope className="w-4 h-4" />}
            badgeText="Doctor Portal"
            title="Empower Healthcare Professionals"
            description="Our doctor portal provides healthcare professionals with an intuitive dashboard to manage their practice efficiently while maintaining focus on patient care and clinical excellence. Streamline workflows and enhance collaboration."
            image="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0YWx8ZW58MHx8fHwxNzYyMzMzNjEwfDA&ixlib=rb-4.1.0&q=85"
            capabilities={[
              "Secure login with individual doctor credentials and authentication",
              "Smart appointment calendar with real-time updates and notifications",
              "Digital prescription creation with intelligent drug interaction alerts",
              "Comprehensive access to complete patient medical history",
              "Advanced treatment plan documentation and progress tracking",
              "Integrated lab test ordering and instant result viewing",
              "Queue management and appointment dashboard for efficient workflow",
              "Mobile app access for on-the-go patient management"
            ]}
            benefits={["30% Time Savings", "Enhanced Collaboration", "98% Reduced Errors", "Mobile Access"]}
            stats={[
              { value: "30%", label: "Time Savings" },
              { value: "98%", label: "Error Reduction" },
              { value: "24/7", label: "Mobile Access" }
            ]}
            reverse
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 50+ healthcare facilities already using DCM Hospital Management System
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg w-full sm:w-auto"
            >
              Request Demo
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/pricing" 
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg w-full sm:w-auto"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-10 bg-white md:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Healthcare Technology
            </h2>
            <p className="text-gray-600">
              Leveraging cutting-edge technology to deliver superior healthcare management solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {techStackData.map((tech, index) => (
              <TechCard key={tech.title} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Animated Feature Card Component - Now clickable
function AnimatedFeatureCard({ feature, index, isHovered, onHover, onLeave }) {
  const IconComponent = feature.icon;

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Elegant Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>
      
      {/* Floating Particle Animation */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 group-hover:translate-x-8 group-hover:translate-y-8`}></div>
      </div>

      <div className="relative p-6 h-full flex flex-col">
        {/* Icon with Floating Effect */}
        <div className="relative mb-5">
          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg transition-all duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl`}>
            <IconComponent size={24} />
          </div>
        </div>

        {/* Content with Elegant Typography */}
        <div className="space-y-4 flex-grow">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-400">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-sm">
            {feature.description}
          </p>
          
          {/* Features List with Staggered Animation */}
          <div className="space-y-2.5 mt-4">
            {feature.additionalPoints && feature.additionalPoints.slice(0, 4).map((point, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{transitionDelay: `${idx * 100}ms`}}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-sm text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-200 transition-all duration-500"></div>

        {/* Stats with Click Indicator */}
        <div className="flex items-center justify-between mt-auto">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-400">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} text-white flex items-center justify-center`}>
              <TrendingUp size={14} />
            </div>
            <span className="font-semibold text-blue-700 text-sm">{feature.stats}</span>
          </div> */}
          
          {/* Click indicator */}
          <div className="flex items-center gap-1 text-sm text-blue-600 opacity-200 group-hover:opacity-100 transition-opacity duration-300 mt-3">
            <span className="text-sm">Details</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </div>
  );
}

// Enhanced Feature Detail Section
function EnhancedFeatureDetailSection({ 
  badgeIcon, 
  badgeText, 
  title, 
  description, 
  image, 
  capabilities, 
  benefits, 
  stats,
  reverse = false 
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 last:mb-0 ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      {/* Content */}
      <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          {badgeIcon}
          {badgeText}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h3>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 py-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Capabilities */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Key Capabilities:</h4>
          <ul className="space-y-3">
            {capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600 shadow-sm">
          <div className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            Key Benefits
          </div>
          <div className="flex flex-wrap gap-2">
            {benefits.map((benefit, index) => (
              <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base">
            Request Demo
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link 
            to={`/features/${badgeText.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm md:text-base"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
        <div className="rounded-2xl overflow-hidden shadow-2xl group">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Static Image Overlay */}
          <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({ benefit, index }) {
  const IconComponent = benefit.icon;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-gray-600 text-sm">{benefit.description}</p>
    </div>
  );
}

// Tech Card Component
function TechCard({ tech, index }) {
  const IconComponent = tech.icon;
  
  return (
    <div className="bg-white rounded-xl p-4 text-center border border-gray-200 group hover:shadow-lg transition-all duration-300">
      <IconComponent className={`w-8 h-8 mx-auto mb-3 text-${tech.color}-600`} />
      <h3 className="font-semibold text-gray-900 text-sm mb-1">{tech.title}</h3>
      <p className="text-gray-600 text-xs">{tech.description}</p>
    </div>
  );
}