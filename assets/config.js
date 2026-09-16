/**
 * Editable commercial configuration for PLM AI Services product website.
 * Fill placeholders before publishing ads or Store campaigns.
 */
window.PLMOPS_CONFIG = {
  FORM_ENDPOINT: "",
  TO_EMAIL: "teamcentersap@gmail.com",

  SITE_NAME: "PLM AI Services",
  SITE_URL: "https://plmaiservice.com",
  SITE_TAGLINE: "B2B Windows tools for manufacturing and SAP data. Store apps and Lean Consult.",
  SUPPORT_EMAIL: "teamcentersap@gmail.com",
  B2B_EMAIL: "sanjay@plmaiservice.com",

  YOUTUBE_CHANNEL_URL: "https://www.youtube.com/@PLMSAPAISolutions",
  FACEBOOK_GROUP_NAME: "PLM SAP Tool Room",
  FACEBOOK_GROUP_URL: "",

  GA_MEASUREMENT_ID: "G-77043KQ3MP",
  META_PIXEL_ID: "",

  CAMPAIGN_IDS: {
    facebook_bom_compare: "facebook_bom_compare",
    facebook_docrev: "facebook_docrev",
    facebook_erp_validator: "facebook_erp_validator",
    facebook_leanconsult: "facebook_leanconsult",
    facebook_bapiload: "facebook_bapiload",
    facebook_releaseguard: "facebook_releaseguard",
    instagram_bom_compare: "instagram_bom_compare",
    linkedin_bom_compare: "linkedin_bom_compare",
    youtube_bom_compare: "youtube_bom_compare",
    website_home: "website_home",
    website_product_page: "website_product_page"
  },

  products: {
    lean: {
      id: "lean",
      name: "LeanConsult Factory",
      shortName: "Lean Consult",
      family: "lean",
      page: "leanconsult-factory.html",
      problem: "Turn a workplace photo and short description into a cautious, measurable lean experiment — on device.",
      description: "LeanConsult Factory helps production supervisors and continuous-improvement leads capture a workplace condition, describe it by voice or text, and get a reversible one-shift trial plan generated privately on device.",
      storeUrl: "https://apps.apple.com/us/app/leanconsult-factory/id6794219819",
      storeReady: true,
      storePlatform: "apple",
      storeLabel: "Get on the App Store",
      trial: "See the App Store listing for the current offer in your market.",
      screenshot: "assets/img/leanconsult-how-it-works.png",
      ogImage: "assets/img/leanconsult-how-it-works.png",
      demoUrl: "",
      demoTitle: "LeanConsult Factory Demo",
      storeEvent: "click_lean_appstore",
      viewEvent: "view_leanconsult",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_leanconsult",
      benefits: [
        "One clear problem framing and a reversible one-shift trial",
        "Before/after measurement rows and an action board for next shifts",
        "Encrypted on-device history and PDF export for huddles"
      ],
      users: [
        "Production supervisors",
        "Continuous-improvement and Kaizen leads",
        "Shop-floor teams walking the line"
      ],
      inputs: "Workplace photo plus spoken or typed description",
      output: "Lean experiment plan, measurement rows, action board, optional PDF",
      os: "iPhone, iPad (iOS / iPadOS)",
      requirements: "Requires iOS 26.0 or later (see App Store for current compatibility)."
    },
    bom: {
      family: "plm",
      id: "bom",
      name: "BOM Compare Tool",
      shortName: "BOM Compare",
      page: "bom-compare.html",
      problem: "Compare Source and Target BOM files and review Matched, Different and side-only rows.",
      description: "Compare two Bills of Materials on Windows (CSV, Excel, JSON; PLMXML on Source). Validate BOMs locally; export CSV/PDF when your Store licence includes export.",
      storeUrl: "https://apps.microsoft.com/detail/9nq1k3vh33kv?hl=en-US&gl=IN",
      storeReady: true,
      trial: "See Microsoft Store for trial and licensing details.",
      screenshot: "assets/img/bom-compare-ui.png",
      ogImage: "assets/og/bom-compare.png",
      demoUrl: "",
      demoTitle: "BOM Compare Tool Demo",
      storeEvent: "click_bom_store",
      viewEvent: "view_bom_compare",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_bom_compare",
      benefits: [
        "Upload Source BOM and Target BOM, then Validate BOMs",
        "Review Matched, Different, Source-only and Target-only rows",
        "Export CSV/PDF when entitled; processing stays on your PC"
      ],
      users: [
        "Manufacturing and product-data teams",
        "Engineering offices",
        "PLM and ERP export workflows",
        "Small and mid-size manufacturers"
      ],
      inputs: "CSV, Excel (.xlsx), JSON; PLMXML (Source BOM only); max 50 MB per file",
      output: "Matched/Different/side-only results; CSV/PDF export when entitled",
      os: "Windows",
      requirements: "Windows 10 or later (x64). Keyboard and mouse."
    },
    docrev: {
      id: "docrev",
      name: "DocRev Manager",
      shortName: "DocRev Manager",
      family: "plm",
      page: "docrev-manager.html",
      problem: "Control engineering documents, numbering and revisions from one Windows application.",
      description: "Control engineering documents, numbering and revisions in one Windows application built for small manufacturers, engineering offices and project teams.",
      storeUrl: "https://apps.microsoft.com/detail/9mxr3wlmq0g7?hl=en-US&gl=IN",
      storeReady: true,
      trial: "See Microsoft Store for trial and licensing details.",
      screenshot: "assets/img/docrev-manager-ui.png",
      ogImage: "assets/og/docrev-manager.png",
      demoUrl: "",
      demoTitle: "DocRev Manager Demo",
      storeEvent: "click_docrev_store",
      viewEvent: "view_docrev_manager",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_docrev",
      benefits: [
        "Automatic numbering and revision history in a local vault",
        "Transmittal ZIP, shop floor and job packet workflows",
        "Search, CSV export and one-click database backup — offline"
      ],
      users: [
        "Design offices and machine builders",
        "Manufacturing and QA teams",
        "Engineering contractors",
        "Teams replacing shared-folder document control"
      ],
      inputs: "PDF, DWG/DXF, Solid Edge, STEP/STP, Office, PNG, JPG and other vault files",
      output: "Document register, local vault, transmittal ZIP, CSV export and DB backup",
      os: "Windows",
      requirements: "Windows 10 version 1809 (build 17763) or later, or Windows 11. Keyboard and mouse."
    },
    erp: {
      id: "erp",
      name: "ERP Migration File Validator",
      shortName: "ERP Validator",
      family: "plm",
      page: "erp-migration-validator.html",
      problem: "Validate ERP migration files and identify data-quality problems before upload.",
      description: "Validate Excel and CSV migration files, identify missing or invalid records, and improve ERP data quality before import with ERP Migration File Validator for Windows.",
      storeUrl: "https://apps.microsoft.com/detail/9PPG63SQXCP6?hl=en-US&gl=IN",
      storeReady: true,
      trial: "See Microsoft Store for trial and licensing details. Free edition validates up to 100 records per worksheet; Professional edition unlocks full runs, corrected-file export and saved profiles.",
      screenshot: "assets/img/erp-validator-ui.png",
      ogImage: "assets/og/erp-migration-validator.png",
      demoUrl: "",
      demoTitle: "ERP Migration File Validator Demo",
      storeEvent: "click_erp_store",
      viewEvent: "view_erp_validator",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_erp_validator",
      benefits: [
        "Check CSV, XLSX and SpreadsheetML XML files on this PC",
        "Find missing, invalid, duplicate and out-of-range values",
        "Export an audit report without overwriting the original file"
      ],
      users: [
        "ERP migration teams",
        "SAP consultants",
        "Data migration consultants",
        "Manufacturing companies",
        "Material-master teams",
        "Data-quality teams",
        "Small and mid-sized companies preparing ERP imports"
      ],
      inputs: "CSV, XLSX and SpreadsheetML XML",
      output: "Issue grid, XLSX audit report, and optional corrected sibling file (Professional edition)",
      os: "Windows",
      requirements: "Windows 10 version 2004 (build 19041) or later, or Windows 11. Keyboard and mouse. Minimum usable resolution 1280 × 720. Works at 100%, 125%, 150% and 200% display scaling."
    },
    bapi: {
      id: "bapi",
      name: "BAPILoad Guard",
      shortName: "BAPI Guard",
      family: "b2b",
      page: "bapiload-guard.html",
      problem: "Validate Excel/CSV manufacturing data offline, then load through customer-authorized SAP remote functions.",
      description: "B2B Windows workstation for SAP master-data analysts and consultants: validate Excel/CSV offline, map with declarative profiles, plan create/change/skip, then submit customer-allowlisted remote functions. Independent product — not affiliated with SAP SE. SAP .NET Connector is not included.",
      storeUrl: "",
      storeReady: false,
      storeComingSoon: "B2B sales — write to sanjay@plmaiservice.com",
      salesModel: "b2b",
      trial: "B2B licensing. Contact sanjay@plmaiservice.com for evaluation and commercial terms.",
      screenshot: "",
      ogImage: "assets/og/home.png",
      demoUrl: "",
      demoTitle: "BAPILoad Guard Demo",
      storeEvent: "click_bapi_b2b",
      viewEvent: "view_bapiload_guard",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_bapiload",
      benefits: [
        "Offline Excel/CSV validation before any SAP call",
        "Guided packs for manufacturing, commercial, PM and documents",
        "Plan hash, checkpoints and verified/discrepant read-back"
      ],
      users: [
        "SAP master-data analysts",
        "Manufacturing engineers and buyers",
        "SAP consultants on customer landscapes"
      ],
      inputs: "Excel and CSV workbooks; customer-supplied sapnco.dll in a folder you own",
      output: "Validation plan, submit outcomes, Verified / Discrepant / Ambiguous / Not Checked",
      os: "Windows 10 (22H2) and Windows 11 x64",
      requirements: "Windows 10 22H2 or Windows 11 x64. Customer supplies compatible SAP .NET Connector DLLs. Independent of SAP certification."
    },
    releaseguard: {
      id: "releaseguard",
      name: "OrderRelease Guard",
      shortName: "Release Guard",
      family: "b2b",
      page: "order-release-guard.html",
      problem: "Catch revision, quantity, price, material and delivery differences between RFQ, quote and PO before release.",
      description: "B2B Windows review workstation that compares RFQ, accepted quotation, customer PO and later revisions with source-linked discrepancies. A person still approves. Offline-first. Does not talk to ERP or auto-enter orders.",
      storeUrl: "",
      storeReady: false,
      storeComingSoon: "B2B sales — write to sanjay@plmaiservice.com",
      salesModel: "b2b",
      trial: "B2B licensing. Contact sanjay@plmaiservice.com for evaluation and commercial terms.",
      screenshot: "",
      ogImage: "assets/og/home.png",
      demoUrl: "",
      demoTitle: "OrderRelease Guard Demo",
      storeEvent: "click_releaseguard_b2b",
      viewEvent: "view_order_release_guard",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_releaseguard",
      benefits: [
        "RFQ / quote / PO comparison with severity",
        "SHA-256 evidence inventory; originals not modified",
        "Human approval required; PDF report with hashes"
      ],
      users: [
        "Manufacturing order-release teams",
        "Estimating and contract review",
        "Shop-floor release coordinators"
      ],
      inputs: "RFQ, quotation, PO and revision document packages",
      output: "Discrepancy list, approval workflow, PDF evidence report",
      os: "Windows 10/11 x64",
      requirements: "Windows 10 or 11, 64-bit. Offline-first local processing."
    }
  }
};
