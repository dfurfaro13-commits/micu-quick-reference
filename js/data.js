// All clinical content below is transcribed or condensed from the cited source documents. Do not add outside content.
function pg(id, n, w, h, titles) {
  return Array.from({ length: n }, (_, i) => ({ img: `docs/${id}/page-${i + 1}.png`, title: (titles || {})[i + 1] || "", w, h }));
}

window.CATEGORIES = ["Resuscitation & shock", "Infection", "Death, donation & ethics"];

window.TOPICS = [
  {
    id: "ecpr",
    category: "Resuscitation & shock",
    title: "ECPR",
    summary: "ECPR Pathway Criteria, IHCA criteria, OB arrest workflow",
    tags: "ecpr ecmo cpr cardiac arrest ihca ohca ed arrest peripartum or arrest obstetric code blue cannulation cath lab",
    source: { file: "ECPR.pdf", pages: 3, version: "No version or date stated in source" },
    pdf: "docs/ecpr/ECPR.pdf",
    pages: pg("ecpr", 3, 792, 612, { 1: "ECPR Pathway Criteria", 2: "Consideration for ECPR in IHCA", 3: "OB Cardiac Arrests Identified for ECPR" }),

    views: [
      {
        id: "ob",
        title: "OB cardiac arrest ECPR workflow",
        note: "Source: page 3, \"OB Cardiac Arrests Identified for ECPR\".",
        page: 2,
        columns: [
          { name: "FICU Team to L&D", steps: [
            "FICU RN activates EMS \"ECMO CPR\"",
            "Decision for ECPR <10m",
            "ECPR Activation (p32005)",
            "Mech CPR ASAP"
          ]},
          { name: "OB Resuscitation", steps: [
            "Call Code Blue",
            "Resus with modified recs",
            "Resuscitative delivery <5m"
          ]},
          { name: "Transport to Cath Lab", steps: [
            "Resus per FICU MD",
            "LUCAS in place",
            "Transport: RT, FICU RN + MD",
            "CCL goal <30m"
          ]},
          { name: "Cath Lab: Cannulation", steps: [
            "Workflow echoes all ECMO: Cath Lab and ICU teams work in conjunction",
            "Consider DPC, venting, LHC, RHC"
          ]},
          { name: "Post Cannulation", steps: [
            "CCU Admission",
            "ECMO Care",
            "Debrief"
          ]}
        ]
      }
    ],

    tool: {
      id: "ihca-check",
      title: "IHCA ECPR Quick Check",
      note: "Source: page 2, \"Consideration for ECPR in IHCA\". Mark criteria that are present. This tool does not give a recommendation.",
      page: 1,
      flow: [
        "Code Blue for Cardiac Arrest",
        "ACLS Protocol + Standard Code Blue Procedures",
        "No ROSC at **> 5 minutes**, CVICU intensivist reviews criteria"
      ],
      inclusion: {
        title: "Inclusion Criteria",
        items: [
          { id: "i1", text: "Witnessed Arrest" },
          { id: "i2", text: "Age 18-70*" },
          { id: "i3", text: "Mechanical CPR" },
          { id: "i4", text: "Likely reversible cause", ref: "reversible" },
          { id: "i5", text: "Deemed candidate by intensivist" }
        ]
      },
      exclusion: {
        title: "Exclusion Criteria",
        items: [
          { id: "e1", text: "Age > 70 years" },
          { id: "e2", text: "Suspected hemorrhage" },
          { id: "e3", text: "Contraindications: See #2, 3, 4 below", ref: "contra" },
          { id: "e4", text: "Not a candidate per intensivist" }
        ]
      },
      reference: [
        { id: "reversible", num: 1, title: "Witnessed + Reversible Causes of Arrest", tone: "green", items: [
          "Acute Coronary Syndrome",
          "Cardiogenic Shock",
          "Massive PE",
          "Refractory VT/pVT/VF",
          "Massive Aspiration",
          "Suspected cardiac drug overdose (BB, CCB)",
          "Electrolyte Derangement (K, Mg)"
        ]}
      ],
      contra: [
        { num: 2, title: "Neuro + Functional Deficits", items: [
          { id: "c2a", text: "History of Dementia" },
          { id: "c2b", text: "Prior Stroke w/ residual deficit" },
          { id: "c2c", text: "Impaired ADLs" },
          { id: "c2d", text: "CPC > 2" },
          { id: "c2e", text: "Major head trauma or neurosurgery in ≤ 30 days" }
        ]},
        { num: 3, title: "Severe Co-Morbidities", items: [
          { id: "c3a", text: "ESRD" },
          { id: "c3b", text: "Cirrhosis" },
          { id: "c3c", text: "Chronic Respiratory Failure" },
          { id: "c3d", text: "Cancer: predicted < 1 year survival" }
        ]},
        { num: 4, title: "Contraindications to ECMO", items: [
          { id: "c4a", text: "Severe Peripheral Vascular Dz" },
          { id: "c4b", text: "Severe Aortic Regurgitation/Aortic Dissection" },
          { id: "c4c", text: "Recent or Current Intracranial Hemorrhage" },
          { id: "c4d", text: "Severe Coagulopathy (INR > 5, Platelets < 30)" },
          { id: "c4e", text: "Recent Systemic Thrombolysis (tPA or TNK)" }
        ]}
      ],
      decision: [
        "Candidacy decision by MICU+CVICU Attg at **10 minutes**",
        "If excluded: **Standard Cardiac Arrest Care**",
        "Activate ECPR: **p32005** \"ECPR + MRN\"",
        "**Expedite transport to Cath Lab for cannulation**"
      ],
      footer: "West Campus; M- F 8am-5pm"
    }
  },

  {
    id: "shock-team",
    category: "Resuscitation & shock",
    title: "Shock Team",
    summary: "Pilot activation criteria and process",
    tags: "shock team cardiogenic mixed shock activation hypotension lactate cardiology pilot zoom vasoactive pressor",
    source: { file: "Shock Team - slide for intensivist mtg 2026-04.pdf", pages: 1, version: "Intensivist meeting slide, 2026-04. Pilot starting 5/4/26" },
    pdf: "docs/shock-team/shock-team.pdf",
    pages: pg("shock-team", 1, 792, 612, { 1: "Shock Team Pilot Phase" }),
    views: [
      {
        id: "criteria",
        title: "Activation criteria",
        src: "page 1",
        page: 0,
        blocks: [
          { p: "**Must meet each of the following (A, B and C):**" },
          { h: "A. Hypotension" },
          { ul: ["SBP <90 mmHg for >30 minutes, **or**", "Requiring vasoactives to maintain SBP >90 mmHg or MAP >65 mmHg"] },
          { h: "B. End-organ dysfunction: at least 2 of" },
          { ul: [
            "Physical exam: cool/mottled, altered mental status",
            "Elevated Cr (above baseline if known) and/or oliguria (UOP <30 cc/hr or <0.5 mL/kg/hr)",
            "Elevated AST/ALT >500",
            "Lactate >3 mmol/L"
          ]},
          { h: "C. Evidence of cardiac dysfunction: at least 1 of" },
          { ul: [
            "Known cardiac presentation (e.g. PE, STEMI/NSTEMI, myocarditis, heart failure, VT/VF)",
            "TTE with LV and/or RV dysfunction or severe valvular disease (e.g. AS, AR, MS, MR)",
            "PAC with CI <2.0 L/min/m2 or ScvO2 from central line <60% (in context of Hgb and SpO2)"
          ]},
          { note: "“BUT – these are guidelines not a strict threshold, would encourage you to call/push to activate if concerned”", tone: "info" }
        ]
      },
      {
        id: "process",
        title: "How activation works",
        src: "page 1",
        page: 0,
        blocks: [
          { ul: [
            "Pilot phase starting **Monday 5/4/26**.",
            "Targeted toward advanced discussion re: cardiogenic/mixed shock patients.",
            "Cardiology fellow still receives the initial page, evaluates the consult, and determines whether the larger group needs to convene.",
            "If activated, a page goes out to the group including a Zoom link."
          ]},
          { h: "For MICU intensivists: please join" },
          { ul: [
            "Even if you don’t feel you can add a lot, your presence helps and can help address critical care issues (and keeps you updated on management strategy).",
            "Two-way street: engagement with this team will help bolster involvement for future MICU activations."
          ]}
        ]
      }
    ]
  },

  {
    id: "bc-initial",
    category: "Infection",
    title: "Initial Blood Cultures",
    summary: "Algorithm for new or >72 hrs since prior",
    tags: "blood culture bc initial sepsis septic shock bacteremia central line clabsi immunocompromised fever endovascular diabetic foot",
    source: { file: "initial blood culture algorithm.pdf", pages: 1, version: "Version v.09.21.20" },
    pdf: "docs/bc-initial/bc-initial.pdf",
    pages: pg("bc-initial", 1, 1008, 612, { 1: "Decision Making Algorithm for INITIAL Blood Cultures" }),
    views: [
      {
        id: "algorithm",
        title: "Step-by-step algorithm",
        src: "page 1",
        page: 0,
        blocks: [
          { p: "For INITIAL blood cultures: new, or >72 hrs since prior." },
          { interactive: true, flow: [
            { section: "Start: is there an indication?" },
            { id: "s1", short: "Sepsis or septic shock?", q: "Does your patient have sepsis or septic shock?",
              def: { title: "Sepsis / septic shock definition", items: [
                "**Sepsis:** at least one of [T >101 or <96.8 °F, HR >90, RR >20, WBC >12 or <4, >10% bands] **AND** organ dysfunction",
                "**Septic shock:** sepsis criteria **AND** initial lactate >4 or persistent hypotension despite fluid resuscitation"
              ]},
              yes: { t: "Definite indication", tone: "green", go: "d1" }, no: { go: "s2" } },
            { id: "s2", short: "Systemic symptoms + risk factor, or a listed active infection?", q: "**Systemic symptoms of infection AND at least one of:**",
              list: ["High risk for endovascular infection", "Central line (including short or long term, and PICC)", "Immunocompromised state"],
              q2: "**OR one of the following active infections:**",
              list2: [
                "Cholangitis or cholecystitis", "Meningitis or ventriculitis", "Septic arthritis or acute prosthetic joint infection",
                "Pyelonephritis", "Severe pneumonia", "Vertebral osteomyelitis or discitis", "Epidural abscess", "Intraabdominal abscess",
                "Moderate to severe acute diabetic foot infection", "Necrotizing fasciitis"
              ],
              defs: ["endo", "immuno", "dfi"],
              yes: { t: "Definite indication", tone: "green", go: "d1" }, no: { go: "s3" } },
            { id: "s3", short: "Only one new or persistent symptom?", q: "**Only one** of the following new or persistent symptoms?",
              list: ["Fever", "Tachycardia", "Increased WBC count", "Hypotension"],
              yes: { t: "Possible indication", tone: "amber", go: "p1" }, no: { go: "s4" } },
            { id: "s4", short: "Low-risk syndrome or non-infectious syndrome?", q: "**Syndrome with low risk of bacteremia:**",
              list: [
                "Cellulitis", "Colitis", "Cystitis", "Aspiration pneumonia (PNA) or pneumonitis", "Community acquired PNA",
                "Mild diabetic foot infection", "Uncomplicated cholecystitis", "Non-vertebral OM", "Uncomplicated diverticulitis",
                "Uncomplicated pancreatitis", "Viral illness", "Isolated post-op fever within 48 hrs"
              ],
              q2: "**OR non-infectious syndrome:**",
              list2: ["COPD", "CHF"],
              defs: ["dfi"],
              yes: { t: "Blood cultures NOT indicated", tone: "red" }, no: { go: "s5" } },
            { id: "s5", short: "Considered for surveillance?", q: "Are blood cultures being considered for surveillance?",
              yes: { go: "s6" }, no: { t: "Blood cultures NOT indicated", tone: "red" } },
            { id: "s6", short: "Previously positive blood cultures?", q: "Has the patient had previously positive blood cultures?",
              yes: { t: "Proceed to REPEAT Blood Culture Algorithm", tone: "purple", href: "#/t/bc-repeat/view/algorithm" },
              no: { t: "Blood cultures NOT indicated", tone: "red" } },

            { section: "Definite indication: what to draw", tone: "green" },
            { id: "d1", short: "Central line?", q: "Does the patient have a central line?",
              yes: { go: "d2" }, no: { t: "Draw* 2 sets of peripheral blood cultures from two different sites", tone: "green", then: "Blood culture work up complete.\n*Proceed to “Difficult Blood Draw Algorithm” if difficulty drawing cultures." } },
            { id: "d2", short: "Suspicion for CLABSI, or no known source?", q: "Is there suspicion for central line-associated bloodstream infection, or is there no known source?",
              yes: { go: "d3" }, no: { t: "Draw* 2 sets of peripheral blood cultures from two different sites", tone: "green", then: "Blood culture work up complete.\n*Proceed to “Difficult Blood Draw Algorithm” if difficulty drawing cultures." } },
            { id: "d3", short: "Immunocompromised?", q: "Is the patient immunocompromised?", defs: ["immuno"],
              yes: { t: "Draw* one set of peripheral cultures AND one from all central lines in use", tone: "green", then: "Blood culture work up complete.\n*Proceed to “Difficult Blood Draw Algorithm” if difficulty drawing cultures." },
              no: { t: "Draw* one set of peripheral blood cultures AND one set from central line suspected as source (i.e. redness or pain at exit site)", tone: "green", then: "Blood culture work up complete.\n*Proceed to “Difficult Blood Draw Algorithm” if difficulty drawing cultures." } },

            { section: "Possible indication", tone: "amber" },
            { id: "p1", short: "Quick assessment for other infectious causes done?", q: "Has a quick assessment for other infectious causes been done?",
              yesLabel: "Yes, none found", yes: { go: "p2" },
              no: { t: "Obtain clinically targeted cultures from non-blood sites as indicated (e.g. sputum, urine, etc.)", tone: "amber" } },
            { id: "p2", short: "Quick assessment for non-infectious causes done?", q: "Has a quick assessment for non-infectious causes been done?",
              yesLabel: "Yes, none found", yes: { go: "p3" },
              no: { t: "Assess for potential non-infectious causes to explain symptoms", tone: "amber" } },
            { id: "p3", short: "Bloodstream infection still on the differential?", q: "Does bloodstream infection remain on the differential?",
              yes: { t: "Definite indication", tone: "green", go: "d1" }, no: { t: "Blood cultures NOT indicated", tone: "red" } }
          ]},
          { note: "This guideline is not a substitute for clinical judgment. Please consider ID consultation for assistance with diagnosis and management.", tone: "info" }
        ]
      }
    ],
    defs: {
      endo: { title: "High-risk endovascular infection", items: [
        "Infective endocarditis (IE), septic thrombophlebitis, ICD/pacemaker in place, vascular graft, ventricular assist device (VAD), prosthetic valve or prosthetic material for valve repair, history of IE, unrepaired congenital heart disease"
      ]},
      immuno: { title: "Immunocompromised definition (one or more)", items: [
        "Active hematologic malignancy", "Malignancy requiring chemotherapy in the last 3 months", "Prior stem cell transplant",
        "Solid organ transplant on immunosuppressive medication", "Chronic (>14 days) high dose steroids (prednisone >20 mg/day or equivalent in last 3 months)",
        "Immunomodulator or biologic immunosuppressive therapy", "HIV/AIDS (CD4 <200)", "Asplenia", "Neutropenia",
        "Receipt of other immunosuppressive medications in the last 12 months"
      ]},
      dfi: { title: "Diabetic foot infection severity", items: [
        "**Mild** = local infection involving only skin and subcut tissue with erythema 0.5–2 cm around ulcer",
        "**Moderate** = local infection with erythema >2 cm and no systemic symptoms",
        "**Severe** = local infection as above with systemic symptoms or metabolic perturbations"
      ]}
    }
  },

  {
    id: "bc-repeat",
    category: "Infection",
    title: "Repeat Blood Cultures",
    summary: "Algorithm for ≤72 hrs since prior",
    tags: "blood culture bc repeat positive staph aureus candida clabsi contamination bacteremia surveillance clearance",
    source: { file: "Repeat blood culture alogirthm.pdf", pages: 1, version: "Version v.11.09.20" },
    pdf: "docs/bc-repeat/bc-repeat.pdf",
    pages: pg("bc-repeat", 1, 792, 612, { 1: "Decision Making Algorithm for REPEAT Blood Cultures" }),
    views: [
      {
        id: "algorithm",
        title: "Step-by-step algorithm",
        src: "page 1",
        page: 0,
        blocks: [
          { p: "For REPEAT blood cultures: ≤72 hrs since prior. For new or >72 hrs, use the [Initial Blood Cultures algorithm](#/t/bc-initial/view/algorithm)." },
          { interactive: true, flow: [
            { section: "Does the patient have:" },
            { id: "r1", short: "Positive BC with a listed organism?", q: "Positive blood cultures (or Gram positive cocci on Gram stain or culture, not yet speciated) with **ONE** of the following:",
              list: [
                "Staph aureus", "Staph lugdunensis", "Candida sp.", "Gram negative rods in setting of IVDU", "Enterococcus sp.",
                "Viridans group Streptococcus", "β-hemolytic Streptococcus", "Any organism associated with suspected endovascular infection"
              ],
              defs: ["endo"],
              yes: { t: "Repeat 2 sets of peripheral BC daily from 2 different sites until negative for 48 hours. Recommend Infectious Diseases consult.", tone: "green", go: "r7", action: true },
              no: { go: "r2" } },
            { id: "r2", short: "CLABSI in last 72 hours with retained catheter?", q: "Diagnosed with a central-line associated bloodstream infection (CLABSI) in the last 72 hours **AND** retained catheter?",
              yes: { t: "Repeat 2 sets of peripheral BC from 2 different sites ONCE and remove central line if possible. Consider discussion with PEVA or ID regarding need for line removal.", tone: "green", go: "r7", action: true },
              no: { go: "r3" } },
            { id: "r3", short: "Persistent fever/leukocytosis with 2 negative sets within 48 hours?", q: "Persistent fever or leukocytosis **AND** 2 sets of negative BC within 48 hours while other sources are being evaluated?",
              yes: { t: "Repeat blood cultures not indicated if <72 hours since prior", tone: "red" }, no: { go: "r4" } },
            { id: "r4", short: "Clinical response, source control, no endovascular concern?", q: "Clinical response after starting antibiotics and presumed source control and no concern for endovascular infection?",
              yes: { t: "Repeat blood cultures not indicated if <72 hours since prior", tone: "red" }, no: { go: "r5" } },
            { id: "r5", short: "Likely contamination?", q: "Cultures likely to represent contamination (e.g. single BC with diphtheroids, Cutibacterium sp., coag-neg Staph, micrococci, Bacillus sp., lactobacilli, veillonella, peptostreptococci)?",
              yes: { t: "Repeat blood cultures not indicated if <72 hours since prior", tone: "red" }, no: { go: "r6" } },
            { id: "r6", short: "Still concern for infectious cause?", q: "Still concern for infectious cause?",
              yes: { t: "Consider Infectious Diseases consult", tone: "amber" }, no: { t: "Repeat blood cultures not indicated if <72 hours since prior", tone: "red" } },

            { section: "After repeat cultures", tone: "green" },
            { id: "r7", short: "Two sets of BC obtained?", q: "Were two sets of BC able to be obtained?",
              yes: { t: "Blood culture work up complete", tone: "green" }, no: { t: "Proceed to Difficult Blood Culture Logistics Algorithm", tone: "amber" } }
          ]},
          { note: "This guideline is not a substitute for clinical judgment. Please consider ID consultation for assistance with diagnosis and management.", tone: "info" }
        ]
      }
    ],
    defs: {
      endo: { title: "High-risk endovascular infection", items: [
        "Infective endocarditis (IE), septic thrombophlebitis, ICD/pacemaker in place, vascular graft, ventricular assist device (VAD), prosthetic valve or prosthetic material for valve repair, history of IE, unrepaired congenital heart disease"
      ]}
    }
  },

  {
    id: "brain-death",
    category: "Death, donation & ethics",
    title: "Brain Death",
    summary: "Policy PR-12: death by neurologic criteria",
    tags: "brain death bd dnc neurologic criteria apnea test ancillary spect angiography ecmo neds pr-12 declaration oculovestibular",
    source: { file: "Brain death testing.pdf", pages: 10, version: "Policy PR-12. Revised 5/26 (MEC 5/20/26). Next review 5/29" },
    pdf: "docs/brain-death/brain-death.pdf",
    pages: pg("brain-death", 10, 612, 792, { 1: "Purpose & policy statement", 2: "Guidelines for implementation", 3: "Prerequisites", 4: "Timing & neurologic exam", 5: "Apnea & ancillary testing", 6: "Special populations", 7: "Declaration workflow", 8: "Approvals", 9: "Attachment A: Checklist", 10: "Attachment A: Checklist (cont.)" }),
    views: [
      {
        id: "before",
        title: "Before testing",
        src: "pages 1–4",
        page: 2,
        blocks: [
          { h: "Who and when" },
          { ul: [
            "Refer all patients whose severe neurologic injury may result in BD/DNC to **New England Donor Services (NEDS), 800-446-6362**, before BD/DNC testing and before conversations about comfort care or withdrawal.",
            "Initiate testing in all appropriate patients regardless of donation eligibility or family intent. Explicit family/surrogate consent is not required (surrogate may refuse testing if a final decision for comfort care and withdrawal has been made).",
            "Exam is carried out by, or under direct supervision of, a **Neurology, Neurosurgery, or Critical Care attending**. One examiner is required; a second exam may decrease the risk of a false-positive determination and can be considered.",
            "Critical care APPs may examine under supervision of critical care attending staff. If available in time, a PGY-2+ Neurology/Neurosurgery resident or Neurocritical Care fellow should examine under direct attending supervision.",
            "Physicians with patients on donation wait lists, or who may take part in transplant or organ recovery, should not be involved in the determination.",
            "Do not discuss organ donation with the family before a collaborative plan with NEDS. If the family raises it, acknowledge there may be a possibility and defer."
          ]},
          { h: "Prerequisites" },
          { ul: [
            "**Known cause:** clinical or neuroimaging evidence of an acute CNS catastrophe compatible with BD/DNC.",
            { t: "**No potentially reversible mimic**, including:", sub: [
              "Hypothermia below 36 °C",
              "Total paralysis from neuromuscular blockade or peripheral nerve disease",
              "Severe metabolic disease (hepatic, renal, hyperosmolar, hypercarbic, hypoxic, hypotensive or septic encephalopathy)",
              "Post-ictal state after severe or prolonged seizures, for up to 24 hours",
              "Sedative or depressive drugs"
            ]}
          ]},
          { h: "Targets before evaluation" },
          { table: { head: ["", "Target"], rows: [
            ["Blood pressure", "SBP ≥ 100 mm Hg and MAP ≥ 75 mm Hg"],
            ["Core temperature", "≥ 36 °C (96.8 °F) per checklist"],
            ["Phenobarbital (if given or known medication)", "< 5 µg/mL or below lower limit of detection"],
            ["Blood alcohol", "< 80 mg/dL"]
          ]}},
          { h: "Metabolic derangements to correct" },
          { p: "Practical suggestions based on consensus. There are no definitive cut-off values that exclude evaluation; clinical context and judgment are required." },
          { table: { head: ["Lab", "Value suggesting derangement"], rows: [
            ["Ammonia", "≥ 75 µmol/L"],
            ["BUN", "≥ 75 mg/dL"],
            ["Calcium", "< 7 or > 11 mg/dL"],
            ["Glucose", "< 70 or > 300 mg/dL"],
            ["Magnesium", "< 1.5 or > 4 mg/dL"],
            ["Potassium", "< 3 or > 6 mmol/L"],
            ["Sodium", "< 130 or > 160 mmol/L"],
            ["pH", "< 7.3 or > 7.5"],
            ["Total T4 (if concern for endocrinopathy)", "< 3 or > 30 mg/dL"],
            ["Free T4 (if concern for endocrinopathy)", "≤ 0.3 or > 5 ng/dL"]
          ]}},
          { h: "After cardiac arrest with TTM" },
          { p: "Delay the exam at least **24 hours after core temperature returns to 36 °C**, or longer depending on CNS-depressant medications (more than 5 half-lives may be needed; hypothermia prolongs clearance). If uncertain about clearance, do a complete exam and apnea test **and** obtain an ancillary study." },
          { note: "**Primary infratentorial (isolated brainstem) injury:** ancillary testing is recommended to demonstrate whole brain death even if the exam and apnea test are consistent with BD/DNC.", tone: "warn" }
        ]
      },
      {
        id: "exam",
        title: "Exam & apnea test",
        src: "pages 4–5, 9–10",
        page: 3,
        blocks: [
          { h: "Clinical exam" },
          { ol: [
            "**Coma:** no withdrawal from painful stimuli (supraorbital, TMJ, sternum, or nail beds). Spinal-level movements (including Lazarus sign) do not preclude BD/DNC; decerebrate or decorticate posturing does.",
            "**Pupils:** previously healthy pupils unreactive to bright light bilaterally (checklist: 3–9 mm).",
            "**Cranial nerves:** no corneal reflex, no oculocephalic reflex (doll’s eyes), no facial movement, no gag or cough with deep tracheal suctioning.",
            "**Oculovestibular:** head at 30°, clear canals (check tympanic membrane integrity in trauma). Slow irrigation of ice-cold water, 10 mL/min for 5 min, into each ear: no eye movement."
          ]},
          { note: "If oculocephalic testing is not possible because of cervical spine/skull base concern, oculovestibular testing can be used without ancillary testing, provided all other elements are satisfied.", tone: "info" },
          { h: "Apnea test" },
          { ol: [
            "Ventilator adjusted to **PaCO2 35–45 mm Hg**. Off all sedatives and paralytics; correct hypotension as best possible.",
            "**FiO2 100% for 5 minutes.** Record baseline vitals and ABG.",
            "Expose thorax and abdomen. Remove from ventilator; insert oxygen catheter at **6–8 L/min** into the trachea.",
            "Observe **10 minutes** for spontaneous respirations.",
            "At any event or at 10 minutes: draw ABG and return to the previous ventilator settings."
          ]},
          { note: "**Abort** for visible cyanosis or SaO2 < 85%. Spontaneous respirations indicate residual brainstem function.", tone: "warn" },
          { h: "Apnea test supports BD/DNC if" },
          { ul: [
            "PaCO2 **≥ 60 mm Hg and ≥ 20 mm Hg** above pre-test baseline",
            "Arterial pH **< 7.3**",
            "No spontaneous respirations or significant change in BP or HR"
          ]},
          { p: "**Chronic hypercarbia with known baseline:** PaCO2 ≥ 60 mm Hg and ≥ 20 mm Hg above premorbid baseline, and pH < 7.3." },
          { note: "The checklist (Attachment A, page 10) words this differently: “PaCO2 is > 60 mmHg, **or** PaCO2 is greater than 20mmHg above the patient’s pre-testing baseline … and pH < 7.3.” The policy text (page 5) is shown above.", tone: "info" }
        ]
      },
      {
        id: "ancillary",
        title: "Ancillary testing & special populations",
        src: "pages 5–7",
        page: 4,
        blocks: [
          { h: "Ancillary testing" },
          { p: "Not a substitute for the clinical exam. The exam and apnea test must be done to the fullest extent possible and be consistent with BD/DNC before ancillary testing." },
          { ul: [ { t: "Typical indications:", sub: [
            "Inability to correct metabolic derangements",
            "Fracture of cervical spine/skull base/orbit, severe facial injuries",
            "Unable to determine whether movements are spinally mediated",
            "Unable to perform apnea test due to hemodynamic instability",
            "Known/suspected chronic hypercarbia without known baseline PaCO2"
          ]}]},
          { ul: [ { t: "**Two accepted tests at BIDMC:**", sub: [
            "Nuclear medicine cerebral blood flow study (SPECT)",
            "Catheter-based conventional cerebral angiography"
          ]}]},
          { p: "Not adequate: MR angiography (can falsely show no flow); CT angiography (not validated). Absent EEG activity is not sufficient (does not test brainstem/hypothalamus). TCD can be limited by absent insonation windows." },
          { note: "With an ancillary test, **time of death** is the date/time of the interpreting attending’s signature. Images must be interpreted and signed by an attending radiologist before declaration.", tone: "info" },
          { h: "Patients on ECMO" },
          { ul: [
            "Preoxygenate through **both** the membrane lung and the ventilator.",
            "To raise PaCO2: add exogenous CO2 to the circuit and/or reduce sweep to **0.2–1 L/min**.",
            "**VA-ECMO:** sample arterial blood from both the distal arterial line and the post-oxygenator circuit. Both must meet pH and PaCO2 targets.",
            "Ancillary testing: nuclear medicine study is **preferred** in VA-ECMO. Angiography may be hard to interpret (competing circulations). TCD may be inaccurate (relies on pulsatile flow)."
          ]},
          { h: "Other populations" },
          { ul: [
            "**Age < 18:** 2 examiners, at least 12 hours apart, apnea test at each. SBP and MAP ≥ 5th percentile for age. Age < 6 months: consult Boston Children’s Hospital Neurology.",
            "**Pregnancy** is not a contraindication. Multidisciplinary discussion with maternal-fetal medicine, neonatology and neurology before, during and after declaration."
          ]}
        ]
      },
      {
        id: "declaration",
        title: "Declaration & family",
        src: "pages 1–3, 7",
        page: 6,
        blocks: [
          { h: "Declaration workflow" },
          { ol: [
            "NEDS referral (**800-446-6362**) initiated before testing and pronouncement.",
            "Findings recorded by the critical care, neurology or neurosurgery attending (or neurology/neurosurgery resident with attending signature).",
            "Death note: criteria used, date, time and attending signature.",
            "Complete the **Brain Death Declaration Checklist** (Attachment A) and place in the paper chart. Attending signature required.",
            "After declaration, and once NEDS determines no potential for donation, the ventilator and support may be disconnected by RT, RN, resident or attending on the written order of the attending or designee.",
            "Consider autopsy and medical examiner policies before disposition of the body."
          ]},
          { h: "Talking with family" },
          { ul: [
            "The declaring attending is responsible for the declaration and the explanation to the family.",
            "Explain clearly that BD/DNC is death, with Interpreter Services when applicable. Avoid terms such as “disconnecting life support” or “letting him/her die.”",
            "Family permission to disconnect support after declaration is not required (and seeking it is not recommended), but keep the family informed."
          ]}
        ]
      }
    ]
  },

  {
    id: "dcd",
    category: "Death, donation & ethics",
    title: "DCD Organ Donation",
    summary: "Policy PR-13: donation after circulatory death",
    tags: "dcd organ donation circulatory death neds withdrawal extubation heparin cmo pronounce declaration pr-13 or pacu",
    source: { file: "Organ donation after DCD.pdf", pages: 15, version: "Policy PR-13. Revised 3/25 (MEC 3/19/25). Next review 3/28" },
    pdf: "docs/dcd/dcd.pdf",
    pages: pg("dcd", 15, 612, 792, { 1: "Policy", 5: "Donor management", 6: "Transport, extubation & determining death", 8: "Attachments & approvals", 9: "Attachment A: Flowchart", 10: "Attachment B: Workflow checklist", 11: "Attachment B (cont.)", 12: "Attachment B: OR vs PACU", 13: "Attachment C: Declaration of death checklist", 14: "Attachment D: Consent for donor management", 15: "Attachment E: Maastricht & UDDA" }),
    views: [
      {
        id: "referral",
        title: "Referral, consent & huddle",
        src: "pages 1–4, 10",
        page: 1,
        blocks: [
          { h: "Referral criteria" },
          { ul: ["Patient on a ventilator (ECMO is not excluded).", "End-of-life discussion with patient and/or surrogate is planned."] },
          { note: "Refer to **NEDS** before any end-of-life discussion when possible, including discussions of de-escalation of care.", tone: "warn" },
          { h: "Consent" },
          { ul: [
            "Follows the documented decision to withdraw life-sustaining treatment.",
            "No legal donor designation: NEDS obtains written consent from the legal agent or next of kin.",
            "Donor designation present: patient/surrogate must agree to the manner of withdrawal allowing recovery. Physician or APP completes Attachment D, Consent for Donor Management.",
            "A separate signed hospital consent is required for any pre-mortem procedures or medications (Attachment D).",
            "Patients consented for DCD are not required to be full code (unlike DBD)."
          ]},
          { h: "Before withdrawal" },
          { ul: [
            "ICU physician pre-screens all consented cases with the **Medical Examiner** regardless of circumstances: **800-962-7877**.",
            "**Team huddle** with NEDS and BIDMC staff several hours before extubation (Attachment B checklist).",
            "Confirm patient ID, surrogate, donation consent, and code status in orders as **DNR/DNI and CMO**.",
            "Standard location for withdrawal is the **OR** (PACU is the alternative), with shared decision-making with the surrogate. Typically 2 family members in the OR.",
            "Confirm organs planned, lung reintubation plan with anesthesia/RT, whether NRP is used, and that IV heparin is ordered and delivered (typically ~30,000 units).",
            "Orders for DNR/DNI/CMO/extubation and medications placed about 1 hour before transport.",
            "Notify Public Safety of timing/plan.",
            "Agree the plan for continued care if the patient does not become a donor.",
            "Palliative Care questions: pager **#32502**."
          ]},
          { h: "Staffing and separation" },
          { ul: [
            "**Attending must be present for extubation**; a clinician designee must be present from extubation to the 2-hour limit. A critical care fellow or APP may participate under direct attending oversight.",
            "The declaring physician must not be associated with the transplant team or caring for a potential recipient.",
            "No recovery personnel present for withdrawal. No recovery team or OPO staff may guide end-of-life care or declare death."
          ]}
        ]
      },
      {
        id: "withdrawal",
        title: "Withdrawal & declaration of death",
        src: "pages 4–7, 10–13",
        page: 5,
        blocks: [
          { h: "Medications" },
          { ul: [
            "**No neuromuscular blockade for ≥ 1 hour** before extubation; assess return of function (CC-#15) or consider reversal (CCG-#2).",
            "Discontinue **propofol** (except for refractory seizures).",
            "Existing opioid/benzodiazepine infusions: decrease or stop if not compromising comfort. Continuing them for comfort during CMO is acceptable.",
            "Orders for pain, agitation, air hunger and noisy secretions written and medication on hand before extubation (e.g. opioid plus benzodiazepine; consider anticholinergic).",
            "Comfort-focused medications at extubation per CG-28. Consider an anticipatory opioid dose before extubation.",
            "**Heparin** (specific consent; after CMO and if agreed by NEDS): typically just before extubation, usual dose **30,000 units**. RN gives IV push, timing at NEDS coordinator’s discretion.",
            "Vasodilators: only after CMO, if agreed by NEDS, before the heart stops, and with specific informed consent."
          ]},
          { h: "Draping" },
          { p: "Drapes must not obscure the clavicles, intercostal muscles, face or nares. Consider translucent drape (Ioban). Head of bed at 30° for respiratory comfort." },
          { h: "Declaration of death" },
          { ul: [
            "**5 minutes of pulselessness** before pronouncement: asystole, or PEA with zero pulse pressure.",
            "**Arterial line present:** 5 minutes continuous zero pulse pressure on the running waveform, simultaneous with 5 minutes of observed apnea.",
            "**No arterial line:** ECG asystole or PEA with 5 minutes of observed apnea; palpate the carotid for a full 5 minutes to confirm PEA.",
            "Time of death is the time after the 5-minute hands-off period, on the same running monitor.",
            "Document on **Attachment C** (Declaration of Death for DCD checklist)."
          ]},
          { note: "If still breathing with a sustained pulse and blood pressure after **2 hours** (may be shortened), the donation process stops. The patient returns to the ICU for comfort-focused care under the attending.", tone: "warn" },
          { h: "OR vs PACU" },
          { ul: [
            "**OR:** family escorted out within 2 minutes of pulselessness. Pronounce after 5 minutes of asystole or PEA with zero pulse pressure.",
            "**PACU:** once asystolic or in PEA, move to the OR; the 5-minute interval includes transport. Pronounce after 5 minutes.",
            "If lungs are recovered, the reintubation team must be distinct from the donation and declaration team."
          ]}
        ]
      },
      {
        id: "management",
        title: "Donor management",
        src: "pages 5, 7–8",
        page: 4,
        blocks: [
          { p: "Under NEDS direction, after consent for donation and with a physician order." },
          { ul: [
            "Stat labs/tests may include: electrolytes, glucose, PT/PTT, ABO, ABG, CBC with differential, lactate, BUN, creatinine, LFTs, total and direct bilirubin, albumin, amylase, lipase, HgbA1c, urinalysis, blood/urine/sputum cultures, sputum Gram stain, chest X-ray, bronchoscopy.",
            "Stat serology and tissue typing (NEDS arranges).",
            "Hemodynamic support with pressors and/or fluids until CMO and withdrawal are initiated."
          ]},
          { h: "Abnormal parameters to treat" },
          { table: { head: ["Abnormality", "Treatment"], rows: [
            ["Electrolytes", "Change IV solutions, rates, and adjust additives"],
            ["ABG", "Alter ventilator settings"],
            ["Low hematocrit", "Transfuse per hospital protocol"],
            ["Coagulopathy", "Warm patient to 37 °C, give FFP"],
            ["Low urine output", "Fluids, mannitol, or furosemide"],
            ["Hypotension", "Fluids and/or vasopressors"]
          ]}},
          { p: "Pre-mortem procedures needing signed BIDMC consent may include arterial line insertion and bronchoscopy for lung evaluation." },
          { p: "NEDS is responsible for costs from family permission until donation (or until no longer a candidate), including labs and medications ordered to assess suitability." },
          { link: { t: "Step-by-step educational video (linked in policy)", href: "https://vimeo.com/1111652418?share=copy#t=373", ext: true } }
        ]
      }
    ]
  },

  {
    id: "cp26",
    category: "Death, donation & ethics",
    title: "Futile & Inappropriate Interventions",
    summary: "Policy CP-26: process when disagreement persists",
    tags: "futile futility potentially inappropriate ethics disagreement surrogate cp-26 ethics support service specialist committee review committee transfer",
    source: { file: "CP26.pdf", pages: 12, version: "Policy CP-26. Revised 6/25 (MEC 6/18/2025). Next review 6/28" },
    pdf: "docs/cp26/cp26.pdf",
    pages: pg("cp26", 12, 612, 792, { 1: "Definitions", 2: "General application", 4: "Steps when disagreement persists", 9: "Treatment during disagreement & approvals", 11: "Exhibit A", 12: "Appendix 1" }),
    views: [
      {
        id: "definitions",
        title: "Definitions & principles",
        src: "pages 1–3",
        page: 0,
        blocks: [
          { table: { head: ["Term", "Meaning"], rows: [
            ["Futile", "No chance of achieving the intended physiologic goal."],
            ["Potentially inappropriate", "Some chance of achieving the physiologic goal, but the clinician believes it would be (1) outside the standards or customs of the relevant specialty, and/or (2) outside accepted medical practice generally, and/or (3) competing ethical concerns justify not providing it."],
            ["Inappropriate", "Inconsistent with the standards or customs of the relevant specialty. If none apply, accepted practice more broadly and competing ethical concerns may be considered."]
          ]}},
          { note: "Appropriateness must **not** be based on bias about disability, judgments that the person will be a burden, or a belief that life with a disability has lesser value.", tone: "warn" },
          { h: "Principles" },
          { ul: [
            "Treatment decisions are guided by the patient’s goals, not the team’s values or preferences.",
            "Offer all available interventions with a reasonable likelihood of meaningfully advancing the patient’s goals, if appropriate.",
            "A futile intervention should not be provided. The team is not required to provide an inappropriate intervention.",
            "The physician generally continues to care for the patient, minimizing suffering and respecting dignity."
          ]},
          { h: "Before raising concerns, ask yourself" },
          { ol: [
            "Would this treatment not further the patient’s goals as I understand them? Have I confirmed those goals with the patient/surrogate?",
            "Is it outside specialty standards or accepted practice, or are there competing ethical concerns? What is the basis?",
            "How comfortable would I feel if my rationale were publicly reviewed?",
            "What are the consequences for the patient, surrogate, team or institution?",
            "Am I sure my belief is not influenced by disability, age, race, ethnicity, religion, perceived quality of life, sexual orientation, gender identity, ability to pay, socioeconomic status, perceived social worth, immigration, incarceration or housing status, use of resources, or other psychosocial factors?"
          ]},
          { p: "The attending meets with the patient/surrogate to explain why the intervention should not be provided. Consider involving Social Work, Palliative Care, Spiritual Care, Patient Relations, or the Ethics Support Service." }
        ]
      },
      {
        id: "process",
        title: "Steps when disagreement persists",
        src: "pages 3–9",
        page: 3,
        blocks: [
          { h: "Futile intervention" },
          { ul: [
            "Engage empathetically: understand the request, correct misunderstandings, provide support, and explain why it cannot achieve its physiologic goal and will not be provided.",
            "If disagreement persists, consider negotiation/communication/conflict-resolution help. Ensure Social Work is involved.",
            "The attending may consider a second opinion."
          ]},
          { h: "Potentially inappropriate intervention" },
          { p: "Each step in a timeframe appropriate to the clinical situation, **documented in the medical record**." },
          { ol: [
            "**Involve skilled support:** Social Work, Palliative Care, Spiritual Care, Patient Relations, or the Ethics Support Service (ESS).",
            "**Notify the patient/surrogate** of the continued disagreement and this process. Give the written summary (Exhibit A). Document the conversation and that the summary was provided.",
            "**Independent second opinion:** the attending contacts ESS. Unit/division leadership forms a Specialist Committee of clinically active staff not involved in the case; a physician member examines the patient. Expected to meet **within 24 hours** if possible.",
            "**Option to transfer** to a facility willing to provide the intervention, with reasonable BIDMC assistance.",
            "**Review Committee:** convened by the on-call ESS with an Ethics Advisory Committee co-chair. Hears from the attending and the patient/surrogate, then decides whether the process was followed and whether the intervention is inappropriate."
          ]},
          { h: "Specialist Committee outcomes" },
          { ul: [
            "**Agrees it is inappropriate:** attending informs the patient/surrogate of the review and conclusion. Process continues if disagreement persists.",
            "**Disagrees with the attending:** if the attending still objects, the Chief of Service tries to find another attending willing to provide it.",
            "**No consensus in the field:** if the attending still objects, the Review Committee is convened."
          ]},
          { note: "If the Review Committee finds the intervention inappropriate and transfer is not arranged within a reasonable time (**not more than 3 business days**), the patient/surrogate is told of options to seek court involvement (within not more than 3 business days). Unless there are legal barriers, BIDMC supports implementing the committee’s conclusion.", tone: "warn" },
          { h: "During any disagreement" },
          { p: "The attending is ultimately responsible for which interventions are and are not offered. If uncertain, consult the Ethics Support Service, BILH Office of General Counsel, and/or the relevant Chief(s) of Service." },
          { p: "Support (peer support, debriefing, employee assistance) is available for clinicians. Advise the patient/surrogate of supports such as Patient Relations." }
        ]
      }
    ]
  }
];
