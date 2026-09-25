// All clinical content below is transcribed from the source document. Do not add outside content.
window.TOPICS = [
  {
    id: "ecpr",
    title: "ECPR",
    summary: "ECPR Pathway Criteria, IHCA criteria, OB arrest workflow",
    tags: "ecpr ecmo cpr cardiac arrest ihca ohca ed arrest peripartum or arrest obstetric code blue cannulation cath lab",
    source: { file: "ECPR.pdf", pages: 3, version: "No version or date stated in source" },
    pdf: "docs/ecpr/ECPR.pdf",
    pages: [
      { img: "docs/ecpr/page-1.png", title: "ECPR Pathway Criteria" },
      { img: "docs/ecpr/page-2.png", title: "Consideration for ECPR in IHCA" },
      { img: "docs/ecpr/page-3.png", title: "OB Cardiac Arrests Identified for ECPR" }
    ],

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
  }
];
