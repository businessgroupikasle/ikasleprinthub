import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Printer, 
  Sparkles, 
  Scissors, 
  PackageCheck, 
  Cpu
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  num: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  specs: string[];
  equipment: string;
  position: {
    left: string;
    top: string;
  };
  labelPos: 'left' | 'right' | 'bottom' | 'top';
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'requirement',
    num: '01',
    title: 'Understanding Client Requirement',
    shortLabel: 'Client Requirement',
    subtitle: 'CONSULTATION & SPECS',
    desc: 'In-depth consultation to review your artwork, paper stock GSM, Pantone matching, finishing requirements, and schedule.',
    equipment: 'Pre-flight & Digital Soft Proofing',
    specs: ['Design DPI Audit', 'Paper Stock Selection', 'Color Proofing Approval'],
    icon: <Users size={28} />,
    position: { left: '42%', top: '18%' },
    labelPos: 'left',
  },
  {
    id: 'plate-making',
    num: '02',
    title: 'Plate Making (CTP)',
    shortLabel: 'Plate Making',
    subtitle: 'THERMAL LASER IMAGING',
    desc: 'High-precision Computer-to-Plate (CTP) thermal laser technology generates crystal-sharp aluminum printing plates for Cyan, Magenta, Yellow, and Key inks.',
    equipment: 'Thermal Laser CTP Imaging',
    specs: ['2400 DPI Micron Precision', 'Zero-Chemical Thermal CTP', '4-Color Separation'],
    icon: <Cpu size={28} />,
    position: { left: '76%', top: '16%' },
    labelPos: 'right',
  },
  {
    id: 'final-printing',
    num: '03',
    title: 'Final Printing (Offset & Digital)',
    shortLabel: 'Final Printing',
    subtitle: 'CORE PRODUCTION PRESS',
    desc: 'Precision multi-color offset and production digital systems calibrated with spectrophotometer ink monitoring to guarantee rich, vivid color consistency.',
    equipment: 'Commercial Offset & Digital Press',
    specs: ['Spectrophotometer In-line Scan', '15,000 Sheets/Hour', 'Pantone & Metallic Inks'],
    icon: <Printer size={36} />,
    position: { left: '58%', top: '48%' },
    labelPos: 'bottom',
  },
  {
    id: 'lamination',
    num: '04',
    title: 'Lamination',
    shortLabel: 'Lamination',
    subtitle: 'PROTECTIVE SURFACE COAT',
    desc: 'Thermal roll lamination applies ultra-gloss, soft matte, or velvet touch protective films that guard against moisture, fingerprints, and wear.',
    equipment: 'Automated Thermal Roll Laminator',
    specs: ['Matte & High-Gloss Film', 'Velvet Soft-Touch', 'Spot UV & Gold Foil Stamping'],
    icon: <Sparkles size={28} />,
    position: { left: '22%', top: '48%' },
    labelPos: 'left',
  },
  {
    id: 'binding-cutting',
    num: '05',
    title: 'Binding & Cutting',
    shortLabel: 'Binding & Cutting',
    subtitle: 'PRECISION FINISHING',
    desc: 'Computerized programmable hydraulic guillotines cut sheets to the millimeter, followed by precision creasing, folding, saddle-stitching, or perfect binding.',
    equipment: 'Hydraulic Micro-Cut Guillotine & Folding System',
    specs: ['Hydraulic Micron Trim', 'Precision Crease & Fold', 'Saddle & Perfect Binding'],
    icon: <Scissors size={28} />,
    position: { left: '42%', top: '80%' },
    labelPos: 'bottom',
  },
  {
    id: 'ready-delivery',
    num: '06',
    title: 'Ready to Delivery',
    shortLabel: 'Ready to Delivery',
    subtitle: 'QC & EXPRESS DISPATCH',
    desc: 'Every completed batch undergoes rigorous quality inspection, counts, and moisture-proof shrink wrapping before express doorstep delivery.',
    equipment: 'Automated Shrink Wrap & Express Dispatch Fleet',
    specs: ['100% Quality Inspection', 'Moisture-Proof Shrink Wrap', 'Safe Express Doorstep Dispatch'],
    icon: <PackageCheck size={28} />,
    position: { left: '76%', top: '80%' },
    labelPos: 'bottom',
  },
];

export const HowItWorksSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('final-printing');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through the 6 steps if user isn't hovering
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepId((prev) => {
        const currIdx = WORKFLOW_STEPS.findIndex((s) => s.id === prev);
        const nextIdx = (currIdx + 1) % WORKFLOW_STEPS.length;
        return WORKFLOW_STEPS[nextIdx].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        {/* Section Header */}
        <div className="workflow-section-header">
          <div className="section-tag yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span className="tag-star">✦</span>
            <span>CLOCKWISE MANUFACTURING CYCLE</span>
          </div>

          <h2 className="workflow-heading">
            Our Print Manufacturing Process
          </h2>

          <p className="workflow-subtext">
            From design consultation to laser plate making, core offset press printing, lamination, and precision binding — an interactive look at our production floor.
          </p>
        </div>

        {/* 100% CODE-BASED UI: CIRCULAR PRODUCTION WORKFLOW STAGE */}
        <div 
          className="production-cycle-canvas-card"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Ambient Glows */}
          <div className="canvas-radial-glow" />

          {/* DESKTOP VIEW: Radial Flow Canvas Area (Screens > 820px) */}
          <div className="desktop-cycle-stage">
            <div className="cycle-stage-viewport">
              {/* SVG Connecting Curved Dashed Arrows */}
              <svg 
                className="cycle-connectors-svg" 
                viewBox="0 0 900 640" 
                fill="none" 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Gold Arrowhead Marker */}
                  <marker
                    id="goldArrowhead"
                    markerWidth="12"
                    markerHeight="12"
                    refX="9"
                    refY="6"
                    orient="auto"
                  >
                    <path d="M0,2 L10,6 L0,10 L3,6 Z" fill="#FFB800" />
                  </marker>

                  {/* Active Cyan Arrowhead Marker */}
                  <marker
                    id="activeCyanArrowhead"
                    markerWidth="14"
                    markerHeight="14"
                    refX="10"
                    refY="7"
                    orient="auto"
                  >
                    <path d="M0,2 L12,7 L0,12 L4,7 Z" fill="#00D2FF" />
                  </marker>
                </defs>

                {/* 1. Step 1 (Client Requirement) ➔ Step 2 (Plate Making) [Top Arch] */}
                <path
                  d="M 430 115 C 495 65, 590 65, 635 95"
                  className={`cycle-arrow-path ${activeStepId === 'requirement' ? 'active-path' : ''}`}
                  markerEnd={activeStepId === 'requirement' ? 'url(#activeCyanArrowhead)' : 'url(#goldArrowhead)'}
                />

                {/* 2. Step 2 (Plate Making) ➔ Step 3 (Final Printing - Center) [Right Inward Sweep] */}
                <path
                  d="M 720 140 C 785 220, 740 310, 605 310"
                  className={`cycle-arrow-path ${activeStepId === 'plate-making' ? 'active-path' : ''}`}
                  markerEnd={activeStepId === 'plate-making' ? 'url(#activeCyanArrowhead)' : 'url(#goldArrowhead)'}
                />

                {/* 3. Step 3 (Final Printing - Center) ➔ Step 4 (Lamination) [Center-Left Downward] */}
                <path
                  d="M 440 320 C 370 345, 310 335, 255 310"
                  className={`cycle-arrow-path ${activeStepId === 'final-printing' ? 'active-path' : ''}`}
                  markerEnd={activeStepId === 'final-printing' ? 'url(#activeCyanArrowhead)' : 'url(#goldArrowhead)'}
                />

                {/* 4. Step 4 (Lamination) ➔ Step 5 (Binding & Cutting) [Left Downward Curve] */}
                <path
                  d="M 185 360 C 170 450, 240 510, 325 505"
                  className={`cycle-arrow-path ${activeStepId === 'lamination' ? 'active-path' : ''}`}
                  markerEnd={activeStepId === 'lamination' ? 'url(#activeCyanArrowhead)' : 'url(#goldArrowhead)'}
                />

                {/* 5. Step 5 (Binding & Cutting) ➔ Step 6 (Ready to Delivery) [Bottom Arc] */}
                <path
                  d="M 430 510 C 490 530, 560 530, 625 510"
                  className={`cycle-arrow-path ${activeStepId === 'binding-cutting' ? 'active-path' : ''}`}
                  markerEnd={activeStepId === 'binding-cutting' ? 'url(#activeCyanArrowhead)' : 'url(#goldArrowhead)'}
                />
              </svg>

              {/* 6 Interactive Nodes Positioned Absolutely */}
              {WORKFLOW_STEPS.map((step) => {
                const isActive = activeStepId === step.id;
                const isCenter = step.id === 'final-printing';

                return (
                  <div
                    key={step.id}
                    className={`cycle-node-wrapper ${step.id} ${isActive ? 'active' : ''} ${isCenter ? 'center-hub' : ''} label-${step.labelPos}`}
                    style={{ left: step.position.left, top: step.position.top }}
                    onClick={() => setActiveStepId(step.id)}
                    onMouseEnter={() => setActiveStepId(step.id)}
                  >
                    {/* Outer Golden Glow Ring */}
                    <div className="node-glow-ring" />

                    {/* Golden Yellow Circle Badge with Vector Graphic */}
                    <div className="node-circle-badge">
                      <div className="node-badge-num">{step.num}</div>
                      <div className="node-icon-wrap">
                        {step.icon}
                      </div>

                      {/* Decorative Ink Drops for Center Press */}
                      {isCenter && (
                        <div className="cmyk-dot-row">
                          <span className="dot c" />
                          <span className="dot m" />
                          <span className="dot y" />
                          <span className="dot k" />
                        </div>
                      )}
                    </div>

                    {/* Node Label Text */}
                    <div className="node-text-plate">
                      <span className="node-title-main">{step.shortLabel}</span>
                      <span className="node-subtitle-tag">{step.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE VIEW: High-Precision Connected Process Flow (Screens <= 820px) */}
          <div className="mobile-workflow-stage">
            {/* Stage Selector Stepper */}
            <div className="mobile-step-nav" role="tablist" aria-label="Workflow Stages">
              {WORKFLOW_STEPS.map((step) => {
                const isActive = activeStepId === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`mobile-nav-pill ${isActive ? 'active' : ''}`}
                    aria-selected={isActive}
                    role="tab"
                    title={`Stage ${step.num}: ${step.shortLabel}`}
                  >
                    <span className="pill-num">{step.num}</span>
                    <span className="pill-dot" />
                  </button>
                );
              })}
            </div>

            {/* Connected Vertical Timeline */}
            <div className="mobile-timeline-track">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeStepId === step.id;
                const isLast = idx === WORKFLOW_STEPS.length - 1;

                return (
                  <div
                    key={step.id}
                    className={`mobile-timeline-node ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStepId(step.id)}
                  >
                    {/* Left Spine: Yellow Badge + Vertical Glow Line */}
                    <div className="mobile-node-rail">
                      <div className="mobile-circle-badge">
                        <span className="mobile-badge-num">{step.num}</span>
                        <div className="mobile-icon-wrap">
                          {step.icon}
                        </div>
                      </div>
                      {!isLast && <div className={`mobile-rail-line ${isActive ? 'active-line' : ''}`} />}
                    </div>

                    {/* Right Content Card */}
                    <div className="mobile-node-content-card">
                      <div className="mobile-card-header">
                        <div className="mobile-title-group">
                          <span className="mobile-card-subtitle">{step.subtitle}</span>
                          <h3 className="mobile-card-title">{step.title}</h3>
                        </div>
                        <span className="mobile-expand-icon">
                          {isActive ? '−' : '+'}
                        </span>
                      </div>

                      {/* Expandable Technical Specs & Equipment */}
                      {isActive && (
                        <div className="mobile-card-body">
                          <p className="mobile-card-desc">{step.desc}</p>
                          
                          <div className="mobile-equipment-box">
                            <span className="eq-label">EQUIPMENT</span>
                            <span className="eq-name">{step.equipment}</span>
                          </div>

                          <div className="mobile-specs-row">
                            {step.specs.map((spec, sIdx) => (
                              <span key={sIdx} className="mobile-spec-tag">
                                <span className="spec-bullet">✓</span>
                                <span>{spec}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


